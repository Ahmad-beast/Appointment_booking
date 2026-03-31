import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: "🪥",
    title: "Teeth Cleaning",
    desc: "Professional deep cleaning removes plaque, tartar, and stains to prevent cavities and gum disease. Our hygienists use ultrasonic scalers and polishing tools for a thorough clean.",
    price: "$80 - $150",
    benefits: ["Prevents cavities", "Freshens breath", "Removes stains"],
  },
  {
    icon: "✨",
    title: "Teeth Whitening",
    desc: "Advanced in-office whitening treatments can brighten your smile by up to 8 shades in just one visit. We also offer custom take-home whitening kits.",
    price: "$200 - $500",
    benefits: ["Up to 8 shades whiter", "Quick results", "Long-lasting"],
  },
  {
    icon: "🦷",
    title: "Dental Implants",
    desc: "Permanent titanium implants replace missing teeth with natural-looking, durable restorations. Our 3D planning ensures precise placement and optimal results.",
    price: "$1,500 - $3,000",
    benefits: ["Permanent solution", "Natural appearance", "Preserves bone"],
  },
  {
    icon: "😁",
    title: "Braces & Orthodontics",
    desc: "From traditional metal braces to clear aligners, we offer comprehensive orthodontic solutions for children and adults to achieve perfectly aligned teeth.",
    price: "$3,000 - $7,000",
    benefits: ["Straighter teeth", "Better bite", "Improved confidence"],
  },
  {
    icon: "🔧",
    title: "Root Canal Treatment",
    desc: "Pain-free root canal therapy using modern rotary instruments and advanced anesthesia. We save damaged teeth while eliminating infection and pain.",
    price: "$500 - $1,200",
    benefits: ["Saves natural tooth", "Eliminates pain", "Prevents extraction"],
  },
  {
    icon: "💎",
    title: "Cosmetic Dentistry",
    desc: "Transform your smile with porcelain veneers, dental bonding, gum contouring, and smile makeovers designed by our expert cosmetic dentists.",
    price: "$300 - $2,000",
    benefits: ["Custom design", "Natural look", "Confidence boost"],
  },
  {
    icon: "👑",
    title: "Dental Crowns",
    desc: "High-quality porcelain and zirconia crowns restore damaged or weakened teeth. Same-day crowns available with our CEREC technology.",
    price: "$800 - $1,500",
    benefits: ["Same-day available", "Durable material", "Perfect fit"],
  },
  {
    icon: "🚨",
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
      <section className="pt-28 pb-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-2">Our Services</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">
            Premium Dental <span className="text-accent">Services</span>
          </h1>
          <p className="text-primary-foreground/60 mt-4 max-w-2xl mx-auto">
            Comprehensive dental care from routine checkups to advanced cosmetic procedures, all under one roof.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="border-border/50 hover:border-accent/30 hover:shadow-lg transition-all">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{service.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-serif text-xl font-semibold text-foreground">{service.title}</h3>
                        <span className="text-accent font-semibold text-sm whitespace-nowrap ml-4">{service.price}</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.benefits.map((b) => (
                          <span key={b} className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                            ✓ {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
