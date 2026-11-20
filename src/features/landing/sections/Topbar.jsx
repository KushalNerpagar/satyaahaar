import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { TOPBAR_ITEMS } from "../content";

const ICONS = { location: MapPin, clock: Clock, phone: Phone, mail: Mail };

export default function Topbar({ hidden }) {
  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 hidden border-b border-white/20 py-2.5 transition-transform duration-300 sm:block ${
        hidden ? "-translate-y-full" : ""
      }`}
    >
      <div className="flex items-center justify-center gap-[30px] px-4">
        {TOPBAR_ITEMS.map((item, index) => {
          const Icon = ICONS[item.icon];
          const content = (
            <>
              <Icon size={16} strokeWidth={2.5} aria-hidden="true" />
              <span className="text-label-1">{item.text}</span>
            </>
          );
          const className = `items-center gap-1.5 transition-colors hover:text-gold ${
            item.wideOnly ? "hidden lg:flex" : "flex"
          }`;

          return (
            <span key={item.text} className="contents">
              {item.href ? (
                <a href={item.href} className={className}>
                  {content}
                </a>
              ) : (
                <span className={className}>{content}</span>
              )}
              {(index === 0 || index === 2) && (
                <span
                  aria-hidden="true"
                  className="hidden h-2 w-2 rotate-45 border border-gold xl:block"
                />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
