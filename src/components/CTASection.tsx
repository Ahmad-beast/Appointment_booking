import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = ["Free first consultation", "Insurance accepted", "Same-day appointments"];

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary via-primary to-accent p-8 sm:p-12 md:p-16 lg:p-20 reveal-scale ${isVisible ? "in-view" : ""}`}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10 animate-blob" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/10 animate-blob" style={{ animationDelay: "3s" }} />

          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span className="text-xs sm:text-sm font-semibold text-white">Schedule Your Visit Today</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-5 text-balance">
              Ready for your perfect smile?
            </h2>
            <p className="text-base md:text-lg text-primary-foreground/90 max-w-xl mx-auto mb-8 text-pretty">
              Join thousands of happy patients. Book your appointment in less than 60 seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/book" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-10 rounded-full font-bold text-base sm:text-lg bg-white text-primary hover:bg-white/95 hover:-translate-y-0.5 shadow-xl transition-all duration-300 gap-2">
                  Book Free Consultation <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+1234567890" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 rounded-full font-bold text-base sm:text-lg bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white transition-all duration-300 gap-2">
                  <Phone className="w-5 h-5" /> Call Now
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-primary-foreground/90 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span className="font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
