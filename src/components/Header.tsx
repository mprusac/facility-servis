import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = [{
    label: "Naslovnica",
    path: "/"
  }, {
    label: "Usluge",
    path: "/usluge"
  }, {
    label: "Galerija",
    path: "/galerija"
  }, {
    label: "O nama",
    path: "/o-nama"
  }, {
    label: "Kontakt",
    path: "/kontakt"
  }];
  const isActive = (path: string) => location.pathname === path;
  return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
      <div className="container flex h-16 items-center justify-between mx-0 my-0">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Logo" className="h-10 w-10 transition-transform group-hover:scale-110 group-hover:rotate-6" />
          <span className="text-xl font-bold text-primary transition-all group-hover:tracking-wider">Facility Servis</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          {navItems.map(item => <Link key={item.path} to={item.path} className={`text-lg font-medium transition-all hover:text-primary relative group ${isActive(item.path) ? "text-primary" : "text-foreground/60"}`}>
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>)}
          <Button asChild className="transition-all hover:scale-105 hover:shadow-lg">
            <Link to="/kontakt#kontakt-forma">Zatraži ponudu</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden transition-transform hover:scale-110" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden border-t animate-fade-in">
          <nav className="container flex flex-col gap-4 py-4">
            {navItems.map(item => <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium transition-all hover:text-primary hover:translate-x-2 ${isActive(item.path) ? "text-primary" : "text-foreground/60"}`}>
                {item.label}
              </Link>)}
            <Button asChild className="w-full transition-all hover:scale-105">
              <Link to="/kontakt#kontakt-forma" onClick={() => setIsMenuOpen(false)}>
                Zatraži ponudu
              </Link>
            </Button>
          </nav>
        </div>}
    </header>;
};
export default Header;