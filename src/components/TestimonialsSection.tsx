import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            What Our Patients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-border/50 hover:border-accent/20 transition-all">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < t.rating ? "text-accent fill-accent" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">"{t.review}"</p>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-accent text-xs">{t.treatment}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
