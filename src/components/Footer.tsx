import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
const Footer = () => {
  return <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-10 w-10" />
              <span className="text-lg font-bold text-primary">Facility Servis</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Profesionalno čišćenje i održavanje – Vaš partner za besprijekornu čistoću u Zagrebu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Stranice</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Naslovnica
              </Link>
              <Link to="/usluge" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Usluge
              </Link>
              <Link to="/galerija" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Galerija
              </Link>
              <Link to="/o-nama" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                O nama
              </Link>
              <Link to="/kontakt" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Kontakt
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+385919466599" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                091 946 6599
              </a>
              <a href="mailto:info@cistozagreb.hr" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">​facility-servis@outlook.com<Mail className="h-4 w-4" />
                info@cistozagreb.hr
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Zagreb, Hrvatska</span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-semibold mb-4">Radno vrijeme</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Ponedjeljak - Petak:</p>
              <p className="font-medium">08:00 - 18:00</p>
              <p className="mt-2">Subota:</p>
              <p className="font-medium">09:00 - 14:00</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Facility Servis. Sva prava zadržana.
        </div>
      </div>
    </footer>;
};
export default Footer;