import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    specialization: "Cosmetic Dentistry",
    experience: "12 Years Experience",
    emoji: "👩‍⚕️",
  },
  {
    name: "Dr. James Wilson",
    specialization: "Orthodontics",
    experience: "15 Years Experience",
    emoji: "👨‍⚕️",
  },
  {
    name: "Dr. Emily Chen",
    specialization: "Dental Implants",
    experience: "10 Years Experience",
    emoji: "👩‍⚕️",
  },
];

const FeaturedDoctors = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-2">Our Experts</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Meet Our Doctors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {doctors.map((doc) => (
            <Card key={doc.name} className="text-center border-border/50 hover:shadow-lg transition-all group">
              <CardContent className="p-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-5xl">
                  {doc.emoji}
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">{doc.name}</h3>
                <p className="text-accent text-sm font-medium mt-1">{doc.specialization}</p>
                <p className="text-muted-foreground text-xs mt-1">{doc.experience}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/doctors">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground gap-2">
              View All Doctors <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
