import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Star, Quote, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Review = { id: string; patient_name: string; rating: number; comment: string };

const Reviews = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ patient_name: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("reviews")
        .select("id,patient_name,rating,comment")
        .eq("approved", true)
        .order("created_at", { ascending: false });
      setReviews((data as Review[]) || []);
    })();
  }, []);

  const overallRating = reviews.length
    ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient_name.trim() || !form.comment.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      patient_name: form.patient_name.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Failed to submit", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Thank you!", description: "Your review will appear after approval." });
      setForm({ patient_name: "", rating: 5, comment: "" });
      setOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 bg-gradient-to-br from-[hsl(210,30%,12%)] via-[hsl(200,35%,16%)] to-[hsl(192,40%,20%)]">
        <div className="container mx-auto px-4 text-center">
          <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: 'hsl(192, 80%, 65%)' }}>Patient Reviews</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'white' }}>
            What Our Patients Say
          </h1>

          <div className="mt-8 inline-flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-10 py-6">
            <p className="font-sans text-5xl font-bold" style={{ color: 'hsl(45, 90%, 60%)' }}>{overallRating}</p>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm mt-2" style={{ color: 'hsl(210, 15%, 65%)' }}>Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
          </div>

          <div className="mt-8">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90"><Send className="w-4 h-4 mr-2" />Share Your Experience</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Leave a review</DialogTitle></DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                  <div><Label>Your Name *</Label><Input value={form.patient_name} onChange={(e) => setForm({ ...form, patient_name: e.target.value })} required /></div>
                  <div>
                    <Label>Rating *</Label>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}>
                          <Star className={`w-7 h-7 ${n <= form.rating ? "text-amber-400 fill-amber-400" : "text-border"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div><Label>Your Review *</Label><Textarea rows={4} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Tell us about your experience..." required /></div>
                  <Button type="submit" className="w-full" disabled={submitting}>{submitting ? "Submitting..." : "Submit Review"}</Button>
                  <p className="text-xs text-muted-foreground text-center">Your review will be visible after admin approval.</p>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {reviews.length === 0 ? (
            <p className="text-center text-muted-foreground">No reviews yet. Be the first!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {reviews.map((r) => (
                <div key={r.id} className="bg-card rounded-2xl border border-border p-7 hover:shadow-md hover:border-primary/20 transition-all">
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
                  <p className="text-foreground/80 text-sm leading-relaxed mb-5">{r.comment}</p>
                  <div className="flex items-center justify-between pt-5 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">{r.patient_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{r.patient_name}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? "text-amber-400 fill-amber-400" : "text-border"}`} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Reviews;
