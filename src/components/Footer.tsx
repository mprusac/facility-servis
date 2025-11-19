import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
const Footer = () => {
  return <footer className="border-t bg-muted/50">
      <div className="container py-8 sm:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-10 w-10" />
              <span className="text-base sm:text-lg font-bold text-primary">Facility Servis</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Profesionalno čišćenje i održavanje – Vaš partner za besprijekornu čistoću u Zagrebu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-base">Stranice</h3>
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
            <h3 className="font-semibold mb-3 sm:mb-4 text-base">Kontakt</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+385919466599" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 flex-shrink-0" />
                091 946 6599
              </a>
              <a href="mailto:facility-servis@outlook.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors break-words">
                <Mail className="h-4 w-4 flex-shrink-0" />
                facility-servis@outlook.com
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Zagreb, Hrvatska</span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-base">Radno vrijeme</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Ponedjeljak - Nedjelja:</p>
              <p className="font-medium">00 - 24h (Non-stop)</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Facility Servis. Sva prava zadržana.
        </div>
      </div>
    </footer>;
};
export default Footer;