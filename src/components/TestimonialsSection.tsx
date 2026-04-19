import { Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  { name: "Maria Johnson", treatment: "Teeth Whitening", rating: 5, review: "Absolutely amazing experience! My teeth have never looked this good. The staff was incredibly professional and made me feel comfortable throughout the entire process." },
  { name: "Robert Smith", treatment: "Dental Implants", rating: 5, review: "Dr. Wilson did an incredible job with my implants. The process was smooth, painless, and the results are phenomenal. Highly recommend SmilePro!" },
  { name: "Lisa Anderson", treatment: "Invisalign", rating: 5, review: "Best dental clinic I've ever been to. The entire team is so caring and attentive. My Invisalign journey has been much easier than expected." },
  { name: "David Park", treatment: "Root Canal", rating: 5, review: "I was terrified of getting a root canal but the team made it completely painless. Modern equipment and very gentle doctors. Truly exceptional care." },
];

const TestimonialsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div ref={headerRef} className={`max-w-3xl mx-auto text-center mb-12 md:mb-16 reveal ${headerVisible ? "in-view" : ""}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Patient Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-4 text-balance">
            Loved by thousands of smiles
          </h2>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-foreground font-bold">4.9</span>
            <span className="text-muted-foreground text-sm">from 2,400+ Google reviews</span>
          </div>
        </div>

        <div ref={gridRef} className={`grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto stagger ${gridVisible ? "in-view" : ""}`}>
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-3xl border border-border p-6 md:p-8 card-lift relative overflow-hidden">
              <Quote className="absolute top-5 right-5 w-12 h-12 text-primary/10" strokeWidth={1.5} />

              <div className="relative">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < t.rating ? "text-amber-400 fill-amber-400" : "text-border"}`} />
                  ))}
                </div>

                <p className="text-foreground/85 leading-relaxed mb-6 text-pretty">"{t.review}"</p>

                <div className="flex items-center gap-3 pt-5 border-t border-border">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold text-primary text-sm">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.treatment}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
