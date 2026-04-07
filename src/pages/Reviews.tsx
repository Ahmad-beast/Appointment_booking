import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Maria Johnson", treatment: "Teeth Whitening", rating: 5, review: "Absolutely amazing experience! My teeth have never looked this good. The staff was incredibly professional and made me feel comfortable throughout the entire process." },
  { name: "Robert Smith", treatment: "Dental Implants", rating: 5, review: "Dr. Wilson did an incredible job with my implants. The process was smooth, painless, and the results are phenomenal. I can eat and smile with full confidence now." },
  { name: "Lisa Anderson", treatment: "Orthodontics", rating: 5, review: "Best dental clinic I've ever been to. The entire team is so caring and attentive. My braces journey has been much easier than I expected." },
  { name: "David Park", treatment: "Root Canal", rating: 4, review: "I was terrified of getting a root canal but the team at SmilePro made it completely painless. Modern equipment and very gentle doctors." },
  { name: "Jennifer Lee", treatment: "Cosmetic Dentistry", rating: 5, review: "Got porcelain veneers done here and they look absolutely natural. Dr. Mitchell is a true artist. My smile has completely transformed!" },
  { name: "Ahmed Hassan", treatment: "Teeth Cleaning", rating: 5, review: "Regular cleanings here are always thorough and comfortable. The hygienists are excellent and the facility is spotlessly clean." },
  { name: "Sophie Williams", treatment: "Braces", rating: 4, review: "Great orthodontic treatment for my teenage daughter. Dr. Chen was patient and explained everything clearly. The progress has been remarkable." },
  { name: "Carlos Martinez", treatment: "Emergency Care", rating: 5, review: "Had a dental emergency on a weekend and they saw me within an hour. Professional, quick, and caring. Truly exceptional emergency service." },
  { name: "Priya Sharma", treatment: "Dental Crown", rating: 5, review: "Got a same-day crown and it fits perfectly. The CEREC technology is impressive. No temporary crown needed – walked out with a perfect tooth!" },
  { name: "Tom Henderson", treatment: "Dental Implants", rating: 5, review: "After losing a tooth, I was devastated. Dr. Chen placed my implant with such precision. It looks and feels exactly like my natural tooth." },
];

const overallRating = (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1);

const Reviews = () => {
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
            <p className="text-sm mt-2" style={{ color: 'hsl(210, 15%, 65%)' }}>Based on {reviews.length} reviews</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {reviews.map((r, idx) => (
              <div key={idx} className="bg-card rounded-2xl border border-border p-7 hover:shadow-md hover:border-primary/20 transition-all">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-foreground/80 text-sm leading-relaxed mb-5">{r.review}</p>
                <div className="flex items-center justify-between pt-5 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">{r.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{r.name}</p>
                      <p className="text-muted-foreground text-xs">{r.treatment}</p>
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
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Reviews;
