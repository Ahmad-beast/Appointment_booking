import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight, Phone } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-28 bg-gradient-to-br from-[hsl(210,30%,10%)] via-[hsl(205,35%,14%)] to-[hsl(192,40%,18%)] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[140px] animate-float" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] animate-float-delayed" />
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(192, 80%, 65%) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div ref={ref} className={`container mx-auto px-4 text-center relative z-10 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 mb-8 animate-pulse-glow">
            <CalendarDays className="w-4 h-4" style={{ color: 'hsl(192, 80%, 65%)' }} />
            <span className="text-sm font-semibold" style={{ color: 'hsl(210, 15%, 80%)' }}>Schedule Your Visit Today</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight" style={{ color: 'white' }}>
            Ready for Your{" "}
            <span className="shimmer-text">Perfect Smile</span>?
          </h2>
          <p className="text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: 'hsl(210, 15%, 65%)' }}>
            Book your appointment today. Your journey to a healthier, more beautiful smile starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-10 gap-2 rounded-xl shadow-lg shadow-primary/30 h-13 hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-300">
                Book Appointment <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="tel:+1234567890">
              <Button size="lg" variant="outline" className="font-semibold text-base px-8 rounded-xl h-13 border-white/15 hover:bg-white/10 hover:border-white/30 transition-all duration-300" style={{ color: 'hsl(210, 15%, 85%)' }}>
                <Phone className="w-4 h-4 mr-2" /> Call Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
