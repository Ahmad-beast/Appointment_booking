import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle, Clock, User, Stethoscope } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const services = [
  "Teeth Cleaning", "Teeth Whitening", "Dental Implants",
  "Braces & Orthodontics", "Root Canal Treatment", "Cosmetic Dentistry",
  "Dental Crowns", "Emergency Dental Care",
];

const doctors = [
  "Dr. Sarah Mitchell", "Dr. James Wilson", "Dr. Emily Chen",
  "Dr. Michael Brown", "Dr. Amara Patel", "Dr. David Kim",
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "02:00 PM",
  "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
  "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM",
];

const BookAppointment = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const [form, setForm] = useState({
    patient_name: "", phone: "", email: "",
    service: "", doctor: "", time_slot: "",
  });
  const [date, setDate] = useState<Date>();

  const fetchBookedSlots = async (selectedDate: Date, doctor: string) => {
    if (!doctor) return;
    const { data } = await supabase
      .from("appointments")
      .select("time_slot")
      .eq("doctor", doctor)
      .eq("date", format(selectedDate, "yyyy-MM-dd"))
      .neq("status", "cancelled");
    setBookedSlots(data?.map((d: { time_slot: string }) => d.time_slot) || []);
  };

  const handleDateSelect = (d: Date | undefined) => {
    setDate(d);
    setForm((prev) => ({ ...prev, time_slot: "" }));
    if (d && form.doctor) fetchBookedSlots(d, form.doctor);
  };

  const handleDoctorChange = (doctor: string) => {
    setForm((prev) => ({ ...prev, doctor, time_slot: "" }));
    if (date) fetchBookedSlots(date, doctor);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !form.patient_name || !form.phone || !form.service || !form.doctor || !form.time_slot) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("appointments").insert({
      patient_name: form.patient_name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      service: form.service,
      doctor: form.doctor,
      date: format(date, "yyyy-MM-dd"),
      time_slot: form.time_slot,
      status: "pending",
    });
    setLoading(false);
    if (error) {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" });
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-28 pb-20 min-h-[80vh] flex items-center bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center rounded-2xl border border-border bg-card p-12">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="font-serif text-2xl text-foreground mb-2">Appointment Booked!</h2>
              <p className="text-muted-foreground mb-6">Thank you, {form.patient_name}!</p>
              <div className="bg-secondary rounded-xl p-5 text-sm text-left space-y-2">
                <div className="flex items-center gap-3"><Stethoscope className="w-4 h-4 text-primary shrink-0" /><span className="text-foreground"><strong>Service:</strong> {form.service}</span></div>
                <div className="flex items-center gap-3"><User className="w-4 h-4 text-primary shrink-0" /><span className="text-foreground"><strong>Doctor:</strong> {form.doctor}</span></div>
                <div className="flex items-center gap-3"><CalendarIcon className="w-4 h-4 text-primary shrink-0" /><span className="text-foreground"><strong>Date:</strong> {date && format(date, "PPP")}</span></div>
                <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-primary shrink-0" /><span className="text-foreground"><strong>Time:</strong> {form.time_slot}</span></div>
              </div>
              <p className="text-muted-foreground text-xs mt-5">We'll contact you to confirm your appointment.</p>
              <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl" onClick={() => { setSuccess(false); setForm({ patient_name: "", phone: "", email: "", service: "", doctor: "", time_slot: "" }); setDate(undefined); }}>
                Book Another
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 bg-gradient-to-br from-[hsl(210,30%,12%)] via-[hsl(200,35%,16%)] to-[hsl(192,40%,20%)]">
        <div className="container mx-auto px-4 text-center">
          <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: 'hsl(192, 80%, 65%)' }}>Appointment</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'white' }}>
            Book Your Visit
          </h1>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'hsl(210, 15%, 65%)' }}>
            Fill out the form below to schedule your appointment with one of our expert dentists.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border">
              <h2 className="font-serif text-2xl text-foreground text-center">Appointment Details</h2>
            </div>
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Full Name *</Label>
                    <Input placeholder="Your name" className="rounded-xl h-11" value={form.patient_name} onChange={(e) => setForm({ ...form, patient_name: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Phone *</Label>
                    <Input placeholder="(123) 456-7890" className="rounded-xl h-11" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Email (optional)</Label>
                  <Input type="email" placeholder="your@email.com" className="rounded-xl h-11" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Service *</Label>
                    <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                      <SelectTrigger className="rounded-xl h-11"><SelectValue placeholder="Select service" /></SelectTrigger>
                      <SelectContent>{services.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Doctor *</Label>
                    <Select value={form.doctor} onValueChange={handleDoctorChange}>
                      <SelectTrigger className="rounded-xl h-11"><SelectValue placeholder="Select doctor" /></SelectTrigger>
                      <SelectContent>{doctors.map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Preferred Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal rounded-xl h-11", !date && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={handleDateSelect} disabled={(d) => d < new Date() || d.getDay() === 0} initialFocus className="p-3 pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>

                {date && form.doctor && (
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Time Slot *</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        const isSelected = form.time_slot === slot;
                        return (
                          <button key={slot} type="button" disabled={isBooked} onClick={() => setForm({ ...form, time_slot: slot })}
                            className={cn(
                              "px-2 py-2.5 text-xs rounded-xl border transition-all font-medium",
                              isBooked && "bg-muted text-muted-foreground cursor-not-allowed line-through opacity-50",
                              isSelected && !isBooked && "bg-primary text-primary-foreground border-primary shadow-sm",
                              !isSelected && !isBooked && "border-border hover:border-primary/50 text-foreground"
                            )}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base h-12 rounded-xl shadow-sm">
                  {loading ? "Booking..." : "Confirm Appointment"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BookAppointment;
