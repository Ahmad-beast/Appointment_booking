import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="currentColor">
                  <path d="M12 2C8 2 5 4 5 7.5c0 1.5.5 3 1 4.5.3 1 .5 2 .5 3 0 2 .5 5 2 5s2-2 2.5-4 1-3 1-3 .5 1 1 3 .5 4 2.5 4 2-3 2-5c0-1 .2-2 .5-3 .5-1.5 1-3 1-4.5C19 4 16 2 12 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold leading-none text-background">SmilePro</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary leading-tight mt-0.5">Dental Care</span>
              </div>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Premium dental care with cutting-edge technology and a compassionate team dedicated to your perfect smile.
            </p>
            <div className="flex gap-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-background">Quick Links</h4>
            <div className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: "Our Doctors", path: "/doctors" },
                { name: "Patient Reviews", path: "/reviews" },
                { name: "Book Appointment", path: "/book" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-2 text-sm text-background/60 hover:text-primary hover:translate-x-1 transition-all duration-300 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-background">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-background/60 leading-relaxed">123 Dental Avenue, Medical District, City 10001</span>
              </div>
              <a href="tel:+1234567890" className="flex items-start gap-3 group">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-background/60 group-hover:text-primary transition-colors">(123) 456-7890</span>
              </a>
              <a href="mailto:info@smileprodental.com" className="flex items-start gap-3 group">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-background/60 group-hover:text-primary transition-colors">info@smileprodental.com</span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-background">Working Hours</h4>
            <div className="space-y-3">
              {[
                { day: "Mon - Fri", hours: "9 AM - 7 PM" },
                { day: "Saturday", hours: "9 AM - 5 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map((item) => (
                <div key={item.day} className="flex items-center justify-between gap-3 py-1.5 border-b border-background/10">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span className="text-sm font-medium text-background/80">{item.day}</span>
                  </div>
                  <span className="text-sm text-background/60">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">© 2026 SmilePro Dental Care. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-background/50 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-background/50 hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
