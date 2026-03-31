import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const services = [
  "Teeth Cleaning",
  "Teeth Whitening",
  "Dental Implants",
  "Braces & Orthodontics",
  "Root Canal Treatment",
  "Cosmetic Dentistry",
  "Dental Crowns",
  "Emergency Dental Care",
];

const doctors = [
  "Dr. Sarah Mitchell",
  "Dr. James Wilson",
  "Dr. Emily Chen",
  "Dr. Michael Brown",
  "Dr. Amara Patel",
  "Dr. David Kim",
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
    patient_name: "",
    phone: "",
    email: "",
    service: "",
    doctor: "",
    time_slot: "",
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
            <Card className="max-w-lg mx-auto text-center border-accent/20">
              <CardContent className="p-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Appointment Booked!</h2>
                <p className="text-muted-foreground mb-2">Thank you, {form.patient_name}!</p>
                <div className="bg-muted rounded-lg p-4 text-sm text-left space-y-1 mt-4">
                  <p><strong>Service:</strong> {form.service}</p>
                  <p><strong>Doctor:</strong> {form.doctor}</p>
                  <p><strong>Date:</strong> {date && format(date, "PPP")}</p>
                  <p><strong>Time:</strong> {form.time_slot}</p>
                </div>
                <p className="text-muted-foreground text-xs mt-4">We'll contact you to confirm your appointment.</p>
                <Button className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => { setSuccess(false); setForm({ patient_name: "", phone: "", email: "", service: "", doctor: "", time_slot: "" }); setDate(undefined); }}>
                  Book Another
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-2">Appointment</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">
            Book Your <span className="text-accent">Visit</span>
          </h1>
          <p className="text-primary-foreground/60 mt-4 max-w-xl mx-auto">
            Fill out the form below to schedule your appointment with one of our expert dentists.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-center">Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input placeholder="Your name" value={form.patient_name} onChange={(e) => setForm({ ...form, patient_name: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone *</Label>
                    <Input placeholder="(123) 456-7890" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email (optional)</Label>
                  <Input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>

                {/* Service & Doctor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Service *</Label>
                    <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                      <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Doctor *</Label>
                    <Select value={form.doctor} onValueChange={handleDoctorChange}>
                      <SelectTrigger><SelectValue placeholder="Select doctor" /></SelectTrigger>
                      <SelectContent>
                        {doctors.map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label>Preferred Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        disabled={(d) => d < new Date() || d.getDay() === 0}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Slots */}
                {date && form.doctor && (
                  <div className="space-y-2">
                    <Label>Time Slot *</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        const isSelected = form.time_slot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isBooked}
                            onClick={() => setForm({ ...form, time_slot: slot })}
                            className={cn(
                              "px-2 py-2 text-xs rounded-md border transition-all font-medium",
                              isBooked && "bg-muted text-muted-foreground cursor-not-allowed line-through opacity-50",
                              isSelected && !isBooked && "bg-accent text-accent-foreground border-accent",
                              !isSelected && !isBooked && "border-border hover:border-accent/50 text-foreground"
                            )}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base h-12">
                  {loading ? "Booking..." : "Confirm Appointment"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BookAppointment;
