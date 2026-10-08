import { MessageCircle } from "lucide-react";

export default function FloatingSupportButton() {
  return (
    <a
      href="https://wa.me/918000000000"
      target="_blank"
      rel="noreferrer"
      aria-label="Contact SharePal WhatsApp Support"
      className="fixed right-4 bottom-20 md:bottom-8 z-50 flex h-13 w-13 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] active:scale-95 transition-transform duration-200"
    >
      <MessageCircle className="h-7 w-7 md:h-9 md:w-9 fill-current" />
    </a>
  );
}
