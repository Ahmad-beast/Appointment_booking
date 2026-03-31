import { Shield, Award, Heart, Clock } from "lucide-react";

const reasons = [
  { icon: Shield, title: "Advanced Technology", desc: "State-of-the-art equipment for precise, comfortable treatments." },
  { icon: Award, title: "Award Winning", desc: "Recognized as a top dental clinic for 5 consecutive years." },
  { icon: Heart, title: "Patient-First Care", desc: "Gentle, compassionate care tailored to your comfort level." },
  { icon: Clock, title: "Flexible Scheduling", desc: "Convenient appointments with minimal wait times." },
];

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "10,000+", label: "Happy Patients" },
  { value: "25+", label: "Expert Dentists" },
  { value: "12", label: "Industry Awards" },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-2">Why SmilePro</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reasons.map((r) => (
            <div key={r.title} className="text-center p-6 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/15 flex items-center justify-center">
                <r.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary-foreground mb-2">{r.title}</h3>
              <p className="text-primary-foreground/50 text-sm">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-bold text-accent">{stat.value}</p>
              <p className="text-primary-foreground/50 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
