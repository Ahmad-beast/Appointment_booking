import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/dental-hero.jpg";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden gradient-mesh">
      {/* Soft decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-20 w-[500px] h-[500px] bg-primary/10 animate-blob blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] bg-accent/10 animate-blob blur-3xl" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left content */}
          <div className={`space-y-7 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="inline-flex items-center gap-2 bg-card border border-primary/20 rounded-full px-4 py-2 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-foreground">Now Accepting New Patients</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-foreground text-balance">
              Your Smile,{" "}
              <span className="relative inline-block">
                <span className="shimmer-text">Our Passion</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 T200,5" stroke="hsl(var(--accent))" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed text-pretty">
              Gentle, modern dentistry for the whole family. From routine checkups to complete smile transformations — experience care that puts you first.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/book" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-10 rounded-full font-bold text-base sm:text-lg gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                  <Calendar className="w-5 h-5" /> Book Free Consultation
                </Button>
              </Link>
              <a href="tel:+1234567890" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full font-bold text-sm sm:text-base border-2 hover:bg-primary/5 hover:border-primary transition-all duration-300 whitespace-nowrap">
                  Call (123) 456-7890
                </Button>
              </a>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-background" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-sm font-bold ml-1 text-foreground">4.9</span>
                  </div>
                  <p className="text-xs text-muted-foreground">10,000+ happy patients</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="font-medium">Insurance Accepted</span>
              </div>
            </div>
          </div>

          {/* Right: Hero image with floating cards */}
          <div className={`relative transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="relative aspect-[4/5] sm:aspect-[5/6] max-w-md mx-auto lg:max-w-none">
              {/* Background blob */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-blob" />

              {/* Image */}
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20">
                <img
                  src={heroImage}
                  alt="Friendly dentist at SmilePro Dental Clinic"
                  className="w-full h-full object-cover"
                  width={1024}
                  height={1280}
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              </div>

              {/* Floating card: rating */}
              <div className="absolute -top-4 -left-4 sm:-left-8 glass rounded-2xl p-4 shadow-xl animate-float border border-white/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Google Rating</p>
                    <p className="text-base font-bold text-foreground">4.9 / 5.0</p>
                  </div>
                </div>
              </div>

              {/* Floating card: open now */}
              <div className="absolute top-1/3 -right-3 sm:-right-6 glass rounded-2xl px-4 py-3 shadow-xl animate-float-slow border border-white/40">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <p className="text-xs font-bold text-foreground">Open Now</p>
                    <p className="text-[10px] text-muted-foreground">Closes 7 PM</p>
                  </div>
                </div>
              </div>

              {/* Floating card: pain free */}
              <div className="absolute -bottom-4 left-4 sm:left-8 glass rounded-2xl p-4 shadow-xl animate-float border border-white/40 max-w-[220px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-tight">Pain-Free Care</p>
                    <p className="text-xs text-muted-foreground">Modern technology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
