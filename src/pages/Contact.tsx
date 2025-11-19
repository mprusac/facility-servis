import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  serviceType?: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const formSection = useScrollReveal();
  const contactInfoSection = useScrollReveal();

  useEffect(() => {
    if (window.location.hash === '#kontakt-forma') {
      setTimeout(() => {
        const element = document.getElementById('kontakt-forma');
        if (element) {
          const offset = 80; // space from top
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  const validateForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};
    
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const phone = (formData.get('phone') as string)?.trim();
    const address = (formData.get('address') as string)?.trim();
    const serviceType = formData.get('serviceType') as string;

    if (!name || name.length < 2) {
      errors.name = "Ime i prezime mora sadržavati najmanje 2 znaka";
    }

    if (!email) {
      errors.email = "Email je obavezan";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Unesite valjanu email adresu";
    }

    if (!phone) {
      errors.phone = "Telefon je obavezan";
    } else if (!/^[\d\s\+\-\(\)]+$/.test(phone) || phone.length < 6) {
      errors.phone = "Unesite valjan broj telefona";
    }

    if (!address || address.length < 5) {
      errors.address = "Adresa mora sadržavati najmanje 5 znakova";
    }

    if (!serviceType) {
      errors.serviceType = "Odaberite vrstu prostora";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({
        title: "Greška u formi",
        description: "Molimo ispravite označena polja.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      address: formData.get('address') as string,
      serviceType: formData.get('serviceType') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: data,
      });

      if (error) throw error;

      toast({
        title: "Hvala na upitu!",
        description: "Javit ćemo Vam se u najkraćem roku.",
      });
      (e.target as HTMLFormElement).reset();
      setErrors({});
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Greška",
        description: "Došlo je do greške. Molimo pokušajte ponovo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      content: "facility-servis@outlook.com",
      link: "mailto:facility-servis@outlook.com",
    },
    {
      icon: MapPin,
      title: "Adresa",
      content: "Zagreb, Hrvatska",
    },
    {
      icon: Clock,
      title: "Radno vrijeme",
      content: "Pon-Pet: 00-24h (Non-stop)",
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
              <p className="text-xl text-muted-foreground mb-4">
                Slobodno nas kontaktirajte za besplatnu ponudu ili dodatne informacije.
              </p>
              <p className="text-xl text-muted-foreground">
                Rado ćemo odgovoriti na sva vaša pitanja.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="pt-8 pb-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card 
                id="kontakt-forma" 
                ref={formSection.ref}
                className={`h-fit scroll-reveal-left ${formSection.isVisible ? 'revealed' : ''}`}
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
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
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="Vaše ime i prezime"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="vas@email.com"
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          placeholder="091 234 5678"
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Naziv tvrtke (opcionalno)</Label>
                      <Input id="company" name="company" placeholder="Naziv vaše tvrtke" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresa lokacije *</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        placeholder="Adresa objekta za čišćenje"
                        className={errors.address ? "border-destructive" : ""}
                      />
                      {errors.address && (
                        <p className="text-sm text-destructive">{errors.address}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Vrsta prostora *</Label>
                      <Select name="serviceType">
                        <SelectTrigger className={errors.serviceType ? "border-destructive" : ""}>
                          <SelectValue placeholder="Odaberite vrstu usluge" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="obiteljska">Obiteljska kuća/okućnica</SelectItem>
                          <SelectItem value="skladisni">Skladišni prostor</SelectItem>
                          <SelectItem value="poslovni">Poslovni prostor</SelectItem>
                          <SelectItem value="sportski">Sportski i korporativni objekt</SelectItem>
                          <SelectItem value="ugostiteljski">Ugostiteljski objekt</SelectItem>
                          <SelectItem value="stambeni">Stambena zgrada</SelectItem>
                          <SelectItem value="ostalo">Ostalo</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.serviceType && (
                        <p className="text-sm text-destructive">{errors.serviceType}</p>
                      )}
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
              <div 
                ref={contactInfoSection.ref}
                className={`space-y-6 scroll-reveal ${contactInfoSection.isVisible ? 'revealed' : ''}`}
              >
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
