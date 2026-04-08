import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[hsl(215,28%,10%)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[150px]" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-primary-foreground font-sans font-bold text-lg">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-lg font-bold leading-tight" style={{ color: 'white' }}>SmilePro</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] leading-tight" style={{ color: 'hsl(210, 15%, 45%)' }}>Dental Clinic</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'hsl(210, 15%, 45%)' }}>
              Premium dental care with state-of-the-art technology and a compassionate team dedicated to your perfect smile.
            </p>
            <Link to="/book" className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all duration-300">
              Book Appointment <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-6" style={{ color: 'hsl(210, 15%, 70%)' }}>Quick Links</h4>
            <div className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: "Our Doctors", path: "/doctors" },
                { name: "Reviews", path: "/reviews" },
                { name: "Book Appointment", path: "/book" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm hover:text-primary hover:translate-x-1 transition-all duration-300"
                  style={{ color: 'hsl(210, 15%, 45%)' }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-6" style={{ color: 'hsl(210, 15%, 70%)' }}>Contact Us</h4>
            <div className="space-y-4">
              {[
                { icon: MapPin, text: "123 Dental Avenue, Medical District, City 10001" },
                { icon: Phone, text: "(123) 456-7890" },
                { icon: Mail, text: "info@smileprodental.com" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/15 transition-colors duration-300">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm" style={{ color: 'hsl(210, 15%, 45%)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-6" style={{ color: 'hsl(210, 15%, 70%)' }}>Working Hours</h4>
            <div className="space-y-3">
              {[
                { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
                { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map((item) => (
                <div key={item.day} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors duration-300">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'hsl(210, 15%, 60%)' }}>{item.day}</p>
                    <p className="text-sm" style={{ color: 'hsl(210, 15%, 40%)' }}>{item.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'hsl(210, 15%, 35%)' }}>
            © 2026 SmilePro Dental. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm cursor-pointer hover:text-primary transition-colors duration-300" style={{ color: 'hsl(210, 15%, 35%)' }}>Privacy Policy</span>
            <span className="text-sm cursor-pointer hover:text-primary transition-colors duration-300" style={{ color: 'hsl(210, 15%, 35%)' }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
