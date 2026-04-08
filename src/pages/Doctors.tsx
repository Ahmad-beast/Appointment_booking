import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const doctors = [
  { name: "Dr. Sarah Mitchell", specialization: "Cosmetic Dentistry", experience: "12 Years", qualifications: "DDS, AACD Member", bio: "Specializes in smile makeovers, veneers, and teeth whitening. Known for her artistic approach.", initials: "SM", color: "from-primary/20 to-cyan-400/20" },
  { name: "Dr. James Wilson", specialization: "Orthodontics", experience: "15 Years", qualifications: "DMD, Board Certified", bio: "Expert in braces, clear aligners, and jaw alignment. Passionate about creating beautiful smiles.", initials: "JW", color: "from-violet-400/20 to-purple-400/20" },
  { name: "Dr. Emily Chen", specialization: "Dental Implants", experience: "10 Years", qualifications: "DDS, Implantology Fellow", bio: "Pioneer in 3D-guided implant surgery. Skilled in full-mouth rehabilitation.", initials: "EC", color: "from-emerald-400/20 to-teal-400/20" },
  { name: "Dr. Michael Brown", specialization: "Endodontics", experience: "18 Years", qualifications: "DDS, MS Endodontics", bio: "Root canal specialist with a gentle touch. Uses microscopic techniques.", initials: "MB", color: "from-amber-400/20 to-yellow-400/20" },
  { name: "Dr. Amara Patel", specialization: "Pediatric Dentistry", experience: "8 Years", qualifications: "DDS, Pediatric Specialist", bio: "Creates fun, anxiety-free dental experiences for children.", initials: "AP", color: "from-rose-400/20 to-pink-400/20" },
  { name: "Dr. David Kim", specialization: "Periodontics", experience: "14 Years", qualifications: "DMD, Periodontist", bio: "Gum disease specialist focused on laser periodontal therapy.", initials: "DK", color: "from-indigo-400/20 to-blue-400/20" },
];

const Doctors = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useStaggerAnimation(6);

  return (
    <div className="min-h-screen page-enter">
      <Navbar />
      <section className="pt-32 pb-20 bg-gradient-to-br from-[hsl(210,30%,10%)] via-[hsl(205,35%,14%)] to-[hsl(192,40%,18%)] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[140px] animate-float" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, hsl(192, 80%, 65%) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div ref={headerRef} className={`container mx-auto px-4 text-center relative z-10 ${headerVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <p className="font-bold text-sm uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2" style={{ color: 'hsl(192, 80%, 65%)' }}>
            <span className="w-8 h-[2px] rounded-full" style={{ backgroundColor: 'hsl(192, 80%, 65%)' }} />
            Our Team
            <span className="w-8 h-[2px] rounded-full" style={{ backgroundColor: 'hsl(192, 80%, 65%)' }} />
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight" style={{ color: 'white' }}>
            Expert <span className="shimmer-text">Doctors</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg" style={{ color: 'hsl(210, 15%, 65%)' }}>
            Our team of highly qualified dentists brings decades of combined experience and a passion for excellence.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div 
            ref={gridRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 stagger-children ${gridVisible ? 'stagger-visible' : ''}`}
          >
            {doctors.map((doc) => (
              <div key={doc.name} className="group rounded-2xl border border-border bg-card card-hover overflow-hidden">
                <div className={`bg-gradient-to-br ${doc.color} p-12 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full border border-white/10 group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full border border-white/10 group-hover:scale-150 transition-transform duration-700 delay-100" />
                  <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <span className="font-sans text-3xl font-bold text-primary">{doc.initials}</span>
                  </div>
                </div>
                <div className="p-7">
                  <div className="text-center mb-4">
                    <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors duration-300">{doc.name}</h3>
                    <p className="text-primary text-sm font-bold mt-1.5">{doc.specialization}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{doc.qualifications}</p>
                  </div>
                  <div className="h-px bg-border my-4" />
                  <p className="text-muted-foreground text-sm leading-relaxed text-center">{doc.bio}</p>
                  <div className="mt-5 flex items-center justify-center gap-3">
                    <span className="text-xs bg-primary/10 text-primary font-semibold px-4 py-1.5 rounded-full">
                      {doc.experience} Experience
                    </span>
                  </div>
                  <div className="mt-4 text-center">
                    <Link to="/book" className="text-sm font-semibold text-primary flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Book Appointment <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
