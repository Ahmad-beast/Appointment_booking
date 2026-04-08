import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Sparkles, Shield, Smile, Stethoscope, Zap, Heart, Crown, AlertTriangle, ArrowRight } from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Zap, title: "Teeth Cleaning", desc: "Professional deep cleaning removes plaque, tartar, and stains to prevent cavities and gum disease.", price: "$80 - $150", benefits: ["Prevents cavities", "Freshens breath", "Removes stains"], gradient: "from-emerald-500/10 to-green-500/10" },
  { icon: Sparkles, title: "Teeth Whitening", desc: "Advanced in-office whitening treatments can brighten your smile by up to 8 shades in just one visit.", price: "$200 - $500", benefits: ["Up to 8 shades whiter", "Quick results", "Long-lasting"], gradient: "from-amber-500/10 to-orange-500/10" },
  { icon: Shield, title: "Dental Implants", desc: "Permanent titanium implants replace missing teeth with natural-looking, durable restorations.", price: "$1,500 - $3,000", benefits: ["Permanent solution", "Natural appearance", "Preserves bone"], gradient: "from-primary/10 to-cyan-500/10" },
  { icon: Smile, title: "Braces & Orthodontics", desc: "From traditional metal braces to clear aligners, we offer comprehensive orthodontic solutions.", price: "$3,000 - $7,000", benefits: ["Straighter teeth", "Better bite", "Improved confidence"], gradient: "from-violet-500/10 to-purple-500/10" },
  { icon: Stethoscope, title: "Root Canal Treatment", desc: "Pain-free root canal therapy using modern rotary instruments and advanced anesthesia.", price: "$500 - $1,200", benefits: ["Saves natural tooth", "Eliminates pain", "Prevents extraction"], gradient: "from-rose-500/10 to-pink-500/10" },
  { icon: Heart, title: "Cosmetic Dentistry", desc: "Transform your smile with porcelain veneers, dental bonding, and smile makeovers.", price: "$300 - $2,000", benefits: ["Custom design", "Natural look", "Confidence boost"], gradient: "from-primary/10 to-teal-500/10" },
  { icon: Crown, title: "Dental Crowns", desc: "High-quality porcelain and zirconia crowns restore damaged or weakened teeth.", price: "$800 - $1,500", benefits: ["Same-day available", "Durable material", "Perfect fit"], gradient: "from-indigo-500/10 to-blue-500/10" },
  { icon: AlertTriangle, title: "Emergency Dental Care", desc: "Immediate care for dental emergencies including severe toothaches and broken teeth.", price: "$100 - $500", benefits: ["Same-day service", "Pain relief", "24/7 phone line"], gradient: "from-red-500/10 to-orange-500/10" },
];

const Services = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useStaggerAnimation(8);

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
              <div key={service.title} className="rounded-2xl border border-border bg-card card-hover group p-8 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                      <span className="text-primary font-bold text-sm whitespace-nowrap bg-primary/10 px-4 py-1.5 rounded-full">{service.price}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.benefits.map((b) => (
                        <span key={b} className="text-xs bg-secondary text-muted-foreground px-3 py-1.5 rounded-full font-medium">
                          ✓ {b}
                        </span>
                      ))}
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
