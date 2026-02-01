import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { branding } from "@/config/branding";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/layanan", label: "Layanan" },
    { href: "/tentang", label: "Tentang Kami" },
    { href: "/syarat-berkas", label: "Syarat Berkas" },
    { href: "/kontak", label: "Kontak" },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {branding.logo.type === "image" ? (
              <img
                src={branding.logo.imagePath}
                alt={branding.name}
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
            ) : (
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg md:text-xl">{branding.logo.icon}</span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-lg md:text-xl leading-tight">{branding.name}</span>
              <span className="text-xs text-muted-foreground hidden sm:block">{branding.description}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`transition-colors duration-200 ${isActive(link.href)
                  ? "text-primary font-bold"
                  : "text-muted-foreground font-medium hover:text-brand-yellow"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="hero" size="default" asChild>
              <a href={`https://wa.me/${branding.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4" />
                Hubungi Kami
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 ${isActive(link.href)
                    ? "text-primary bg-secondary font-bold"
                    : "text-muted-foreground font-medium hover:text-brand-yellow hover:bg-secondary"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Button variant="hero" className="w-full" asChild>
                  <a href={`https://wa.me/${branding.whatsapp}`} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                    <Phone className="w-4 h-4" />
                    Hubungi Kami
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
