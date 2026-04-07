import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    specialization: "Cosmetic Dentistry",
    experience: "12 Years Experience",
    initials: "SM",
  },
  {
    name: "Dr. James Wilson",
    specialization: "Orthodontics",
    experience: "15 Years Experience",
    initials: "JW",
  },
  {
    name: "Dr. Emily Chen",
    specialization: "Dental Implants",
    experience: "10 Years Experience",
    initials: "EC",
  },
];

const FeaturedDoctors = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Our Experts</p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              Meet Our Doctors
            </h2>
          </div>
          <Link to="/doctors">
            <Button variant="outline" className="rounded-xl gap-2 font-semibold border-border hover:border-primary hover:text-primary">
              View All Doctors <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div key={doc.name} className="group rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-10 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/15 border-2 border-primary/20 flex items-center justify-center">
                  <span className="font-sans text-2xl font-bold text-primary">{doc.initials}</span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-xl text-foreground">{doc.name}</h3>
                <p className="text-primary text-sm font-semibold mt-1">{doc.specialization}</p>
                <p className="text-muted-foreground text-xs mt-1">{doc.experience}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
