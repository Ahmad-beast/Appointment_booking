import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center bg-gradient-to-br from-[hsl(210,30%,10%)] via-[hsl(205,35%,14%)] to-[hsl(192,40%,18%)] overflow-hidden animate-gradient" style={{ backgroundSize: '200% 200%' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[140px] animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-[hsl(160,60%,40%)]/5 blur-[100px] animate-float" />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/30 particle"
            style={{
              top: `${20 + i * 12}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(192, 80%, 65%) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-primary/15 backdrop-blur-md border border-primary/20 rounded-full px-5 py-2.5 animate-pulse-glow">
              <Sparkles className="w-3.5 h-3.5" style={{ color: 'hsl(192, 80%, 65%)' }} />
              <span className="text-sm font-semibold" style={{ color: 'hsl(192, 70%, 70%)' }}>Now Accepting New Patients</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight" style={{ color: 'white' }}>
              Modern Dental Care{" "}
              <span className="block shimmer-text mt-2">You Can Trust</span>
            </h1>

            <p className="text-lg md:text-xl max-w-lg leading-relaxed" style={{ color: 'hsl(210, 15%, 70%)' }}>
              Experience gentle, personalized dentistry with cutting-edge technology.
              From routine checkups to complete smile makeovers — we're here for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/book">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 gap-2 rounded-xl shadow-lg shadow-primary/30 h-13 hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-300">
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="font-semibold text-base px-8 rounded-xl h-13 border-white/15 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300" style={{ color: 'hsl(210, 15%, 85%)' }}>
                  <Play className="w-4 h-4 mr-2" /> View Our Services
                </Button>
              </Link>
            </div>

            {/* Trust indicators with stagger */}
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              {[
                "15+ Years Experience",
                "10,000+ Happy Patients",
                "Same-Day Appointments",
              ].map((item, i) => (
                <div 
                  key={item} 
                  className={`flex items-center gap-2.5 transition-all duration-700 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: `${800 + i * 200}ms` }}
                >
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0" style={{ color: 'hsl(160, 60%, 55%)' }} />
                  <span className="text-sm font-semibold" style={{ color: 'hsl(210, 15%, 75%)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Enhanced Stats cards */}
          <div className={`hidden lg:block transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="relative">
              {/* Main stat card */}
              <div className="bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-8 max-w-sm ml-auto shadow-2xl shadow-black/20 hover:border-white/20 transition-all duration-500">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center animate-pulse-glow">
                      <span className="text-3xl">🦷</span>
                    </div>
                    <div>
                      <p className="font-serif text-xl" style={{ color: 'white' }}>SmilePro Dental</p>
                      <p className="text-sm font-medium" style={{ color: 'hsl(210, 15%, 55%)' }}>Premium Care Center</p>
                    </div>
                  </div>

                  {[
                    { value: "4.9★", label: "Patient Rating", color: "hsl(45, 90%, 60%)" },
                    { value: "25+", label: "Expert Dentists", color: "hsl(192, 80%, 65%)" },
                    { value: "12", label: "Industry Awards", color: "hsl(160, 60%, 55%)" },
                  ].map((stat, i) => (
                    <div 
                      key={stat.label} 
                      className={`flex items-center justify-between group/stat p-3 -mx-3 rounded-xl hover:bg-white/5 transition-all duration-300 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                      style={{ transitionDelay: `${1000 + i * 150}ms` }}
                    >
                      <span className="text-sm font-medium group-hover/stat:text-white/80 transition-colors" style={{ color: 'hsl(210, 15%, 60%)' }}>{stat.label}</span>
                      <span className="font-sans text-xl font-bold tracking-tight" style={{ color: stat.color }}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-8 -left-8 bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-2xl px-6 py-4 animate-float shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'hsl(210, 15%, 55%)' }}>Working Hours</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: 'white' }}>Mon-Sat: 9AM-7PM</p>
              </div>

              {/* New floating element */}
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-2xl border border-primary/20 rounded-2xl px-5 py-3 animate-float-delayed shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold" style={{ color: 'hsl(160, 60%, 65%)' }}>Open Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="hsl(0, 0%, 100%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
