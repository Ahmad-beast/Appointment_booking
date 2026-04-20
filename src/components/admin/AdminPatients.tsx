import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, Phone, Mail, Copy, History, User } from "lucide-react";
import { format, parseISO } from "date-fns";

type Appointment = {
  id: string;
  patient_name: string;
  phone: string;
  email: string | null;
  service: string;
  doctor: string;
  date: string;
  time_slot: string;
  status: string;
  created_at: string;
};

type Patient = {
  phone: string;
  name: string;
  email: string | null;
  total: number;
  lastVisit: string;
  appointments: Appointment[];
};

const AdminPatients = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Patient | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase.from("appointments").select("*").order("date", { ascending: false });
      if (error) toast({ title: "Error loading patients", variant: "destructive" });
      setAppointments((data as Appointment[]) || []);
      setLoading(false);
    })();
  }, [toast]);

  const patients = useMemo<Patient[]>(() => {
    const map = new Map<string, Patient>();
    for (const a of appointments) {
      const key = a.phone.trim();
      if (!key) continue;
      const existing = map.get(key);
      if (existing) {
        existing.appointments.push(a);
        existing.total += 1;
        if (a.date > existing.lastVisit) {
          existing.lastVisit = a.date;
          existing.name = a.patient_name;
          existing.email = a.email || existing.email;
        }
      } else {
        map.set(key, { phone: key, name: a.patient_name, email: a.email, total: 1, lastVisit: a.date, appointments: [a] });
      }
    }
    return Array.from(map.values()).sort((a, b) => (b.lastVisit > a.lastVisit ? 1 : -1));
  }, [appointments]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.phone.toLowerCase().includes(q) ||
      (p.email || "").toLowerCase().includes(q)
    );
  }, [patients, search]);

  const copyPhone = async (phone: string) => {
    try { await navigator.clipboard.writeText(phone); toast({ title: "Phone copied", description: phone }); }
    catch { toast({ title: "Copy failed", variant: "destructive" }); }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <CardTitle className="font-serif text-xl">Patients ({patients.length})</CardTitle>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search name, phone, email..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground text-center py-8">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No patients found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead><User className="w-3.5 h-3.5 inline mr-1" />Name</TableHead>
                  <TableHead><Phone className="w-3.5 h-3.5 inline mr-1" />Phone</TableHead>
                  <TableHead><Mail className="w-3.5 h-3.5 inline mr-1" />Email</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.phone} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <a href={`tel:${p.phone}`} className="hover:text-primary hover:underline">{p.phone}</a>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" title="Copy" onClick={() => copyPhone(p.phone)}>
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{p.email || "—"}</TableCell>
                    <TableCell><Badge variant="secondary">{p.total}</Badge></TableCell>
                    <TableCell className="whitespace-nowrap">{format(parseISO(p.lastVisit), "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => setSelected(p)}>
                        <History className="w-3.5 h-3.5 mr-1.5" />History
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selected?.name} — Visit History ({selected?.total})</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              <div className="text-sm text-muted-foreground flex flex-wrap gap-x-6 gap-y-1">
                <span><Phone className="w-3.5 h-3.5 inline mr-1" />{selected.phone}</span>
                {selected.email && <span><Mail className="w-3.5 h-3.5 inline mr-1" />{selected.email}</span>}
              </div>
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selected.appointments
                      .slice()
                      .sort((a, b) => (b.date + b.time_slot).localeCompare(a.date + a.time_slot))
                      .map((a) => (
                        <TableRow key={a.id}>
                          <TableCell className="whitespace-nowrap">{format(parseISO(a.date), "MMM d, yyyy")}</TableCell>
                          <TableCell className="whitespace-nowrap">{a.time_slot}</TableCell>
                          <TableCell>{a.service}</TableCell>
                          <TableCell><Badge variant="outline">{a.status}</Badge></TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminPatients;
