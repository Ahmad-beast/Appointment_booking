import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, CalendarOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";

type Holiday = { id: string; date: string; reason: string | null };

const AdminHolidays = () => {
  const { toast } = useToast();
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("holidays").select("*").gte("date", format(new Date(), "yyyy-MM-dd")).order("date");
    setHolidays((data as Holiday[]) || []);
  };

  useEffect(() => { load(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    setLoading(true);
    const { error } = await supabase.from("holidays").insert({ date, reason: reason || null });
    setLoading(false);
    if (error) {
      toast({ title: "Failed to add", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Holiday added" });
      setDate(""); setReason("");
      load();
    }
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("holidays").delete().eq("id", id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Removed" }); load(); }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <CalendarOff className="w-5 h-5 text-destructive" />
          <h3 className="font-serif text-xl font-bold">Block a Date</h3>
        </div>
        <form onSubmit={add} className="space-y-4">
          <div>
            <Label>Date *</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={format(new Date(), "yyyy-MM-dd")} required />
          </div>
          <div>
            <Label>Reason (optional)</Label>
            <Input placeholder="Public holiday, staff training..." value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>
          <Button type="submit" disabled={loading} className="w-full"><Plus className="w-4 h-4 mr-2" />Block this date</Button>
        </form>
        <p className="text-xs text-muted-foreground mt-4">Patients won't be able to book on blocked dates.</p>
      </Card>

      <Card className="p-6">
        <h3 className="font-serif text-xl font-bold mb-4">Upcoming Closed Days</h3>
        {holidays.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">No upcoming closures.</p>
        ) : (
          <div className="space-y-2">
            {holidays.map((h) => (
              <div key={h.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="font-semibold text-sm">{format(parseISO(h.date), "EEEE, MMM d, yyyy")}</p>
                  {h.reason && <p className="text-xs text-muted-foreground">{h.reason}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-[10px]">CLOSED</Badge>
                  <Button variant="ghost" size="sm" onClick={() => remove(h.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminHolidays;
