import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Hvala na upitu!",
        description: "Javit ćemo Vam se u najkraćem roku.",
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      content: "091 946 6599",
      link: "tel:+385919466599",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@cistozagreb.hr",
      link: "mailto:info@cistozagreb.hr",
    },
    {
      icon: MapPin,
      title: "Adresa",
      content: "Zagreb, Hrvatska",
    },
    {
      icon: Clock,
      title: "Radno vrijeme",
      content: "Pon-Pet: 08:00 - 18:00\nSub: 09:00 - 14:00",
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Kontaktirajte nas</h1>
              <p className="text-xl text-muted-foreground">
                Slobodno nas kontaktirajte za besplatnu ponudu ili dodatne informacije. 
                Rado ćemo odgovoriti na sva vaša pitanja.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="h-fit" style={{ boxShadow: 'var(--shadow-card)' }}>
                <CardHeader>
                  <CardTitle>Zatraži ponudu</CardTitle>
                  <CardDescription>
                    Popunite obrazac i javit ćemo vam se u najkraćem roku
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ime i prezime *</Label>
                      <Input id="name" name="name" required placeholder="Vaše ime i prezime" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" name="email" type="email" required placeholder="vas@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input id="phone" name="phone" type="tel" required placeholder="091 234 5678" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Naziv tvrtke (opcionalno)</Label>
                      <Input id="company" name="company" placeholder="Naziv vaše tvrtke" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresa lokacije *</Label>
                      <Input id="address" name="address" required placeholder="Adresa objekta za čišćenje" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">Vrsta usluge *</Label>
                      <Select name="service" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Odaberite vrstu usluge" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="poslovni">Poslovni prostori</SelectItem>
                          <SelectItem value="sportski">Sportski i korporativni objekti</SelectItem>
                          <SelectItem value="ugostiteljski">Ugostiteljski objekti</SelectItem>
                          <SelectItem value="stambeni">Stambene zgrade</SelectItem>
                          <SelectItem value="ostalo">Ostalo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Željeni datum i vrijeme</Label>
                      <Input id="date" name="date" placeholder="npr. 15.03.2025. u 14:00" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Poruka</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        placeholder="Opišite vaše potrebe za čišćenjem..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Šaljem..." : "Pošalji upit"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Kontakt podaci</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Možete nas kontaktirati telefonom, emailom ili ispunjavanjem obrasca. 
                    Odgovaramo brzo i rado odgovaramo na sva pitanja.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium mb-1">{item.title}</p>
                              {item.link ? (
                                <a 
                                  href={item.link}
                                  className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {item.content}
                                </a>
                              ) : (
                                <p className="text-muted-foreground whitespace-pre-line">
                                  {item.content}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Additional Info */}
                <Card className="bg-secondary/10 border-secondary/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Besplatna procjena</h3>
                    <p className="text-muted-foreground">
                      Nudimo besplatnu procjenu prostora i prilagođenu ponudu prema vašim potrebama. 
                      Kontaktirajte nas kako bismo dogovorili termin za pregled lokacije.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
