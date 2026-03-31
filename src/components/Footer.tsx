import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-serif font-bold text-lg">S</span>
              </div>
              <span className="font-serif text-xl font-bold">
                SmilePro <span className="text-accent">Dental</span>
              </span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Premium dental care with state-of-the-art technology and a compassionate team dedicated to your perfect smile.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-accent mb-4">Quick Links</h4>
            <div className="space-y-2">
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
                  className="block text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-accent mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-sm text-primary-foreground/60">123 Dental Avenue, Medical District, City 10001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/60">(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/60">info@smileprodental.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-accent mb-4">Working Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <div>
                  <p className="text-sm text-primary-foreground/80">Mon - Fri</p>
                  <p className="text-sm text-primary-foreground/60">9:00 AM - 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <div>
                  <p className="text-sm text-primary-foreground/80">Saturday</p>
                  <p className="text-sm text-primary-foreground/60">9:00 AM - 5:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <div>
                  <p className="text-sm text-primary-foreground/80">Sunday</p>
                  <p className="text-sm text-primary-foreground/60">Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-sm text-primary-foreground/40">
            © 2026 SmilePro Dental. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
