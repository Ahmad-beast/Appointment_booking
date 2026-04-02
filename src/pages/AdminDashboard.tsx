import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, CalendarDays, Users } from "lucide-react";
import AdminAppointments from "@/components/admin/AdminAppointments";
import AdminDoctors from "@/components/admin/AdminDoctors";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary border-b border-accent/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-serif font-bold text-sm">S</span>
            </div>
            <span className="font-serif text-lg font-bold text-primary-foreground">
              SmilePro <span className="text-accent">Admin</span>
            </span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold text-foreground mb-6">Dashboard</h1>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="appointments" className="gap-2">
              <CalendarDays className="w-4 h-4" /> Appointments
            </TabsTrigger>
            <TabsTrigger value="doctors" className="gap-2">
              <Users className="w-4 h-4" /> Doctors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <AdminAppointments />
          </TabsContent>

          <TabsContent value="doctors">
            <AdminDoctors />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
