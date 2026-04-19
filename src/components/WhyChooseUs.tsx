import { Award, Heart, Clock, Microscope, ShieldCheck, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";
import patientImg from "@/assets/happy-patient.jpg";

const reasons = [
  { icon: Microscope, title: "Advanced Technology", desc: "3D imaging, laser dentistry, and same-day crowns." },
  { icon: Award, title: "Award-Winning Team", desc: "Top-rated dental clinic 5 years running." },
  { icon: Heart, title: "Gentle, Caring Approach", desc: "Personalized care focused on your comfort." },
  { icon: Clock, title: "Flexible Scheduling", desc: "Same-day appointments and evening hours." },
  { icon: ShieldCheck, title: "Insurance Friendly", desc: "We work with all major insurance providers." },
  { icon: Users, title: "Family Dentistry", desc: "Care for every age, from toddlers to grandparents." },
];

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 10000, suffix: "+", label: "Happy Patients" },
  { value: 25, suffix: "+", label: "Expert Dentists" },
  { value: 99, suffix: "%", label: "Satisfaction Rate" },
];

const AnimatedCounter = ({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1800;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span>
      {isVisible ? count.toLocaleString() : 0}
      {suffix}
    </span>
  );
};

const WhyChooseUs = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Left: Image */}
          <div ref={leftRef} className={`relative reveal-left ${leftVisible ? "in-view" : ""}`}>
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 animate-blob" />
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/15">
                <img
                  src={patientImg}
                  alt="Happy patient with bright smile"
                  className="w-full h-full object-cover"
                  width={768}
                  height={1024}
                  loading="lazy"
                />
              </div>

              {/* Floating stat */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 glass rounded-2xl p-5 shadow-xl border border-white/40 animate-float">
                <p className="text-3xl font-serif font-bold text-primary">98%</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">Patients return<br />within 6 months</p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div ref={rightRef} className={`reveal-right ${rightVisible ? "in-view" : ""}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              Why Choose Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-5 text-balance">
              Premium care that puts you first
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 text-pretty">
              We combine clinical excellence with genuine warmth — because going to the dentist should never feel intimidating.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map((r) => (
                <div key={r.title} className="flex gap-3 group">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <r.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-0.5">{r.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className={`bg-card border border-border rounded-3xl p-8 md:p-12 shadow-lg reveal-scale ${statsVisible ? "in-view" : ""}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={statsVisible} />
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
