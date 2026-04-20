import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { format, subDays, parseISO } from "date-fns";
import { TrendingUp, BarChart3 } from "lucide-react";

type Row = { date: string; service: string; status: string };

const AdminAnalytics = () => {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    (async () => {
      const since = format(subDays(new Date(), 29), "yyyy-MM-dd");
      const { data } = await supabase.from("appointments").select("date,service,status").gte("date", since);
      setRows((data as Row[]) || []);
    })();
  }, []);

  const last30 = useMemo(() => {
    const days: { date: string; label: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = subDays(new Date(), i);
      const key = format(d, "yyyy-MM-dd");
      days.push({ date: key, label: format(d, "MMM d"), count: 0 });
    }
    const map = new Map(days.map((d) => [d.date, d]));
    rows.forEach((r) => {
      const entry = map.get(r.date);
      if (entry) entry.count += 1;
    });
    return days;
  }, [rows]);

  const topServices = useMemo(() => {
    const counts = new Map<string, number>();
    rows.forEach((r) => counts.set(r.service, (counts.get(r.service) || 0) + 1));
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [rows]);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Card className="p-5 lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Last 30 days</p>
            <h3 className="font-serif text-lg font-bold">Appointments trend</h3>
          </div>
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={last30} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="apptGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} interval={4} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#apptGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Top services</p>
            <h3 className="font-serif text-lg font-bold">Most booked</h3>
          </div>
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        {topServices.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">No data yet.</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topServices} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} width={100} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminAnalytics;
