import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Smile, Stethoscope, Zap, Heart } from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";

const services = [
  { icon: Sparkles, title: "Teeth Whitening", desc: "Advanced whitening for a dazzling, confident smile up to 8 shades brighter.", gradient: "from-amber-500/10 to-orange-500/10" },
  { icon: Shield, title: "Dental Implants", desc: "Permanent, natural-looking tooth replacement with precision 3D planning.", gradient: "from-primary/10 to-cyan-500/10" },
  { icon: Smile, title: "Braces & Aligners", desc: "Modern orthodontic solutions for perfectly aligned teeth at any age.", gradient: "from-violet-500/10 to-purple-500/10" },
  { icon: Stethoscope, title: "Root Canal", desc: "Pain-free treatment with advanced technology to save your natural teeth.", gradient: "from-rose-500/10 to-pink-500/10" },
  { icon: Zap, title: "Teeth Cleaning", desc: "Professional deep cleaning to prevent cavities and maintain oral health.", gradient: "from-emerald-500/10 to-green-500/10" },
  { icon: Heart, title: "Cosmetic Dentistry", desc: "Veneers, bonding, and smile makeovers designed by expert cosmetic dentists.", gradient: "from-primary/10 to-teal-500/10" },
];

const ServicesOverview = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useStaggerAnimation(6);

  return (
    <section className="py-28 bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16 ${headerVisible ? 'scroll-visible' : 'scroll-hidden'}`}
        >
          <div>
            <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              What We Offer
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight">
              Comprehensive Dental<br />Services
            </h2>
          </div>
          <Link to="/services">
            <Button variant="outline" className="rounded-xl gap-2 font-semibold border-border hover:border-primary hover:text-primary hover:scale-[1.02] transition-all duration-300">
              All Services <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div 
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${gridVisible ? 'stagger-visible' : ''}`}
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-8 rounded-2xl border border-border bg-card card-hover cursor-pointer relative overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                
                <div className="mt-5 flex items-center gap-2 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
