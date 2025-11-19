import { CheckCircle2, Award, Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const About = () => {
  const storySection = useScrollReveal();
  const valuesSection = useScrollReveal();
  const commitmentsSection = useScrollReveal();
  const certificationsSection = useScrollReveal();
  const ctaSection = useScrollReveal();
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
        <section className="py-16 sm:py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">O nama</h1>
              <p className="text-lg sm:text-xl text-muted-foreground px-4">
                Saznajte više o našem obrtu i našoj misiji pružanja vrhunske usluge čišćenja
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section 
          ref={storySection.ref}
          className={`pt-8 pb-16 sm:pb-20 scroll-reveal ${storySection.isVisible ? 'revealed' : ''}`}
        >
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Naša priča</h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-4">
                  Obrt je osnovan s misijom pružanja vrhunske usluge čišćenja i održavanja 
                  u Zagrebu i okolici. Kroz transparentan odnos izgradili smo reputaciju pouzdanog partnera za 
                  brojne poslovne i stambene objekte.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground mb-4">
                  Naš obrt čine iskusni radnici koji dijele zajedničku strast prema izvrsnosti u 
                  radu. Vjerujemo da čist prostor doprinosi boljem radnom ozračju, većoj produktivnosti 
                  i općem zadovoljstvu korisnika prostora.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Konstantno ulažemo u edukaciju naših djelatnika i kvalitetnu opremu kako bismo pratili 
                  svjetske trendove u industriji čišćenja i našim klijentima pružili najbolju moguću 
                  uslugu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section 
          ref={valuesSection.ref}
          className={`py-16 sm:py-20 bg-muted/50 scroll-reveal ${valuesSection.isVisible ? 'revealed' : ''}`}
        >
          <div className="container px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12">Zašto odabrati nas?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="hover-lift transition-all" style={{ boxShadow: 'var(--shadow-card)' }}>
                    <CardContent className="p-6 sm:p-8">
                      <Icon className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-xl sm:text-2xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-base sm:text-lg text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section 
          ref={commitmentsSection.ref}
          className={`py-16 sm:py-20 scroll-reveal-left ${commitmentsSection.isVisible ? 'revealed' : ''}`}
        >
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12">Naša obećanja klijentima</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {commitments.map((commitment, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 sm:p-6 rounded-lg bg-muted/30 hover-lift transition-all">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-base sm:text-lg">{commitment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section 
          ref={certificationsSection.ref}
          className={`py-16 sm:py-20 bg-muted/50 scroll-reveal ${certificationsSection.isVisible ? 'revealed' : ''}`}
        >
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Certifikati i standardi</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 px-4">
                Naš obrt posluje u skladu sa svim relevantnim propisima i standardima industrije čišćenja. 
                Posjedujemo sve potrebne dozvole za profesionalno obavljanje djelatnosti.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={ctaSection.ref}
          className={`py-16 sm:py-20 scroll-reveal ${ctaSection.isVisible ? 'revealed' : ''}`}
        >
          <div className="container px-4 sm:px-6">
            <Card className="bg-primary text-primary-foreground max-w-3xl mx-auto">
              <CardContent className="pt-8 pb-8 px-6 sm:px-8 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  Želite surađivati s nama?
                </h2>
                <p className="text-lg sm:text-xl mb-6 text-primary-foreground/90 px-4">
                  Slobodno nas kontaktirajte za besplatnu ponudu ili dodatne informacije
                </p>
                <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto min-h-[48px] text-base">
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
