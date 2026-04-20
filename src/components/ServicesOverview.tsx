import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Smile, Stethoscope, Zap, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  { icon: Sparkles, title: "Teeth Whitening", desc: "Brighten your smile up to 8 shades in just one visit." },
  { icon: Shield, title: "Dental Implants", desc: "Permanent, natural-looking tooth replacement solutions." },
  { icon: Smile, title: "Invisalign & Braces", desc: "Modern orthodontics for perfectly aligned teeth." },
  { icon: Stethoscope, title: "Root Canal", desc: "Pain-free treatment to save your natural teeth." },
  { icon: Zap, title: "Cleaning & Checkup", desc: "Gentle deep cleaning for optimal oral health." },
  { icon: Heart, title: "Cosmetic Dentistry", desc: "Veneers, bonding, and complete smile makeovers." },
];

const ServicesOverview = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center mb-12 md:mb-16 reveal ${headerVisible ? "in-view" : ""}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Our Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-4 text-balance">
            Comprehensive dental care<br className="hidden sm:block" /> for the whole family
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-pretty">
            From routine cleanings to complete smile transformations, we offer a full range of dental services using the latest technology.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 stagger ${gridVisible ? "in-view" : ""}`}
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative p-6 md:p-7 rounded-3xl border border-border bg-card card-lift overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/5 -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />

              <div className="relative">
                <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Link to="/book" className="text-sm font-bold text-primary hover:underline">
                    Book Now
                  </Link>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button size="lg" variant="outline" className="rounded-full h-12 px-8 gap-2 font-semibold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
              View All Services <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
