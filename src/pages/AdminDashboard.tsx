import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, CalendarDays, Users, LayoutDashboard, Stethoscope, Clock, CheckCircle2, XCircle } from "lucide-react";
import AdminAppointments from "@/components/admin/AdminAppointments";
import AdminDoctors from "@/components/admin/AdminDoctors";
import { cn } from "@/lib/utils";

type View = "overview" | "appointments" | "doctors";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState<View>("overview");
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, cancelled: 0, doctors: 0 });

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin/login"); return; }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };
    checkAdmin();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    const loadStats = async () => {
      const [{ data: apts }, { count: docCount }] = await Promise.all([
        supabase.from("appointments").select("status"),
        supabase.from("doctors").select("*", { count: "exact", head: true }),
      ]);
      const list = apts || [];
      setStats({
        total: list.length,
        pending: list.filter((a) => a.status === "pending").length,
        confirmed: list.filter((a) => a.status === "confirmed").length,
        cancelled: list.filter((a) => a.status === "cancelled").length,
        doctors: docCount || 0,
      });
    };
    loadStats();
  }, [isAdmin, view]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  const navItems: { key: View; label: string; icon: typeof LayoutDashboard }[] = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "appointments", label: "Appointments", icon: CalendarDays },
    { key: "doctors", label: "Doctors", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-primary text-primary-foreground sticky top-0 h-screen">
        <div className="p-6 border-b border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg">
              <Stethoscope className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold leading-tight">SmilePro</p>
              <p className="text-xs text-primary-foreground/60">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = view === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setView(item.key)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium",
                  active
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary-foreground/10">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <header className="md:hidden bg-primary text-primary-foreground sticky top-0 z-40">
          <div className="px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="font-serif font-bold">SmilePro Admin</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex border-t border-primary-foreground/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = view === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setView(item.key)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium border-b-2 transition-colors",
                    active ? "border-accent text-accent" : "border-transparent text-primary-foreground/70"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {view === "overview" && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground">Welcome back 👋</h1>
                <p className="text-muted-foreground mt-1">Here's a snapshot of your clinic today.</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Appointments" value={stats.total} icon={CalendarDays} tone="primary" />
                <StatCard label="Pending" value={stats.pending} icon={Clock} tone="warning" />
                <StatCard label="Confirmed" value={stats.confirmed} icon={CheckCircle2} tone="success" />
                <StatCard label="Cancelled" value={stats.cancelled} icon={XCircle} tone="destructive" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setView("appointments")}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Manage</p>
                      <h3 className="font-serif text-xl font-bold mt-1">Appointments</h3>
                      <p className="text-sm text-muted-foreground mt-2">Confirm, complete or cancel patient bookings.</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <CalendarDays className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setView("doctors")}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Manage</p>
                      <h3 className="font-serif text-xl font-bold mt-1">Doctors ({stats.doctors})</h3>
                      <p className="text-sm text-muted-foreground mt-2">Add, edit or remove doctors. Changes appear on the website instantly.</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-accent-foreground" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {view === "appointments" && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground">Appointments</h1>
                <p className="text-muted-foreground mt-1">Manage all patient bookings.</p>
              </div>
              <AdminAppointments />
            </div>
          )}

          {view === "doctors" && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground">Doctors</h1>
                <p className="text-muted-foreground mt-1">Edits sync to the public website automatically.</p>
              </div>
              <AdminDoctors />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const toneStyles: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  warning: "bg-yellow-100 text-yellow-700",
  success: "bg-green-100 text-green-700",
  destructive: "bg-red-100 text-red-700",
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: typeof CalendarDays;
  tone: keyof typeof toneStyles;
}) => (
  <Card className="p-5 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
        <p className="font-serif text-3xl font-bold text-foreground mt-2">{value}</p>
      </div>
      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", toneStyles[tone])}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </Card>
);

export default AdminDashboard;
