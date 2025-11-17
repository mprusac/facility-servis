import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const Gallery = () => {
  const gallerySection = useScrollReveal();
  const ctaSection = useScrollReveal();
  const images = [
    {
      src: gallery1,
      alt: "Uredno organiziran skladišni prostor nakon čišćenja",
      caption: "Profesionalno čišćenje i organizacija skladišnih prostora",
    },
    {
      src: gallery2,
      alt: "Čisto stepenište stambene zgrade",
      caption: "Redovno održavanje stambenih zgrada",
    },
    {
      src: gallery3,
      alt: "Uređena okućnica obiteljske kuće",
      caption: "Održavanje okućnica i vrtova",
    },
    {
      src: gallery4,
      alt: "Čist restoran nakon čišćenja",
      caption: "Čišćenje ugostiteljskih objekata po visokim standardima",
    },
    {
      src: gallery5,
      alt: "Zajednički prostor stambene zgrade",
      caption: "Redovno održavanje stambenih zgrada",
    },
    {
      src: gallery6,
      alt: "Profesionalno čišćenje hodnika u poslovnoj zgradi",
      caption: "Redovno održavanje poslovnih prostora",
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Galerija radova</h1>
              <p className="text-xl text-muted-foreground">
                Pogledajte primjere našeg rada i uvjerite se u kvalitetu naših usluga čišćenja
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section 
          ref={gallerySection.ref}
          className={`pt-8 pb-20 scroll-reveal ${gallerySection.isVisible ? 'revealed' : ''}`}
        >
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg transition-all hover:shadow-[var(--shadow-hover)] hover:-translate-y-1"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white font-medium">{image.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Images Placeholder */}
        <section 
          ref={ctaSection.ref}
          className={`py-20 bg-muted/50 scroll-reveal ${ctaSection.isVisible ? 'revealed' : ''}`}
        >
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Želite vidjeti naš rad uživo?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Kontaktirajte nas za besplatnu procjenu i uvjerite se u našu stručnost
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
