import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Trash2, RefreshCw, FileDown, Send, Copy, Phone, Calendar as CalIcon, Clock, User, Search, X } from "lucide-react";
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
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [servicePrices, setServicePrices] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("services").select("name,price");
      const map: Record<string, number> = {};
      (data || []).forEach((s: { name: string; price: number }) => { map[s.name] = Number(s.price); });
      setServicePrices(map);
    })();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    let query = supabase.from("appointments").select("*").order("date", { ascending: true }).order("time_slot", { ascending: true });
    if (filter !== "all") query = query.eq("status", filter);
    if (dateFrom) query = query.gte("date", dateFrom);
    if (dateTo) query = query.lte("date", dateTo);
    const { data, error } = await query;
    if (error) toast({ title: "Error loading appointments", variant: "destructive" });
    setAppointments((data as Appointment[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchAppointments(); }, [filter, dateFrom, dateTo]);

  const copyPhone = async (phone: string) => {
    try {
      await navigator.clipboard.writeText(phone);
      toast({ title: "Phone copied", description: phone });
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  const clearFilters = () => { setFilter("all"); setSearch(""); setDateFrom(""); setDateTo(""); };
  const hasFilters = filter !== "all" || !!search || !!dateFrom || !!dateTo;

  const searchFiltered = appointments.filter((a) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      a.patient_name.toLowerCase().includes(q) ||
      a.phone.toLowerCase().includes(q) ||
      a.service.toLowerCase().includes(q) ||
      (a.email || "").toLowerCase().includes(q)
    );
  });

  const grouped = searchFiltered.reduce<Record<string, { order: number; items: Appointment[] }>>((acc, apt) => {
    const { label, order } = groupLabel(apt.date);
    if (!acc[label]) acc[label] = { order, items: [] };
    acc[label].items.push(apt);
    return acc;
  }, {});
  const groupedSorted = Object.entries(grouped).sort((a, b) => a[1].order - b[1].order);

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

    const price = servicePrices[apt.service];
    const rows: [string, string][] = [
      ["Service", apt.service],
      ["Date", apt.date],
      ["Time", apt.time_slot],
      ["Status", apt.status.toUpperCase()],
    ];
    if (price !== undefined) rows.splice(1, 0, ["Price", `$${price.toFixed(2)}`]);

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

    if (price !== undefined) {
      const totalY = startY + 32 + rows.length * 32 + 16;
      doc.setFillColor(13, 110, 120);
      doc.roundedRect(40, totalY, pageW - 80, 44, 6, 6, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("TOTAL DUE", 56, totalY + 28);
      doc.setFontSize(16);
      doc.text(`$${price.toFixed(2)}`, pageW - 56, totalY + 28, { align: "right" });
    }

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
      <CardHeader className="space-y-4">
        <div className="flex flex-row items-center justify-between gap-2">
          <CardTitle className="font-serif text-xl">
            Appointments <span className="text-muted-foreground font-normal text-base">({searchFiltered.length}{searchFiltered.length !== appointments.length ? ` of ${appointments.length}` : ""})</span>
          </CardTitle>
          <Button variant="outline" size="icon" onClick={fetchAppointments} title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search by name, phone, service or email..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full md:w-[150px]" title="From date" />
            <span className="text-muted-foreground text-sm">→</span>
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full md:w-[150px]" title="To date" />
          </div>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="shrink-0">
              <X className="w-3.5 h-3.5 mr-1" />Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground text-center py-8">Loading...</p>
        ) : searchFiltered.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No appointments match your filters.</p>
        ) : (
          <div className="space-y-8">
            {groupedSorted.map(([label, group]) => (
              <div key={label}>
                <div className="flex items-center gap-2 mb-3 sticky top-0 bg-background/95 backdrop-blur-sm py-2 z-10 border-b">
                  <CalIcon className="w-4 h-4 text-primary" />
                  <h3 className="font-serif text-lg font-semibold text-foreground">{label}</h3>
                  <Badge variant="secondary" className="ml-1">{group.items.length}</Badge>
                </div>
                <div className="overflow-x-auto rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead><User className="w-3.5 h-3.5 inline mr-1" />Patient</TableHead>
                        <TableHead><Phone className="w-3.5 h-3.5 inline mr-1" />Phone</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead><CalIcon className="w-3.5 h-3.5 inline mr-1" />Date</TableHead>
                        <TableHead><Clock className="w-3.5 h-3.5 inline mr-1" />Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.items.map((apt) => (
                        <TableRow key={apt.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">{apt.patient_name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <a href={`tel:${apt.phone}`} className="hover:text-primary hover:underline transition-colors">{apt.phone}</a>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" title="Copy phone number" onClick={() => copyPhone(apt.phone)}>
                                <Copy className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>{apt.service}</TableCell>
                          <TableCell>{apt.doctor}</TableCell>
                          <TableCell className="whitespace-nowrap">{format(parseISO(apt.date), "MMM d, yyyy")}</TableCell>
                          <TableCell className="whitespace-nowrap">{apt.time_slot}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusColors[apt.status] || ""}>
                              {apt.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 flex-wrap justify-end">
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
                              <Button variant="ghost" size="icon" className="h-8 w-8" title="Send invoice to patient" onClick={() => sendInvoice(apt)}>
                                <Send className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" title="Delete appointment" onClick={() => deleteAppointment(apt.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminAppointments;
