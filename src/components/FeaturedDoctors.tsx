import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Star, User } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  image_url: string | null;
};

const FeaturedDoctors = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("doctors")
        .select("id,name,specialization,experience,image_url")
        .order("name")
        .limit(3);
      setDoctors((data as Doctor[]) || []);
    };
    load();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div ref={headerRef} className={`max-w-3xl mx-auto text-center mb-12 md:mb-16 reveal ${headerVisible ? "in-view" : ""}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Meet Our Team
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-4 text-balance">
            Expert dentists who care
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-pretty">
            Our team of board-certified specialists brings decades of combined experience and a passion for gentle, exceptional care.
          </p>
        </div>

        {doctors.length > 0 && (
          <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger ${gridVisible ? "in-view" : ""}`}>
            {doctors.map((doc) => (
              <div key={doc.id} className="group rounded-3xl bg-card border border-border overflow-hidden card-lift">
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  {doc.image_url ? (
                    <img
                      src={doc.image_url}
                      alt={`${doc.name}, ${doc.specialization}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <User className="w-24 h-24 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                  <div className="absolute top-4 right-4 glass rounded-full px-3 py-1.5 flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-foreground">4.9</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-flex items-center gap-1.5 bg-card/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md">
                      <Award className="w-3 h-3 text-primary" />
                      <span className="text-xs font-bold text-foreground">{doc.specialization}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1">{doc.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{doc.experience} of expert care</p>

                  <Link to="/book">
                    <Button variant="outline" className="w-full rounded-full font-semibold gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                      Book Appointment <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/doctors">
            <Button size="lg" variant="outline" className="rounded-full h-12 px-8 gap-2 font-semibold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
              Meet All Doctors <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
