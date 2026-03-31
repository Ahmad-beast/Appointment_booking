import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const services = [
  { icon: "🪥", title: "Teeth Cleaning", desc: "Professional deep cleaning for a healthier, brighter smile." },
  { icon: "✨", title: "Teeth Whitening", desc: "Advanced whitening treatments for a dazzling, confident smile." },
  { icon: "🦷", title: "Dental Implants", desc: "Permanent tooth replacement with natural-looking implants." },
  { icon: "😁", title: "Braces & Orthodontics", desc: "Straighten your teeth with modern braces and aligners." },
  { icon: "🔧", title: "Root Canal", desc: "Pain-free root canal treatment with advanced technology." },
  { icon: "💎", title: "Cosmetic Dentistry", desc: "Transform your smile with veneers, bonding, and more." },
];

const ServicesOverview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-2">What We Offer</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Our Premium Services
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Comprehensive dental care tailored to your needs with the latest technology and techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="group border-border/50 hover:border-accent/30 hover:shadow-lg transition-all duration-300 bg-card">
              <CardContent className="p-8">
                <span className="text-4xl block mb-4">{service.icon}</span>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground gap-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
