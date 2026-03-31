import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">Premium Dental Care</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Your Smile,{" "}
              <span className="text-accent">Our Priority</span>
            </h1>

            <p className="text-primary-foreground/60 text-lg max-w-lg leading-relaxed">
              Experience world-class dental care with our team of expert dentists. 
              From routine checkups to advanced cosmetic procedures, we deliver excellence with every smile.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8 gap-2">
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8">
                  Our Services
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 pt-4">
              {[
                { value: "15+", label: "Years Experience" },
                { value: "10K+", label: "Happy Patients" },
                { value: "25+", label: "Expert Doctors" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl md:text-3xl font-bold text-accent">{stat.value}</p>
                  <p className="text-primary-foreground/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side decorative */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center">
                <div className="w-60 h-60 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-serif text-6xl text-accent">🦷</span>
                    <p className="text-primary-foreground/60 text-sm mt-2 font-medium">SmilePro</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-full px-4 py-2 text-sm font-semibold shadow-lg">
                ⭐ 4.9 Rating
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary-foreground/10 backdrop-blur rounded-full px-4 py-2 text-sm text-primary-foreground border border-primary-foreground/20">
                🏆 Award Winning
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
