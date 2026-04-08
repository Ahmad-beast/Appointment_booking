import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";

const doctors = [
  { name: "Dr. Sarah Mitchell", specialization: "Cosmetic Dentistry", experience: "12 Years Experience", initials: "SM", color: "from-primary/20 to-cyan-400/20" },
  { name: "Dr. James Wilson", specialization: "Orthodontics", experience: "15 Years Experience", initials: "JW", color: "from-violet-400/20 to-purple-400/20" },
  { name: "Dr. Emily Chen", specialization: "Dental Implants", experience: "10 Years Experience", initials: "EC", color: "from-emerald-400/20 to-teal-400/20" },
];

const FeaturedDoctors = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useStaggerAnimation(3);

  return (
    <section className="py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16 ${headerVisible ? 'scroll-visible' : 'scroll-hidden'}`}
        >
          <div>
            <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              Our Experts
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">
              Meet Our Doctors
            </h2>
          </div>
          <Link to="/doctors">
            <Button variant="outline" className="rounded-xl gap-2 font-semibold border-border hover:border-primary hover:text-primary hover:scale-[1.02] transition-all duration-300">
              View All Doctors <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div 
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-7 stagger-children ${gridVisible ? 'stagger-visible' : ''}`}
        >
          {doctors.map((doc) => (
            <div key={doc.name} className="group rounded-2xl border border-border bg-card card-hover overflow-hidden">
              <div className={`bg-gradient-to-br ${doc.color} p-12 flex items-center justify-center relative overflow-hidden`}>
                {/* Decorative circles */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full border border-white/10 group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full border border-white/10 group-hover:scale-150 transition-transform duration-700 delay-100" />
                
                <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <span className="font-sans text-3xl font-bold text-primary">{doc.initials}</span>
                </div>
              </div>
              <div className="p-7 text-center">
                <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors duration-300">{doc.name}</h3>
                <p className="text-primary text-sm font-bold mt-1.5">{doc.specialization}</p>
                <p className="text-muted-foreground text-xs mt-1">{doc.experience}</p>
                
                <div className="mt-5 pt-5 border-t border-border">
                  <Link to="/book" className="text-sm font-semibold text-primary hover:underline flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Book Appointment <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
