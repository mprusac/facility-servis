import { Link } from "react-router-dom";
import { Building2, Dumbbell, UtensilsCrossed, Home as HomeIcon, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-cleaning.jpg";
const Home = () => {
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
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center animate-fade-in" style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${heroImage})`
        }} />
          <div className="container relative py-24 md:py-32 text-white">
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center gap-2 mb-4 animate-slide-in-left">
                <Sparkles className="h-6 w-6 text-secondary animate-pulse" />
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
                  <Link to="/kontakt">Zatraži besplatnu ponudu</Link>
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
        <section className="py-20">
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
                <Link to="/usluge">Detaljnije o uslugama</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <Card className="max-w-3xl mx-auto hover-glow animate-scale-in">
              <CardContent className="pt-8 text-center">
                <div className="flex justify-center mb-4 gap-1">
                  {[...Array(5)].map((_, i) => <span key={i} className={`text-2xl text-secondary animate-scale-in animate-delay-${i}00 inline-block transition-transform hover:scale-125`}>
                      ★
                    </span>)}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium mb-4 animate-fade-in-up">
                  "Od kada koristimo njihove usluge, naši uredi blistaju! Preporučujem."
                </blockquote>
                <cite className="text-muted-foreground animate-fade-in-up animate-delay-200">— Ivan M., Zagreb</cite>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <Card className="bg-primary text-primary-foreground hover-lift animate-fade-in-up">
              <CardContent className="pt-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
                  Spremni za besprijekornu čistoću?
                </h2>
                <p className="text-xl mb-6 text-primary-foreground/90 animate-fade-in-up animate-delay-100">
                  Kontaktirajte nas danas za besplatnu ponudu!
                </p>
                <Button asChild size="lg" variant="secondary" className="animate-fade-in-up animate-delay-200 transition-all hover:scale-110">
                  <Link to="/kontakt">Zatraži ponudu</Link>
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