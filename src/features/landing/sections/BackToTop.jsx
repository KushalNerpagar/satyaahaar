import { ChevronUp } from "lucide-react";

export default function BackToTop({ visible }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-40 grid h-[50px] w-[50px] place-items-center rounded-full bg-gold text-smoky-1 shadow-soft transition-all duration-300 hover:bg-white hover:text-gold ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <ChevronUp size={22} />
    </button>
  );
}
