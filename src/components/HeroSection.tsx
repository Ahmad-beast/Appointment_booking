import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-[hsl(210,30%,12%)] via-[hsl(200,35%,16%)] to-[hsl(192,40%,20%)] overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/15 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-primary/90 text-sm font-medium" style={{ color: 'hsl(192, 70%, 70%)' }}>Now Accepting New Patients</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] tracking-tight" style={{ color: 'white' }}>
              Modern Dental Care{" "}
              <span className="block" style={{ color: 'hsl(192, 80%, 65%)' }}>You Can Trust</span>
            </h1>

            <p className="text-lg max-w-lg leading-relaxed" style={{ color: 'hsl(210, 15%, 70%)' }}>
              Experience gentle, personalized dentistry with cutting-edge technology.
              From routine checkups to complete smile makeovers — we're here for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/book">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 gap-2 rounded-xl shadow-lg shadow-primary/25 h-12">
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="font-semibold text-base px-8 rounded-xl h-12 border-white/15 hover:bg-white/5" style={{ color: 'hsl(210, 15%, 85%)' }}>
                  <Play className="w-4 h-4 mr-2" /> View Our Services
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {[
                "15+ Years Experience",
                "10,000+ Happy Patients",
                "Same-Day Appointments",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'hsl(160, 60%, 55%)' }} />
                  <span className="text-sm font-medium" style={{ color: 'hsl(210, 15%, 70%)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Stats cards */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main stat card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-sm ml-auto animate-scale-in">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <span className="text-3xl">🦷</span>
                    </div>
                    <div>
                      <p className="font-serif text-xl" style={{ color: 'white' }}>SmilePro Dental</p>
                      <p className="text-sm" style={{ color: 'hsl(210, 15%, 60%)' }}>Premium Care Center</p>
                    </div>
                  </div>

                  {[
                    { value: "4.9★", label: "Patient Rating", color: "hsl(45, 90%, 60%)" },
                    { value: "25+", label: "Expert Dentists", color: "hsl(192, 80%, 65%)" },
                    { value: "12", label: "Industry Awards", color: "hsl(160, 60%, 55%)" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: 'hsl(210, 15%, 70%)' }}>{stat.label}</span>
                      <span className="font-sans text-lg font-bold" style={{ color: stat.color }}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <p className="text-xs font-medium" style={{ color: 'hsl(210, 15%, 60%)' }}>Working Hours</p>
                <p className="text-sm font-bold" style={{ color: 'white' }}>Mon-Sat: 9AM-7PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
