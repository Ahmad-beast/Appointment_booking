import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Sparkles, ArrowRight } from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Service = { id: string; name: string; description: string | null; price: number; duration_minutes: number };

const Services = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useStaggerAnimation(8);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("services")
        .select("id,name,description,price,duration_minutes")
        .eq("active", true)
        .order("sort_order");
      setServices((data as Service[]) || []);
    })();
  }, []);

  return (
    <div className="min-h-screen page-enter">
      <Navbar />
      <section className="pt-32 pb-20 bg-gradient-to-br from-[hsl(210,30%,10%)] via-[hsl(205,35%,14%)] to-[hsl(192,40%,18%)] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[140px] animate-float" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, hsl(192, 80%, 65%) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div ref={headerRef} className={`container mx-auto px-4 text-center relative z-10 ${headerVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <p className="font-bold text-sm uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2" style={{ color: 'hsl(192, 80%, 65%)' }}>
            <span className="w-8 h-[2px] rounded-full" style={{ backgroundColor: 'hsl(192, 80%, 65%)' }} />
            Our Services
            <span className="w-8 h-[2px] rounded-full" style={{ backgroundColor: 'hsl(192, 80%, 65%)' }} />
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight" style={{ color: 'white' }}>
            Premium Dental <span className="shimmer-text">Services</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'hsl(210, 15%, 65%)' }}>
            Comprehensive dental care from routine checkups to advanced cosmetic procedures, all under one roof.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div 
            ref={gridRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children ${gridVisible ? 'stagger-visible' : ''}`}
          >
            {services.map((service) => (
              <div key={service.id} className="rounded-2xl border border-border bg-card card-hover group p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors duration-300">{service.name}</h3>
                      <span className="text-primary font-bold text-sm whitespace-nowrap bg-primary/10 px-4 py-1.5 rounded-full">${Number(service.price).toFixed(0)}</span>
                    </div>
                    {service.description && <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-secondary text-muted-foreground px-3 py-1.5 rounded-full font-medium">⏱ {service.duration_minutes} min</span>
                    </div>
                    <div className="mt-4">
                      <Link to="/book" className="text-sm font-semibold text-primary flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Book This Service <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Services;
