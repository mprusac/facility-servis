import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/385989511572"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center group animate-fade-in"
      aria-label="Kontaktirajte nas putem WhatsAppa"
    >
      {/* Label */}
      <span className="mr-3 bg-[#25D366] text-white font-semibold px-4 py-2 rounded-full shadow-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none">
        WhatsApp
      </span>
      {/* Icon */}
      <div className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
        <MessageCircle className="h-7 w-7" />
      </div>
    </a>
  );
};

export default WhatsAppButton;
