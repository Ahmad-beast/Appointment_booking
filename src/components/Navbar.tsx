import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Our Doctors", path: "/doctors" },
  { name: "Reviews", path: "/reviews" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Solid background on inner pages (for contrast); transparent only on home top
  const showSolid = scrolled || !isHome || isOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolid ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" fill="currentColor">
                <path d="M12 2C8 2 5 4 5 7.5c0 1.5.5 3 1 4.5.3 1 .5 2 .5 3 0 2 .5 5 2 5s2-2 2.5-4 1-3 1-3 .5 1 1 3 .5 4 2.5 4 2-3 2-5c0-1 .2-2 .5-3 .5-1.5 1-3 1-4.5C19 4 16 2 12 2z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold leading-none text-foreground">
                SmilePro
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary leading-tight mt-0.5">
                Dental Care
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/8"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors duration-300 group"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <span className="hidden xl:inline">(123) 456-7890</span>
            </a>
            <Link to="/book">
              <Button className="rounded-full h-12 px-7 text-base font-bold gap-2 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                <Calendar className="w-5 h-5" /> Book Now
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden text-foreground p-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            isOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 grid grid-cols-2 gap-2">
              <a href="tel:+1234567890">
                <Button variant="outline" className="w-full h-12 rounded-xl gap-2 text-base font-bold">
                  <Phone className="w-5 h-5" /> Call
                </Button>
              </a>
              <Link to="/book">
                <Button className="w-full h-12 rounded-xl gap-2 text-base font-bold shadow-md shadow-primary/25">
                  <Calendar className="w-5 h-5" /> Book
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
