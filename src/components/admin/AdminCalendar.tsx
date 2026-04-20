import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from "lucide-react";
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addDays, addMonths, format, isSameMonth, isSameDay, isToday,
} from "date-fns";
import { cn } from "@/lib/utils";

type Apt = { id: string; date: string; time_slot: string; patient_name: string; service: string; status: string };
type Holiday = { date: string; reason: string | null };

const AdminCalendar = () => {
  const [cursor, setCursor] = useState(new Date());
  const [appointments, setAppointments] = useState<Apt[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selected, setSelected] = useState<Date | null>(new Date());

  const monthStart = useMemo(() => startOfMonth(cursor), [cursor]);
  const monthEnd = useMemo(() => endOfMonth(cursor), [cursor]);
  const gridStart = useMemo(() => startOfWeek(monthStart), [monthStart]);
  const gridEnd = useMemo(() => endOfWeek(monthEnd), [monthEnd]);

  useEffect(() => {
    (async () => {
      const from = format(gridStart, "yyyy-MM-dd");
      const to = format(gridEnd, "yyyy-MM-dd");
      const [{ data: apts }, { data: hols }] = await Promise.all([
        supabase.from("appointments").select("id,date,time_slot,patient_name,service,status")
          .gte("date", from).lte("date", to).order("time_slot"),
        supabase.from("holidays").select("date,reason").gte("date", from).lte("date", to),
      ]);
      setAppointments((apts as Apt[]) || []);
      setHolidays((hols as Holiday[]) || []);
    })();
  }, [gridStart, gridEnd]);

  const days: Date[] = [];
  for (let d = gridStart; d <= gridEnd; d = addDays(d, 1)) days.push(d);

  const aptsByDate = useMemo(() => {
    const m = new Map<string, Apt[]>();
    appointments.forEach((a) => {
      const k = a.date;
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(a);
    });
    return m;
  }, [appointments]);

  const holidaysByDate = useMemo(() => {
    const m = new Map<string, Holiday>();
    holidays.forEach((h) => m.set(h.date, h));
    return m;
  }, [holidays]);

  const selectedKey = selected ? format(selected, "yyyy-MM-dd") : "";
  const selectedApts = selectedKey ? aptsByDate.get(selectedKey) || [] : [];
  const selectedHoliday = selectedKey ? holidaysByDate.get(selectedKey) : undefined;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="p-4 lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalIcon className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-xl font-bold">{format(cursor, "MMMM yyyy")}</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setCursor(addMonths(cursor, -1))}><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="outline" size="sm" onClick={() => setCursor(new Date())}>Today</Button>
            <Button variant="outline" size="sm" onClick={() => setCursor(addMonths(cursor, 1))}><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs font-semibold text-muted-foreground mb-1">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d} className="text-center py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => {
            const k = format(d, "yyyy-MM-dd");
            const apts = aptsByDate.get(k) || [];
            const holiday = holidaysByDate.get(k);
            const inMonth = isSameMonth(d, cursor);
            const isSel = selected && isSameDay(d, selected);
            return (
              <button
                key={k}
                onClick={() => setSelected(d)}
                title={holiday ? `Closed: ${holiday.reason || "Holiday"}` : apts.length > 0 ? `${apts.length} appointment${apts.length !== 1 ? "s" : ""}` : undefined}
                className={cn(
                  "aspect-square p-1.5 rounded-lg border text-left transition-all flex flex-col",
                  inMonth ? "bg-background" : "bg-muted/30",
                  isToday(d) && "ring-2 ring-primary/50",
                  isSel && "border-primary bg-primary/5",
                  holiday && "bg-destructive/10 border-destructive/30",
                )}
              >
                <span className={cn("text-xs font-semibold", !inMonth && "text-muted-foreground/50", isToday(d) && "text-primary")}>{format(d, "d")}</span>
                {holiday && <span className="text-[9px] text-destructive font-bold mt-auto truncate">CLOSED</span>}
                {!holiday && apts.length > 0 && (
                  <span className="mt-auto text-[10px] font-bold text-primary bg-primary/10 rounded px-1 self-start">{apts.length}</span>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-serif text-lg font-bold mb-1">{selected ? format(selected, "EEEE, MMM d") : "Select a day"}</h3>
        {selectedHoliday && (
          <Badge variant="destructive" className="mb-3">Closed: {selectedHoliday.reason || "Holiday"}</Badge>
        )}
        <p className="text-xs text-muted-foreground mb-3">{selectedApts.length} appointment{selectedApts.length !== 1 ? "s" : ""}</p>
        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          {selectedApts.length === 0 && <p className="text-sm text-muted-foreground py-6 text-center">No appointments.</p>}
          {selectedApts.map((a) => (
            <div key={a.id} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold">{a.time_slot}</span>
                <Badge variant={a.status === "confirmed" ? "default" : a.status === "cancelled" ? "destructive" : "secondary"} className="text-[10px]">{a.status}</Badge>
              </div>
              <p className="text-sm">{a.patient_name}</p>
              <p className="text-xs text-muted-foreground">{a.service}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminCalendar;
