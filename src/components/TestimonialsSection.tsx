import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria Johnson",
    treatment: "Teeth Whitening",
    rating: 5,
    review: "Absolutely amazing experience! My teeth have never looked this good. The staff was incredibly professional and made me feel comfortable throughout.",
  },
  {
    name: "Robert Smith",
    treatment: "Dental Implants",
    rating: 5,
    review: "Dr. Wilson did an incredible job with my implants. The process was smooth, painless, and the results are phenomenal. Highly recommend!",
  },
  {
    name: "Lisa Anderson",
    treatment: "Orthodontics",
    rating: 5,
    review: "Best dental clinic I've ever been to. The entire team is so caring and attentive. My braces journey has been much easier than expected.",
  },
  {
    name: "David Park",
    treatment: "Root Canal",
    rating: 4,
    review: "I was terrified of getting a root canal but the team made it completely painless. Modern equipment and very gentle doctors.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            What Our Patients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl border border-border p-7 hover:shadow-md transition-all">
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-foreground/80 text-sm leading-relaxed mb-5">{t.review}</p>
              <div className="flex items-center justify-between pt-5 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{t.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.treatment}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < t.rating ? "text-amber-400 fill-amber-400" : "text-border"}`}
                    />
                  ))}
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
