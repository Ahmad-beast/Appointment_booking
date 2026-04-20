import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Settings as SettingsIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Settings = {
  id: string;
  clinic_name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  opening_time: string;
  closing_time: string;
  slot_duration_minutes: number;
  logo_url: string | null;
};

const AdminSettings = () => {
  const { toast } = useToast();
  const [s, setS] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("clinic_settings").select("*").maybeSingle();
      if (data) setS(data as Settings);
    })();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!s) return;
    setLoading(true);
    const { error } = await supabase.from("clinic_settings").update({
      clinic_name: s.clinic_name,
      address: s.address,
      phone: s.phone,
      email: s.email,
      opening_time: s.opening_time,
      closing_time: s.closing_time,
      slot_duration_minutes: s.slot_duration_minutes,
      logo_url: s.logo_url,
    }).eq("id", s.id);
    setLoading(false);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else toast({ title: "Settings saved" });
  };

  if (!s) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <Card className="p-6 max-w-3xl">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="w-5 h-5 text-primary" />
        <h3 className="font-serif text-xl font-bold">Clinic Profile</h3>
      </div>
      <form onSubmit={save} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Clinic Name *</Label><Input value={s.clinic_name} onChange={(e) => setS({ ...s, clinic_name: e.target.value })} required /></div>
          <div><Label>Phone</Label><Input value={s.phone || ""} onChange={(e) => setS({ ...s, phone: e.target.value })} /></div>
        </div>
        <div><Label>Email</Label><Input type="email" value={s.email || ""} onChange={(e) => setS({ ...s, email: e.target.value })} /></div>
        <div><Label>Address</Label><Textarea value={s.address || ""} onChange={(e) => setS({ ...s, address: e.target.value })} rows={2} /></div>
        <div><Label>Logo URL (optional)</Label><Input value={s.logo_url || ""} onChange={(e) => setS({ ...s, logo_url: e.target.value })} placeholder="https://..." /></div>

        <div className="border-t pt-5">
          <h4 className="font-semibold mb-3">Working Hours</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div><Label>Opens at</Label><Input type="time" value={s.opening_time} onChange={(e) => setS({ ...s, opening_time: e.target.value })} /></div>
            <div><Label>Closes at</Label><Input type="time" value={s.closing_time} onChange={(e) => setS({ ...s, closing_time: e.target.value })} /></div>
            <div><Label>Slot duration (min)</Label><Input type="number" min={10} max={120} step={5} value={s.slot_duration_minutes} onChange={(e) => setS({ ...s, slot_duration_minutes: parseInt(e.target.value) || 30 })} /></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">These hours control which time slots patients see when booking.</p>
        </div>

        <Button type="submit" disabled={loading}><Save className="w-4 h-4 mr-2" />{loading ? "Saving..." : "Save Settings"}</Button>
      </form>
    </Card>
  );
};

export default AdminSettings;
