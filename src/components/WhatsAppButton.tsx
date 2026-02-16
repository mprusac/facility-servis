import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/385989511572"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl animate-fade-in"
      aria-label="Kontaktirajte nas putem WhatsAppa"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppButton;
