import { Building2, Dumbbell, UtensilsCrossed, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "Održavanje poslovnih prostora",
      description: "Profesionalno čišćenje ureda, trgovina i drugih poslovnih prostora prilagođeno vašem rasporedu.",
      features: [
        "Redovno čišćenje ureda i kancelarija",
        "Održavanje podova i tepiha",
        "Čišćenje sanitarnih prostorija",
        "Prašenje i održavanje radnih površina",
        "Pražnjenje kanti za smeće",
        "Rad izvan radnog vremena po dogovoru",
      ],
    },
    {
      icon: Dumbbell,
      title: "Održavanje sportskih i korporativnih objekata",
      description: "Specijalizirane usluge za velike prostore, sportske dvorane i korporativne zgrade.",
      features: [
        "Čišćenje velikih hala i prostora",
        "Održavanje sportskih podova",
        "Čišćenje svlačionica i zajedničkih prostora",
        "Održavanje konferencijskih dvorana",
        "Čišćenje hodnika i zajedničkih zona",
        "Poliranje i održavanje specijalnih površina",
      ],
    },
    {
      icon: UtensilsCrossed,
      title: "Čišćenje ugostiteljskih objekata",
      description: "Održavanje visoke razine higijene u restoranima, kafićima i hotelima.",
      features: [
        "Čišćenje kuhinja po HACCP standardima",
        "Održavanje blagovaonica",
        "Sanitarija i dezinfekcija",
        "Čišćenje bara i radnih površina",
        "Održavanje terasa i vanjskih prostora",
        "Posebna pažnja na higijenske standarde",
      ],
    },
    {
      icon: HomeIcon,
      title: "Održavanje stambenih zgrada",
      description: "Redovno održavanje zajedničkih prostora u stambenim zgradama.",
      features: [
        "Tjedno čišćenje stubišta i hodnika",
        "Održavanje ulaza i zajedničkih prostora",
        "Čišćenje dizala",
        "Održavanje vanjskih pristupa",
        "Pražnjenje zajedničkih kanti",
        "Čišćenje prozora u zajedničkim prostorima",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Naše usluge</h1>
              <p className="text-xl text-muted-foreground">
                Nudimo sveobuhvatne usluge čišćenja i održavanja za različite vrste objekata. 
                Koristimo profesionalna sredstva i opremu kako bismo osigurali vrhunske rezultate.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>

            {/* Service Area */}
            <div className="mt-16 text-center">
              <div className="inline-block px-6 py-3 bg-secondary/10 rounded-lg">
                <p className="text-lg">
                  <span className="font-semibold text-secondary">Područje rada:</span>{" "}
                  Usluge pružamo na području Zagreba i okolice
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trebate ponudu za vaš prostor?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Kontaktirajte nas za besplatnu procjenu i prilagođenu ponudu
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/kontakt">Zatraži ponudu</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/galerija">Pogledaj galeriju</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
