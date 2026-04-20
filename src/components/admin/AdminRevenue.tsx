import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";
import { format, startOfMonth, startOfDay, parseISO } from "date-fns";

type Apt = { date: string; service: string; status: string };
type Service = { name: string; price: number };

const AdminRevenue = () => {
  const [apts, setApts] = useState<Apt[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    (async () => {
      const [a, s] = await Promise.all([
        supabase.from("appointments").select("date,service,status").neq("status", "cancelled"),
        supabase.from("services").select("name,price"),
      ]);
      setApts((a.data as Apt[]) || []);
      setServices((s.data as Service[]) || []);
    })();
  }, []);

  const priceMap = new Map(services.map((s) => [s.name, Number(s.price)]));
  const today = startOfDay(new Date());
  const monthStart = startOfMonth(new Date());

  const totalRevenue = apts.reduce((sum, a) => sum + (priceMap.get(a.service) || 0), 0);
  const todayRevenue = apts.filter((a) => parseISO(a.date) >= today).reduce((sum, a) => sum + (priceMap.get(a.service) || 0), 0);
  const monthRevenue = apts.filter((a) => parseISO(a.date) >= monthStart).reduce((sum, a) => sum + (priceMap.get(a.service) || 0), 0);

  // Top services by revenue
  const byService = new Map<string, { count: number; revenue: number }>();
  apts.forEach((a) => {
    const cur = byService.get(a.service) || { count: 0, revenue: 0 };
    cur.count += 1;
    cur.revenue += priceMap.get(a.service) || 0;
    byService.set(a.service, cur);
  });
  const top = Array.from(byService.entries()).sort((a, b) => b[1].revenue - a[1].revenue).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div><p className="text-xs uppercase font-semibold text-muted-foreground">Today</p><p className="font-serif text-3xl font-bold mt-2">${todayRevenue.toFixed(0)}</p></div>
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center"><Calendar className="w-5 h-5 text-primary" /></div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div><p className="text-xs uppercase font-semibold text-muted-foreground">{format(monthStart, "MMMM")}</p><p className="font-serif text-3xl font-bold mt-2">${monthRevenue.toFixed(0)}</p></div>
            <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-accent-foreground" /></div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div><p className="text-xs uppercase font-semibold text-muted-foreground">All Time</p><p className="font-serif text-3xl font-bold mt-2">${totalRevenue.toFixed(0)}</p></div>
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center"><DollarSign className="w-5 h-5 text-green-700" /></div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-serif text-xl font-bold mb-4">Top Services by Revenue</h3>
        {top.length === 0 ? <p className="text-sm text-muted-foreground py-6 text-center">No data yet.</p> :
          <div className="space-y-3">
            {top.map(([name, info]) => {
              const pct = totalRevenue ? (info.revenue / totalRevenue) * 100 : 0;
              return (
                <div key={name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{name}</span>
                    <span className="text-muted-foreground">${info.revenue.toFixed(0)} · {info.count}x</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        }
        <p className="text-xs text-muted-foreground mt-4">Revenue is calculated from current service prices. Cancelled appointments are excluded.</p>
      </Card>
    </div>
  );
};

export default AdminRevenue;
