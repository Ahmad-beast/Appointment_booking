import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready for Your <span className="text-accent">Perfect Smile</span>?
        </h2>
        <p className="text-primary-foreground/60 max-w-lg mx-auto mb-8">
          Book your appointment today and experience premium dental care. Your journey to a healthier, more beautiful smile starts here.
        </p>
        <Link to="/book">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-10 gap-2">
            <CalendarDays className="w-5 h-5" /> Book Your Appointment
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
