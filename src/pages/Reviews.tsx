import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

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
      <section className="pt-28 pb-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-2">Patient Reviews</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">
            What Our <span className="text-accent">Patients</span> Say
          </h1>

          {/* Rating Summary */}
          <div className="mt-8 inline-flex flex-col items-center bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl px-10 py-6">
            <p className="font-serif text-5xl font-bold text-accent">{overallRating}</p>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-accent fill-accent" />
              ))}
            </div>
            <p className="text-primary-foreground/60 text-sm mt-2">Based on {reviews.length} reviews</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {reviews.map((r, idx) => (
              <Card key={idx} className="border-border/50 hover:border-accent/20 transition-all">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < r.rating ? "text-accent fill-accent" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">"{r.review}"</p>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{r.name}</p>
                    <p className="text-accent text-xs">{r.treatment}</p>
                  </div>
                </CardContent>
              </Card>
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
