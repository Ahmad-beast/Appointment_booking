import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const doctors = [
  { name: "Dr. Sarah Mitchell", specialization: "Cosmetic Dentistry", experience: "12 Years", qualifications: "DDS, AACD Member", bio: "Specializes in smile makeovers, veneers, and teeth whitening. Known for her artistic approach to cosmetic dental procedures.", initials: "SM" },
  { name: "Dr. James Wilson", specialization: "Orthodontics", experience: "15 Years", qualifications: "DMD, Board Certified Orthodontist", bio: "Expert in braces, clear aligners, and jaw alignment. Passionate about creating beautiful, functional smiles for patients of all ages.", initials: "JW" },
  { name: "Dr. Emily Chen", specialization: "Dental Implants", experience: "10 Years", qualifications: "DDS, Implantology Fellow", bio: "Pioneer in 3D-guided implant surgery. Skilled in full-mouth rehabilitation and complex implant cases.", initials: "EC" },
  { name: "Dr. Michael Brown", specialization: "Endodontics", experience: "18 Years", qualifications: "DDS, MS Endodontics", bio: "Root canal specialist with a gentle touch. Uses microscopic endodontic techniques for precise, pain-free treatments.", initials: "MB" },
  { name: "Dr. Amara Patel", specialization: "Pediatric Dentistry", experience: "8 Years", qualifications: "DDS, Pediatric Specialist", bio: "Creates fun, anxiety-free dental experiences for children. Expert in preventive care and early orthodontic evaluation.", initials: "AP" },
  { name: "Dr. David Kim", specialization: "Periodontics", experience: "14 Years", qualifications: "DMD, Periodontist", bio: "Gum disease specialist focused on laser periodontal therapy and tissue regeneration. Dedicated to preserving natural teeth.", initials: "DK" },
];

const Doctors = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 bg-gradient-to-br from-[hsl(210,30%,12%)] via-[hsl(200,35%,16%)] to-[hsl(192,40%,20%)]">
        <div className="container mx-auto px-4 text-center">
          <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: 'hsl(192, 80%, 65%)' }}>Our Team</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'white' }}>
            Expert Doctors
          </h1>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'hsl(210, 15%, 65%)' }}>
            Our team of highly qualified dentists brings decades of combined experience and a passion for excellence.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <div key={doc.name} className="group rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all overflow-hidden">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-10 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/15 border-2 border-primary/20 flex items-center justify-center">
                    <span className="font-sans text-2xl font-bold text-primary">{doc.initials}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="font-serif text-xl text-foreground">{doc.name}</h3>
                    <p className="text-primary text-sm font-semibold mt-1">{doc.specialization}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{doc.qualifications}</p>
                  </div>
                  <div className="h-px bg-border my-4" />
                  <p className="text-muted-foreground text-sm leading-relaxed text-center">{doc.bio}</p>
                  <div className="mt-4 flex justify-center">
                    <span className="text-xs bg-primary/10 text-primary font-semibold px-4 py-1.5 rounded-full">
                      {doc.experience} Experience
                    </span>
                  </div>
                </div>
              </div>
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
