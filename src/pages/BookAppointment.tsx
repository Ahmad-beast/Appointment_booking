import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  CalendarIcon, CheckCircle, Clock, User, Stethoscope,
  Phone, Mail, MapPin, Shield, Award, HeartPulse, Sparkles, ArrowRight,
} from "lucide-react";
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

const trustBadges = [
  { icon: Shield, label: "100% Secure", sub: "Your data is protected" },
  { icon: Award, label: "Award-Winning", sub: "Top-rated dental clinic" },
  { icon: HeartPulse, label: "Expert Care", sub: "20+ years experience" },
];

const steps = [
  { n: 1, title: "Fill Details", desc: "Tell us about you" },
  { n: 2, title: "Pick a Slot", desc: "Choose date & time" },
  { n: 3, title: "Confirmed", desc: "We'll be in touch" },
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
    if (!doctor || !selectedDate) return;
    const { data } = await supabase
      .from("appointments")
      .select("time_slot")
      .eq("doctor", doctor)
      .eq("date", format(selectedDate, "yyyy-MM-dd"))
      .neq("status", "cancelled");
    setBookedSlots(data?.map((d: { time_slot: string }) => d.time_slot) || []);
  };

  // Realtime: refresh booked slots whenever appointments change for the selected date+doctor
  useEffect(() => {
    if (!date || !form.doctor) return;
    const dateStr = format(date, "yyyy-MM-dd");
    const channel = supabase
      .channel(`appointments-${dateStr}-${form.doctor}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments", filter: `date=eq.${dateStr}` },
        () => fetchBookedSlots(date, form.doctor)
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [date, form.doctor]);

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

    // Final server-side check to prevent double booking (race condition guard)
    const dateStr = format(date, "yyyy-MM-dd");
    const { data: existing } = await supabase
      .from("appointments")
      .select("id")
      .eq("doctor", form.doctor)
      .eq("date", dateStr)
      .eq("time_slot", form.time_slot)
      .neq("status", "cancelled")
      .maybeSingle();

    if (existing) {
      setLoading(false);
      toast({
        title: "Slot just got booked",
        description: "Sorry, that time slot is no longer available. Please pick another.",
        variant: "destructive",
      });
      setForm((prev) => ({ ...prev, time_slot: "" }));
      await fetchBookedSlots(date, form.doctor);
      return;
    }

    const { error } = await supabase.from("appointments").insert({
      patient_name: form.patient_name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      service: form.service,
      doctor: form.doctor,
      date: dateStr,
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
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-28 pb-20 min-h-[80vh] flex items-center bg-gradient-to-br from-primary-soft via-background to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center rounded-3xl border border-border bg-card p-10 md:p-12 shadow-[var(--shadow-medium)] animate-scale-in">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-[var(--shadow-glow)]">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="font-serif text-3xl text-foreground mb-2">You're all set!</h2>
              <p className="text-muted-foreground mb-6">Thank you, <span className="font-semibold text-foreground">{form.patient_name}</span>. Your appointment is booked.</p>
              <div className="bg-secondary/60 rounded-2xl p-5 text-sm text-left space-y-3 border border-border">
                <div className="flex items-center gap-3"><Stethoscope className="w-4 h-4 text-primary shrink-0" /><span className="text-foreground"><strong>Service:</strong> {form.service}</span></div>
                <div className="flex items-center gap-3"><User className="w-4 h-4 text-primary shrink-0" /><span className="text-foreground"><strong>Doctor:</strong> {form.doctor}</span></div>
                <div className="flex items-center gap-3"><CalendarIcon className="w-4 h-4 text-primary shrink-0" /><span className="text-foreground"><strong>Date:</strong> {date && format(date, "PPP")}</span></div>
                <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-primary shrink-0" /><span className="text-foreground"><strong>Time:</strong> {form.time_slot}</span></div>
              </div>
              <p className="text-muted-foreground text-xs mt-5">📞 We'll call you shortly to confirm your appointment.</p>
              <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 h-11" onClick={() => { setSuccess(false); setForm({ patient_name: "", phone: "", email: "", service: "", doctor: "", time_slot: "" }); setDate(undefined); }}>
                Book Another Appointment
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-br from-primary via-primary to-accent">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10 animate-blob" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/10 animate-blob" style={{ animationDelay: "3s" }} />
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-5 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-xs sm:text-sm font-semibold text-white">Book in less than 60 seconds</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white text-balance animate-fade-in">
            Schedule Your Visit
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-base md:text-lg text-white/90 text-pretty animate-fade-in">
            Pick a doctor, choose a time that works for you, and we'll handle the rest.
          </p>

          {/* Steps */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-2">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full pl-1.5 pr-4 py-1.5">
                  <span className="w-7 h-7 rounded-full bg-white text-primary font-bold text-sm flex items-center justify-center">{s.n}</span>
                  <div className="text-left">
                    <div className="text-white text-xs sm:text-sm font-semibold leading-tight">{s.title}</div>
                    <div className="text-white/70 text-[10px] sm:text-xs leading-tight">{s.desc}</div>
                  </div>
                </div>
                {i < steps.length - 1 && <ArrowRight className="w-4 h-4 text-white/50 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* SIDEBAR */}
            <aside className="lg:col-span-1 space-y-6 order-2 lg:order-1">
              {/* Trust badges */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                <h3 className="font-serif text-lg text-foreground mb-4">Why book with us?</h3>
                <div className="space-y-4">
                  {trustBadges.map((b) => (
                    <div key={b.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center shrink-0">
                        <b.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">{b.label}</div>
                        <div className="text-muted-foreground text-xs">{b.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact card */}
              <div className="rounded-2xl border border-border bg-gradient-to-br from-primary to-accent p-6 shadow-[var(--shadow-medium)] text-primary-foreground">
                <h3 className="font-serif text-lg mb-4">Need help booking?</h3>
                <div className="space-y-3 text-sm">
                  <a href="tel:+1234567890" className="flex items-center gap-3 hover:opacity-90 transition">
                    <Phone className="w-4 h-4" /> <span>(123) 456-7890</span>
                  </a>
                  <a href="mailto:hello@smilepro.com" className="flex items-center gap-3 hover:opacity-90 transition">
                    <Mail className="w-4 h-4" /> <span>hello@smilepro.com</span>
                  </a>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>123 Smile Avenue, Suite 200</span>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-white/20 text-xs opacity-90">
                  <strong className="block mb-1">Office Hours</strong>
                  Mon–Fri: 9am – 6pm<br />Sat: 10am – 4pm
                </div>
              </div>
            </aside>

            {/* FORM */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="rounded-3xl border border-border bg-card shadow-[var(--shadow-medium)] overflow-hidden">
                <div className="p-6 md:p-8 border-b border-border bg-gradient-to-r from-primary-soft/50 to-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl text-foreground">Appointment Details</h2>
                      <p className="text-sm text-muted-foreground">All fields marked with * are required</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Personal Information</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">Full Name *</Label>
                          <Input placeholder="John Doe" className="rounded-xl h-11" value={form.patient_name} onChange={(e) => setForm({ ...form, patient_name: e.target.value })} required />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">Phone *</Label>
                          <Input placeholder="(123) 456-7890" className="rounded-xl h-11" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                        </div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <Label className="text-sm font-semibold">Email (optional)</Label>
                        <Input type="email" placeholder="your@email.com" className="rounded-xl h-11" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      </div>
                    </div>

                    <div className="h-px bg-border" />

                    {/* Service & Doctor */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Stethoscope className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Service & Doctor</h3>
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
                    </div>

                    <div className="h-px bg-border" />

                    {/* Date & Time */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Date & Time</h3>
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
                        <div className="space-y-3 mt-5 animate-fade-in">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-semibold">Available Time Slots *</Label>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Selected</span>
                              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted-foreground/40" /> Booked</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {timeSlots.map((slot) => {
                              const isBooked = bookedSlots.includes(slot);
                              const isSelected = form.time_slot === slot;
                              return (
                                <button key={slot} type="button" disabled={isBooked} onClick={() => setForm({ ...form, time_slot: slot })}
                                  className={cn(
                                    "px-2 py-2.5 text-xs rounded-xl border transition-all font-medium",
                                    isBooked && "bg-muted text-muted-foreground cursor-not-allowed line-through opacity-50",
                                    isSelected && !isBooked && "bg-primary text-primary-foreground border-primary shadow-md scale-105",
                                    !isSelected && !isBooked && "border-border hover:border-primary hover:bg-primary-soft text-foreground hover:-translate-y-0.5"
                                  )}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {(!date || !form.doctor) && (
                        <div className="mt-4 p-4 rounded-xl bg-secondary/60 border border-border text-center text-sm text-muted-foreground">
                          👆 Select a doctor and date to see available time slots
                        </div>
                      )}
                    </div>

                    <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-95 hover:-translate-y-0.5 transition-all font-semibold text-base h-13 rounded-full shadow-[var(--shadow-medium)] gap-2">
                      {loading ? "Booking your appointment..." : (<>Confirm Appointment <ArrowRight className="w-4 h-4" /></>)}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      🔒 By booking, you agree to our terms. We'll never share your data.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookAppointment;
