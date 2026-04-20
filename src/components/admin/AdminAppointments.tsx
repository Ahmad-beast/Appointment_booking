import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, RefreshCw, FileDown, Send, Copy, Phone, Calendar as CalIcon, Clock, User } from "lucide-react";
import { format, isToday, isTomorrow, isYesterday, parseISO, isPast, isThisWeek } from "date-fns";
import { jsPDF } from "jspdf";

const groupLabel = (dateStr: string) => {
  const d = parseISO(dateStr);
  if (isToday(d)) return { label: "Today", order: 1 };
  if (isTomorrow(d)) return { label: "Tomorrow", order: 0 };
  if (isYesterday(d)) return { label: "Yesterday", order: 2 };
  if (!isPast(d) && isThisWeek(d)) return { label: "This Week", order: 3 };
  if (isPast(d)) return { label: "Past", order: 5 };
  return { label: "Upcoming", order: 4 };
};

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

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
};

const AdminAppointments = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchAppointments = async () => {
    setLoading(true);
    let query = supabase.from("appointments").select("*").order("date", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data, error } = await query;
    if (error) toast({ title: "Error loading appointments", variant: "destructive" });
    setAppointments((data as Appointment[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchAppointments(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: `Appointment ${status}` });
      fetchAppointments();
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Appointment deleted" });
      fetchAppointments();
    }
  };

  const generateInvoicePDF = (apt: Appointment): jsPDF => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const invoiceNo = `INV-${apt.id.slice(0, 8).toUpperCase()}`;
    const issued = format(new Date(), "PPP");

    doc.setFillColor(13, 110, 120);
    doc.rect(0, 0, pageW, 110, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text("SmilePro Dental", 40, 55);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("123 Smile Avenue, Suite 200", 40, 75);
    doc.text("Phone: (123) 456-7890  -  hello@smilepro.com", 40, 90);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("APPOINTMENT", pageW - 40, 55, { align: "right" });
    doc.text("CONFIRMATION", pageW - 40, 78, { align: "right" });

    doc.setTextColor(30, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Invoice #: ${invoiceNo}`, 40, 150);
    doc.setFont("helvetica", "normal");
    doc.text(`Issued: ${issued}`, 40, 168);

    doc.setFont("helvetica", "bold");
    doc.text("Billed To:", pageW - 240, 150);
    doc.setFont("helvetica", "normal");
    doc.text(apt.patient_name, pageW - 240, 168);
    doc.text(apt.phone, pageW - 240, 184);
    if (apt.email) doc.text(apt.email, pageW - 240, 200);

    doc.setFillColor(232, 247, 248);
    doc.roundedRect(40, 230, pageW - 80, 70, 8, 8, "F");
    doc.setTextColor(13, 110, 120);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Your appointment has been booked!", 60, 258);
    doc.setTextColor(60, 60, 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Please arrive 10 minutes before your scheduled time. Contact us if you need to reschedule.", 60, 280);

    const startY = 340;
    doc.setFillColor(248, 250, 251);
    doc.rect(40, startY, pageW - 80, 32, "F");
    doc.setTextColor(80, 80, 80);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("DETAIL", 56, startY + 21);
    doc.text("INFORMATION", 280, startY + 21);

    const rows: [string, string][] = [
      ["Service", apt.service],
      ["Doctor", apt.doctor],
      ["Date", apt.date],
      ["Time", apt.time_slot],
      ["Status", apt.status.toUpperCase()],
    ];
    doc.setTextColor(40, 40, 40);
    rows.forEach((r, i) => {
      const y = startY + 32 + i * 32;
      if (i % 2 === 0) {
        doc.setFillColor(252, 253, 254);
        doc.rect(40, y, pageW - 80, 32, "F");
      }
      doc.setFont("helvetica", "bold");
      doc.text(r[0], 56, y + 21);
      doc.setFont("helvetica", "normal");
      doc.text(r[1], 280, y + 21);
    });

    doc.setDrawColor(220, 220, 220);
    doc.line(40, 720, pageW - 40, 720);
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(9);
    doc.text("Thank you for choosing SmilePro Dental. We look forward to seeing you!", pageW / 2, 745, { align: "center" });
    doc.text("This is a computer-generated confirmation and does not require a signature.", pageW / 2, 760, { align: "center" });

    return doc;
  };

  const downloadInvoice = (apt: Appointment) => {
    const doc = generateInvoicePDF(apt);
    doc.save(`Invoice-${apt.patient_name.replace(/\s+/g, "_")}-${apt.date}.pdf`);
    toast({ title: "Invoice downloaded" });
  };

  const sendInvoice = (apt: Appointment) => {
    const doc = generateInvoicePDF(apt);
    doc.save(`Invoice-${apt.patient_name.replace(/\s+/g, "_")}-${apt.date}.pdf`);
    const subject = encodeURIComponent("Your SmilePro Dental Appointment Confirmation");
    const body = encodeURIComponent(
      `Hello ${apt.patient_name},\n\nYour appointment has been booked successfully.\n\n` +
      `Service: ${apt.service}\nDoctor: ${apt.doctor}\nDate: ${apt.date}\nTime: ${apt.time_slot}\n\n` +
      `Please find your confirmation invoice attached (downloaded to your device — please attach it to this email before sending).\n\n` +
      `Thank you,\nSmilePro Dental`
    );
    if (apt.email) {
      window.location.href = `mailto:${apt.email}?subject=${subject}&body=${body}`;
    } else {
      const phone = apt.phone.replace(/[^0-9]/g, "");
      window.open(`https://wa.me/${phone}?text=${body}`, "_blank");
    }
    toast({ title: "Invoice ready", description: apt.email ? "Email draft opened — attach the downloaded PDF." : "WhatsApp opened — attach the downloaded PDF." });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-serif text-xl">Appointments ({appointments.length})</CardTitle>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={fetchAppointments}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground text-center py-8">Loading...</p>
        ) : appointments.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No appointments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((apt) => (
                  <TableRow key={apt.id}>
                    <TableCell className="font-medium">{apt.patient_name}</TableCell>
                    <TableCell>{apt.phone}</TableCell>
                    <TableCell>{apt.service}</TableCell>
                    <TableCell>{apt.doctor}</TableCell>
                    <TableCell>{apt.date}</TableCell>
                    <TableCell>{apt.time_slot}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[apt.status] || ""}>
                        {apt.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 flex-wrap">
                        <Select onValueChange={(v) => updateStatus(apt.id, v)}>
                          <SelectTrigger className="w-[110px] h-8 text-xs">
                            <SelectValue placeholder="Update" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="confirmed">Confirm</SelectItem>
                            <SelectItem value="completed">Complete</SelectItem>
                            <SelectItem value="cancelled">Cancel</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" title="Download Invoice PDF" onClick={() => downloadInvoice(apt)}>
                          <FileDown className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-accent-foreground" title="Send invoice to patient" onClick={() => sendInvoice(apt)}>
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteAppointment(apt.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminAppointments;
