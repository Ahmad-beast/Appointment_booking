import { Award, Heart, Clock, Microscope } from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

const reasons = [
  { icon: Microscope, title: "Advanced Technology", desc: "State-of-the-art 3D imaging, laser dentistry, and CEREC same-day crowns.", color: "from-cyan-500/15 to-primary/15" },
  { icon: Award, title: "Award-Winning Team", desc: "Recognized as a top dental clinic for 5 consecutive years running.", color: "from-amber-500/15 to-yellow-500/15" },
  { icon: Heart, title: "Patient-First Approach", desc: "Gentle, compassionate care personalized to your comfort and needs.", color: "from-rose-500/15 to-pink-500/15" },
  { icon: Clock, title: "Flexible Scheduling", desc: "Same-day appointments, evening hours, and minimal wait times.", color: "from-emerald-500/15 to-green-500/15" },
];

const stats = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 10000, suffix: "+", label: "Happy Patients" },
  { value: 25, suffix: "+", label: "Expert Dentists" },
  { value: 99, suffix: "%", label: "Patient Satisfaction" },
];

const AnimatedCounter = ({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
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

  return <span>{isVisible ? count.toLocaleString() : 0}{suffix}</span>;
};

const WhyChooseUs = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useStaggerAnimation(4);
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  return (
    <section className="py-28 bg-secondary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={headerRef} className={`text-center mb-16 ${headerVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-primary rounded-full" />
            Why SmilePro
            <span className="w-8 h-[2px] bg-primary rounded-full" />
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Why Patients Choose Us
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
            We combine clinical excellence with genuine care to deliver an experience that exceeds expectations.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 stagger-children ${cardsVisible ? 'stagger-visible' : ''}`}
        >
          {reasons.map((r) => (
            <div key={r.title} className="bg-card rounded-2xl p-8 border border-border card-hover group relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${r.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="w-14 h-14 mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <r.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats bar */}
        <div 
          ref={statsRef}
          className={`bg-gradient-to-r from-[hsl(210,30%,12%)] via-[hsl(205,35%,15%)] to-[hsl(192,40%,18%)] rounded-3xl p-10 md:p-14 shadow-2xl ${statsVisible ? 'scroll-visible-scale' : 'scroll-hidden-scale'}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <p className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight shimmer-text">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={statsVisible} />
                </p>
                <p className="text-sm mt-2 font-medium" style={{ color: 'hsl(210, 15%, 60%)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
