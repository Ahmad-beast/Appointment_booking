import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[hsl(210,30%,12%)] via-[hsl(200,35%,16%)] to-[hsl(192,40%,20%)] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
            <CalendarDays className="w-4 h-4" style={{ color: 'hsl(192, 80%, 65%)' }} />
            <span className="text-sm font-medium" style={{ color: 'hsl(210, 15%, 80%)' }}>Schedule Your Visit Today</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight" style={{ color: 'white' }}>
            Ready for Your{" "}
            <span style={{ color: 'hsl(192, 80%, 65%)' }}>Perfect Smile</span>?
          </h2>
          <p className="text-lg max-w-lg mx-auto mb-8 leading-relaxed" style={{ color: 'hsl(210, 15%, 65%)' }}>
            Book your appointment today. Your journey to a healthier, more beautiful smile starts here.
          </p>
          <Link to="/book">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-10 gap-2 rounded-xl shadow-lg shadow-primary/25 h-12">
              Book Appointment <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
