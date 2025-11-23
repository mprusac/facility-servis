import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building2, Dumbbell, UtensilsCrossed, Home as HomeIcon, CheckCircle2, Sparkles, TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-cleaning.jpg";
const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const servicesSection = useScrollReveal();
  const testimonialsSection = useScrollReveal();
  const ctaSection = useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setShowBanner(false), 500);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseBanner = () => {
    setIsExiting(true);
    setTimeout(() => setShowBanner(false), 500);
  };

  const services = [{
    icon: Building2,
    title: "Poslovni prostori",
    color: "text-primary"
  }, {
    icon: Dumbbell,
    title: "Sportski objekti",
    color: "text-secondary"
  }, {
    icon: UtensilsCrossed,
    title: "Ugostiteljski objekti",
    color: "text-primary"
  }, {
    icon: HomeIcon,
    title: "Stambene zgrade",
    color: "text-secondary"
  }];
  const benefits = ["Tehničko znanje", "Kvalitetna usluga", "Pouzdan i provjeren tim", "Ekološka sredstva"];
  
  const testimonials = [
    {
      text: "Naša okućnica izgleda odlično! Redovito održavanje i precizno šišanje žive ograde odrađeni su besprijekorno. Posao je odrađen uredno, točno i pažljivo.",
      author: "Vanja G.",
      location: "Zagreb",
      company: "Obiteljska kuća"
    },
    {
      text: "Zamjena silikona na kadi odrađena je iznimno profesionalno, a rezultat izgleda kao novo. Brzo, uredno i bez ikakvih komplikacija! Svakako preporučujem njihovu uslugu.",
      author: "Mirko M.",
      location: "Zagreb",
      company: "Kućanski poslovi"
    },
    {
      text: "Čišćenje skladišta odrađeno je iznad očekivanja! Sve je temeljito očišćeno, sortirano i vraćeno u red bez ikakvog ometanja našeg rada. Vrhunska usluga, iskrene preporuke!",
      author: "Milena S.",
      location: "Zagreb",
      company: "Skladišni prostor"
    },
    {
      text: "Od kada koristimo njihove usluge, naši uredi blistaju! Profesionalan pristup i pažnja na detalje su izvanredni. Uvijek se prilagode našem rasporedu i nikada ne kasne.",
      author: "Marko P.",
      location: "Zagreb",
      company: "IT tvrtka"
    },
    {
      text: "Odličan servis za naš sportski centar. Dolaze redovno, rade temeljito i nikada nas nisu razočarali. Posebno cijenimo njihovu brzinu i fleksibilnost tijekom sezone.",
      author: "Ana K.",
      location: "Zagreb",
      company: "Sportski centar"
    },
    {
      text: "Preporučujem! Brzi, učinkoviti i pristupačni. Naš restoran uvijek izgleda besprijekorno čisto.",
      author: "Tomislav G.",
      location: "Zagreb",
      company: "Restoran"
    },
    {
      text: "Najpouzdanija usluga čišćenja s kojom smo radili. Njihov tim je uvijek ljubazan i profesionalan. Rezultati su konzistentno odlični i vidi se da im je stalo do kvalitete.",
      author: "Ivana S.",
      location: "Zagreb",
      company: "Ured"
    },
    {
      text: "Koristimo njihove usluge već godinu dana za našu stambenu zgradu. Stanari su vrlo zadovoljni!",
      author: "Petar M.",
      location: "Zagreb",
      company: "Upravitelj zgrade"
    },
    {
      text: "Izvrsna suradnja! Fleksibilni su s terminima i kvaliteta čišćenja je uvijek na visokoj razini.",
      author: "Lucija B.",
      location: "Zagreb",
      company: "Korporativni ured"
    }
  ];
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Achievement Banner */}
      {showBanner && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl transition-all duration-500 ${isExiting ? 'opacity-0 translate-y-[-20px]' : 'opacity-100 translate-y-0 animate-fade-in'}`}>
          <Alert className="bg-gradient-to-r from-primary via-primary to-secondary border-0 shadow-2xl backdrop-blur-sm relative">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={handleCloseBanner}
            >
              <X className="h-4 w-4" />
            </Button>
            <AlertDescription className="text-primary-foreground font-medium text-base md:text-lg pr-8">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl hidden sm:inline">✨</span>
                <div className="flex flex-col gap-1">
                  <span>
                    <strong className="font-bold">Studeni u brojkama:</strong> 4.000 m² očišćenih i održavanih prostora!
                  </span>
                  <span>
                    Zahvaljujemo na povjerenju i nastavljamo s istim žarom.
                  </span>
                </div>
                <span className="font-bold text-xl hidden sm:inline">✨</span>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <main className="flex-1">
        {/* Hero Section with Parallax */}
        <section className="relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center animate-fade-in parallax" 
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${heroImage})`,
              transform: `translateY(${scrollY * 0.5}px)`
            }} 
          />
          <div className="container relative py-24 md:py-32 text-white">
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center gap-2 mb-4 animate-slide-in-left">
                <Sparkles className="h-6 w-6 text-secondary animate-float" />
                <span className="text-sm font-medium">Profesionalna usluga čišćenja</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in-up">
                Profesionalno čišćenje i održavanje
              </h1>
              <p className="text-xl md:text-2xl text-white/90 animate-fade-in-up animate-delay-100">
                Vaš partner za besprijekornu čistoću u Zagrebu
              </p>
              <p className="text-lg text-white/80 animate-fade-in-up animate-delay-200">
                Mali obrt za čišćenje s iskustvom, specijaliziran za održavanje poslovnih prostora, 
                sportskih i korporativnih objekata, ugostiteljskih objekata i stambenih zgrada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up animate-delay-300">
                <Button asChild size="lg" className="text-lg transition-all hover:scale-105 hover:shadow-lg">
                  <Link to="/kontakt#kontakt-forma">Zatraži besplatnu ponudu</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg bg-white/10 border-white text-white hover:bg-white hover:text-primary transition-all hover:scale-105">
                  <Link to="/usluge">Pogledaj usluge</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => <Card key={index} className={`text-center hover-lift animate-scale-in animate-delay-${index}00`}>
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-8 w-8 text-secondary mx-auto mb-3 transition-transform group-hover:scale-110" />
                    <p className="font-medium">{benefit}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section ref={servicesSection.ref} className={`py-20 scroll-reveal ${servicesSection.isVisible ? 'revealed' : ''}`}>
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Naše usluge</h2>
              <p className="text-muted-foreground mx-0 my-0 px-0 py-0 text-base">
                Pružamo pouzdanu i kvalitetnu uslugu čišćenja uz pažnju na detalje i zadovoljstvo klijenata
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
              const Icon = service.icon;
              return <Card key={index} className={`group hover-lift cursor-pointer animate-fade-in-up animate-delay-${index}00`} style={{
                boxShadow: 'var(--shadow-card)'
              }}>
                    <CardContent className="pt-6 text-center">
                      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <Icon className={`h-8 w-8 ${service.color} transition-transform group-hover:scale-110`} />
                      </div>
                      <h3 className="font-semibold text-lg transition-colors group-hover:text-primary">{service.title}</h3>
                    </CardContent>
                  </Card>;
            })}
            </div>
            <div className="text-center mt-8 animate-fade-in-up animate-delay-400">
              <Button asChild size="lg" variant="outline" className="transition-all hover:scale-105">
                <Link to="/kontakt#kontakt-forma">Detaljnije o uslugama</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Slider */}
        <section ref={testimonialsSection.ref} className={`py-20 bg-muted/50 scroll-reveal ${testimonialsSection.isVisible ? 'revealed' : ''}`}>
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Što kažu naši klijenti</h2>
              <p className="text-muted-foreground">
                Povjerenje naših klijenata je naša najveća vrijednost
              </p>
            </div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="max-w-5xl mx-auto"
            >
              <CarouselContent className="items-center">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 flex">
                    <Card className="h-full hover-glow w-full">
                      <CardContent className="pt-8 pb-6 px-6 flex flex-col h-full justify-center">
                        <div className="flex justify-center mb-4 gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-xl text-secondary inline-block">
                              ★
                            </span>
                          ))}
                        </div>
                        <blockquote className="text-lg font-medium mb-6 flex-grow text-center">
                          "{testimonial.text}"
                        </blockquote>
                        <div className="text-center">
                          <cite className="text-muted-foreground not-italic font-medium block">
                            {testimonial.author}
                          </cite>
                          <span className="text-sm text-muted-foreground">
                            {testimonial.company}, {testimonial.location}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex w-12 h-12 border-2 hover:scale-110 transition-transform shadow-lg bg-background/95 hover:bg-primary hover:text-primary-foreground" />
              <CarouselNext className="hidden md:flex w-12 h-12 border-2 hover:scale-110 transition-transform shadow-lg bg-background/95 hover:bg-primary hover:text-primary-foreground" />
            </Carousel>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaSection.ref} className={`py-20 scroll-reveal-scale ${ctaSection.isVisible ? 'revealed' : ''}`}>
          <div className="container">
            <Card className="bg-primary text-primary-foreground hover-lift relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="pt-8 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
                  Spremni za besprijekornu čistoću?
                </h2>
                <p className="text-xl mb-6 text-primary-foreground/90 animate-fade-in-up animate-delay-100">
                  Kontaktirajte nas danas za besplatnu ponudu!
                </p>
                <Button asChild size="lg" variant="secondary" className="animate-fade-in-up animate-delay-200 transition-all hover:scale-110">
                  <Link to="/kontakt#kontakt-forma">Zatraži ponudu</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Home;