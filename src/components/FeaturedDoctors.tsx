import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import doc1 from "@/assets/doctor-1.jpg";
import doc2 from "@/assets/doctor-2.jpg";
import doc3 from "@/assets/doctor-3.jpg";

const doctors = [
  { name: "Dr. Sarah Mitchell", specialization: "Cosmetic Dentistry", experience: "12 Years", img: doc1, rating: 4.9 },
  { name: "Dr. James Wilson", specialization: "Orthodontics", experience: "15 Years", img: doc2, rating: 5.0 },
  { name: "Dr. Emily Chen", specialization: "Dental Implants", experience: "10 Years", img: doc3, rating: 4.9 },
];

const FeaturedDoctors = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

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

        <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger ${gridVisible ? "in-view" : ""}`}>
          {doctors.map((doc) => (
            <div key={doc.name} className="group rounded-3xl bg-card border border-border overflow-hidden card-lift">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={doc.img}
                  alt={`${doc.name}, ${doc.specialization}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  width={768}
                  height={960}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                {/* Rating badge */}
                <div className="absolute top-4 right-4 glass rounded-full px-3 py-1.5 flex items-center gap-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-foreground">{doc.rating}</span>
                </div>

                {/* Specialty pill */}
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
