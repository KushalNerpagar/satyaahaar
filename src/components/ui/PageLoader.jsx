import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid min-h-screen place-items-center bg-eerie-1 text-quick-silver"
    >
      <Loader2 size={32} className="animate-spin text-gold" aria-hidden="true" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}
