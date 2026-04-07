import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Sparkles, Shield, Smile, Stethoscope, Zap, Heart, Crown, AlertTriangle } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Teeth Cleaning",
    desc: "Professional deep cleaning removes plaque, tartar, and stains to prevent cavities and gum disease. Our hygienists use ultrasonic scalers and polishing tools for a thorough clean.",
    price: "$80 - $150",
    benefits: ["Prevents cavities", "Freshens breath", "Removes stains"],
  },
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    desc: "Advanced in-office whitening treatments can brighten your smile by up to 8 shades in just one visit. We also offer custom take-home whitening kits.",
    price: "$200 - $500",
    benefits: ["Up to 8 shades whiter", "Quick results", "Long-lasting"],
  },
  {
    icon: Shield,
    title: "Dental Implants",
    desc: "Permanent titanium implants replace missing teeth with natural-looking, durable restorations. Our 3D planning ensures precise placement and optimal results.",
    price: "$1,500 - $3,000",
    benefits: ["Permanent solution", "Natural appearance", "Preserves bone"],
  },
  {
    icon: Smile,
    title: "Braces & Orthodontics",
    desc: "From traditional metal braces to clear aligners, we offer comprehensive orthodontic solutions for children and adults to achieve perfectly aligned teeth.",
    price: "$3,000 - $7,000",
    benefits: ["Straighter teeth", "Better bite", "Improved confidence"],
  },
  {
    icon: Stethoscope,
    title: "Root Canal Treatment",
    desc: "Pain-free root canal therapy using modern rotary instruments and advanced anesthesia. We save damaged teeth while eliminating infection and pain.",
    price: "$500 - $1,200",
    benefits: ["Saves natural tooth", "Eliminates pain", "Prevents extraction"],
  },
  {
    icon: Heart,
    title: "Cosmetic Dentistry",
    desc: "Transform your smile with porcelain veneers, dental bonding, gum contouring, and smile makeovers designed by our expert cosmetic dentists.",
    price: "$300 - $2,000",
    benefits: ["Custom design", "Natural look", "Confidence boost"],
  },
  {
    icon: Crown,
    title: "Dental Crowns",
    desc: "High-quality porcelain and zirconia crowns restore damaged or weakened teeth. Same-day crowns available with our CEREC technology.",
    price: "$800 - $1,500",
    benefits: ["Same-day available", "Durable material", "Perfect fit"],
  },
  {
    icon: AlertTriangle,
    title: "Emergency Dental Care",
    desc: "Immediate care for dental emergencies including severe toothaches, broken teeth, knocked-out teeth, and dental abscesses. Available same day.",
    price: "$100 - $500",
    benefits: ["Same-day service", "Pain relief", "24/7 phone line"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 bg-gradient-to-br from-[hsl(210,30%,12%)] via-[hsl(200,35%,16%)] to-[hsl(192,40%,20%)]">
        <div className="container mx-auto px-4 text-center">
          <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: 'hsl(192, 80%, 65%)' }}>Our Services</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'white' }}>
            Premium Dental Services
          </h1>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'hsl(210, 15%, 65%)' }}>
            Comprehensive dental care from routine checkups to advanced cosmetic procedures, all under one roof.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service) => (
              <div key={service.title} className="rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all p-7">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-serif text-xl text-foreground">{service.title}</h3>
                      <span className="text-primary font-bold text-sm whitespace-nowrap bg-primary/10 px-3 py-1 rounded-full">{service.price}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.benefits.map((b) => (
                        <span key={b} className="text-xs bg-secondary text-muted-foreground px-3 py-1 rounded-full font-medium">
                          ✓ {b}
                        </span>
                      ))}
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
