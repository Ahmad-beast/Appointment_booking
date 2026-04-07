import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Smile, Stethoscope, Zap, Heart } from "lucide-react";

const services = [
  { icon: Sparkles, title: "Teeth Whitening", desc: "Advanced whitening for a dazzling, confident smile up to 8 shades brighter." },
  { icon: Shield, title: "Dental Implants", desc: "Permanent, natural-looking tooth replacement with precision 3D planning." },
  { icon: Smile, title: "Braces & Aligners", desc: "Modern orthodontic solutions for perfectly aligned teeth at any age." },
  { icon: Stethoscope, title: "Root Canal", desc: "Pain-free treatment with advanced technology to save your natural teeth." },
  { icon: Zap, title: "Teeth Cleaning", desc: "Professional deep cleaning to prevent cavities and maintain oral health." },
  { icon: Heart, title: "Cosmetic Dentistry", desc: "Veneers, bonding, and smile makeovers designed by expert cosmetic dentists." },
];

const ServicesOverview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              Comprehensive Dental Services
            </h2>
          </div>
          <Link to="/services">
            <Button variant="outline" className="rounded-xl gap-2 font-semibold border-border hover:border-primary hover:text-primary">
              All Services <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-7 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
