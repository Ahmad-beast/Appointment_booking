import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Quote, Send } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type Review = { id: string; patient_name: string; rating: number; comment: string };

const TestimonialsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("reviews")
        .select("id,patient_name,rating,comment")
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(4);
      setReviews((data as Review[]) || []);
    })();
  }, []);

  const avgRating = reviews.length
    ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

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
            <span className="text-foreground font-bold">{avgRating}</span>
            <span className="text-muted-foreground text-sm">
              from {reviews.length} verified review{reviews.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="max-w-xl mx-auto text-center bg-card border border-border rounded-3xl p-10">
            <Quote className="w-10 h-10 text-primary/30 mx-auto mb-4" />
            <p className="text-foreground/80 mb-6">No reviews yet. Be the first to share your experience!</p>
            <Link to="/reviews">
              <Button className="rounded-full h-12 px-8 font-bold gap-2">
                <Send className="w-4 h-4" /> Write a Review
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div ref={gridRef} className={`grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto stagger ${gridVisible ? "in-view" : ""}`}>
              {reviews.map((t) => (
                <div key={t.id} className="bg-card rounded-3xl border border-border p-6 md:p-8 card-lift relative overflow-hidden">
                  <Quote className="absolute top-5 right-5 w-12 h-12 text-primary/10" strokeWidth={1.5} />

                  <div className="relative">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < t.rating ? "text-amber-400 fill-amber-400" : "text-border"}`} />
                      ))}
                    </div>

                    <p className="text-foreground/85 leading-relaxed mb-6 text-pretty line-clamp-5">"{t.comment}"</p>

                    <div className="flex items-center gap-3 pt-5 border-t border-border">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold text-primary text-sm">
                        {t.patient_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{t.patient_name}</p>
                        <p className="text-muted-foreground text-xs">Verified Patient</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/reviews">
                <Button variant="outline" className="rounded-full h-12 px-8 font-bold border-2">
                  Read All Reviews & Share Yours
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
