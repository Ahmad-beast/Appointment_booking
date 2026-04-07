import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[hsl(215,25%,12%)] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-sans font-bold text-lg">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-lg font-bold leading-tight">SmilePro</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 leading-tight">Dental Clinic</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Premium dental care with state-of-the-art technology and a compassionate team dedicated to your perfect smile.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-white/80 mb-5">Quick Links</h4>
            <div className="space-y-2.5">
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
                  className="block text-sm text-white/40 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-white/80 mb-5">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm text-white/40">123 Dental Avenue, Medical District, City 10001</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm text-white/40">(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm text-white/40">info@smileprodental.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-white/80 mb-5">Working Hours</h4>
            <div className="space-y-3">
              {[
                { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
                { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map((item) => (
                <div key={item.day} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60 font-medium">{item.day}</p>
                    <p className="text-sm text-white/40">{item.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © 2026 SmilePro Dental. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-white/30 hover:text-white/50 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-sm text-white/30 hover:text-white/50 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
