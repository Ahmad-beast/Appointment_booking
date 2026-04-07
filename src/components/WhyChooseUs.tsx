import { Shield, Award, Heart, Clock, Users, Microscope } from "lucide-react";

const reasons = [
  { icon: Microscope, title: "Advanced Technology", desc: "State-of-the-art 3D imaging, laser dentistry, and CEREC same-day crowns." },
  { icon: Award, title: "Award-Winning Team", desc: "Recognized as a top dental clinic for 5 consecutive years running." },
  { icon: Heart, title: "Patient-First Approach", desc: "Gentle, compassionate care personalized to your comfort and needs." },
  { icon: Clock, title: "Flexible Scheduling", desc: "Same-day appointments, evening hours, and minimal wait times." },
];

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "10,000+", label: "Happy Patients" },
  { value: "25+", label: "Expert Dentists" },
  { value: "99%", label: "Patient Satisfaction" },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Why SmilePro</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            Why Patients Choose Us
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We combine clinical excellence with genuine care to deliver an experience that exceeds expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {reasons.map((r) => (
            <div key={r.title} className="bg-card rounded-2xl p-7 border border-border hover:shadow-md transition-all">
              <div className="w-12 h-12 mb-5 rounded-xl bg-primary/10 flex items-center justify-center">
                <r.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="bg-card rounded-2xl border border-border p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-sans text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground text-sm mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
