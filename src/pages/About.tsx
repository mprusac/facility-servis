import { CheckCircle2, Award, Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Iskustvo i stručnost",
      description: "Višegodišnje iskustvo u profesionalnom čišćenju i održavanju različitih vrsta objekata.",
    },
    {
      icon: Users,
      title: "Profesionalni tim",
      description: "Naš tim čine iskusni djelatnici koji su prošli obuku za najviše standarde čistoće",
    },
    {
      icon: Leaf,
      title: "Ekološki pristup",
      description: "Koristimo ekološki prihvatljiva sredstva za čišćenje koja su sigurna za vas i okolinu.",
    },
    {
      icon: CheckCircle2,
      title: "Garancija zadovoljstva",
      description: "Prilagođavamo se vašem rasporedu i potrebama kako bismo osigurali maksimalno zadovoljstvo.",
    },
  ];

  const commitments = [
    "Povjerljivost i diskrecija u radu",
    "Fleksibilnost u prilagođavanju rasporedu klijenata",
    "Korištenje profesionalne suvremene opreme",
    "Redovna obuka zaposlenika",
    "Brza reakcija na posebne zahtjeve",
    "Transparentne cijene bez skrivenih troškova",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">O nama</h1>
              <p className="text-xl text-muted-foreground">
                Saznajte više o našem obrtu i našoj misiji pružanja vrhunske usluge čišćenja
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="pt-8 pb-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6">Naša priča</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Obrt je osnovan 2015. godine s misijom pružanja vrhunske usluge čišćenja i održavanja 
                  u Zagrebu i okolici. Kroz godine rada izgradili smo reputaciju pouzdanog partnera za 
                  brojne poslovne i stambene objekte.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Naš tim čine iskusni profesionalci koji dijele zajedničku strast prema izvrsnosti u 
                  radu. Vjerujemo da čist prostor doprinosi boljem radnom ozračju, većoj produktivnosti 
                  i općem zadovoljstvu korisnika prostora.
                </p>
                <p className="text-lg text-muted-foreground">
                  Konstantno ulažemo u edukaciju naših djelatnika i najnoviju opremu kako bismo pratili 
                  svjetske trendove u industriji čišćenja i našim klijentima pružili najbolju moguću 
                  uslugu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Što nas čini posebnima
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="text-center" style={{ boxShadow: 'var(--shadow-card)' }}>
                    <CardContent className="pt-6">
                      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Naša obećanja klijentima</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commitments.map((commitment, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-lg">{commitment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Certifikati i standardi</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Naš obrt posluje u skladu sa svim relevantnim propisima i standardima industrije čišćenja. 
                Posjedujemo sve potrebne dozvole za profesionalno obavljanje djelatnosti.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <Card className="bg-primary text-primary-foreground max-w-3xl mx-auto">
              <CardContent className="pt-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Želite surađivati s nama?
                </h2>
                <p className="text-xl mb-6 text-primary-foreground/90">
                  Slobodno nas kontaktirajte za besplatnu ponudu ili dodatne informacije
                </p>
                <Button asChild size="lg" variant="secondary">
                  <Link to="/kontakt#kontakt-forma">Kontaktirajte nas</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
