import { MessageCircle, Phone } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 animate-fade-in">
      {/* WhatsApp */}
      <a
        href="https://wa.me/385919466599"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center group"
        aria-label="Kontaktirajte nas putem WhatsAppa"
      >
        <span className="mr-3 bg-[#25D366] text-white font-semibold px-5 py-2 rounded-md shadow-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none">
          WhatsApp
        </span>
        <div className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
          <MessageCircle className="h-7 w-7" />
        </div>
      </a>

      {/* Viber */}
      <a
        href="viber://chat?number=%2B385919466599"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center group"
        aria-label="Kontaktirajte nas putem Vibera"
      >
        <span className="mr-3 bg-[#7360F2] text-white font-semibold px-5 py-2 rounded-md shadow-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none">
          Viber
        </span>
        <div className="h-14 w-14 rounded-full bg-[#7360F2] text-white shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
          <Phone className="h-7 w-7" />
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;
