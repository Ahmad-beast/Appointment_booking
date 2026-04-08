import { Star, Quote } from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  { name: "Maria Johnson", treatment: "Teeth Whitening", rating: 5, review: "Absolutely amazing experience! My teeth have never looked this good. The staff was incredibly professional and made me feel comfortable throughout." },
  { name: "Robert Smith", treatment: "Dental Implants", rating: 5, review: "Dr. Wilson did an incredible job with my implants. The process was smooth, painless, and the results are phenomenal. Highly recommend!" },
  { name: "Lisa Anderson", treatment: "Orthodontics", rating: 5, review: "Best dental clinic I've ever been to. The entire team is so caring and attentive. My braces journey has been much easier than expected." },
  { name: "David Park", treatment: "Root Canal", rating: 4, review: "I was terrified of getting a root canal but the team made it completely painless. Modern equipment and very gentle doctors." },
];

const TestimonialsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useStaggerAnimation(4);

  return (
    <section className="py-28 bg-secondary relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={headerRef} className={`text-center mb-16 ${headerVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-primary rounded-full" />
            Testimonials
            <span className="w-8 h-[2px] bg-primary rounded-full" />
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            What Our Patients Say
          </h2>
        </div>

        <div 
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto stagger-children ${gridVisible ? 'stagger-visible' : ''}`}
        >
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl border border-border p-8 card-hover group relative overflow-hidden">
              {/* Decorative quote */}
              <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <Quote className="w-24 h-24 text-primary" />
              </div>
              
              <div className="relative z-10">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < t.rating ? "text-amber-400 fill-amber-400" : "text-border"}`}
                    />
                  ))}
                </div>
                
                <p className="text-foreground/80 leading-relaxed mb-6 italic">"{t.review}"</p>
                
                <div className="flex items-center gap-3 pt-5 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-primary font-bold text-sm">{t.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-muted-foreground text-sm">{t.treatment}</p>
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
