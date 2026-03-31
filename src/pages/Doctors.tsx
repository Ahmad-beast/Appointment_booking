import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Card, CardContent } from "@/components/ui/card";

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    specialization: "Cosmetic Dentistry",
    experience: "12 Years",
    qualifications: "DDS, AACD Member",
    bio: "Specializes in smile makeovers, veneers, and teeth whitening. Known for her artistic approach to cosmetic dental procedures.",
    emoji: "👩‍⚕️",
  },
  {
    name: "Dr. James Wilson",
    specialization: "Orthodontics",
    experience: "15 Years",
    qualifications: "DMD, Board Certified Orthodontist",
    bio: "Expert in braces, clear aligners, and jaw alignment. Passionate about creating beautiful, functional smiles for patients of all ages.",
    emoji: "👨‍⚕️",
  },
  {
    name: "Dr. Emily Chen",
    specialization: "Dental Implants",
    experience: "10 Years",
    qualifications: "DDS, Implantology Fellow",
    bio: "Pioneer in 3D-guided implant surgery. Skilled in full-mouth rehabilitation and complex implant cases.",
    emoji: "👩‍⚕️",
  },
  {
    name: "Dr. Michael Brown",
    specialization: "Endodontics",
    experience: "18 Years",
    qualifications: "DDS, MS Endodontics",
    bio: "Root canal specialist with a gentle touch. Uses microscopic endodontic techniques for precise, pain-free treatments.",
    emoji: "👨‍⚕️",
  },
  {
    name: "Dr. Amara Patel",
    specialization: "Pediatric Dentistry",
    experience: "8 Years",
    qualifications: "DDS, Pediatric Specialist",
    bio: "Creates fun, anxiety-free dental experiences for children. Expert in preventive care and early orthodontic evaluation.",
    emoji: "👩‍⚕️",
  },
  {
    name: "Dr. David Kim",
    specialization: "Periodontics",
    experience: "14 Years",
    qualifications: "DMD, Periodontist",
    bio: "Gum disease specialist focused on laser periodontal therapy and tissue regeneration. Dedicated to preserving natural teeth.",
    emoji: "👨‍⚕️",
  },
];

const Doctors = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-2">Our Team</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">
            Expert <span className="text-accent">Doctors</span>
          </h1>
          <p className="text-primary-foreground/60 mt-4 max-w-2xl mx-auto">
            Our team of highly qualified dentists brings decades of combined experience and a passion for excellence.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doc) => (
              <Card key={doc.name} className="border-border/50 hover:border-accent/30 hover:shadow-lg transition-all text-center">
                <CardContent className="p-8">
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-6xl">
                    {doc.emoji}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{doc.name}</h3>
                  <p className="text-accent text-sm font-medium mt-1">{doc.specialization}</p>
                  <p className="text-muted-foreground text-xs mt-1">{doc.qualifications}</p>
                  <div className="my-4 h-px bg-border" />
                  <p className="text-muted-foreground text-sm leading-relaxed">{doc.bio}</p>
                  <div className="mt-4 inline-block bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full">
                    {doc.experience} Experience
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

export default Doctors;
