/**
 * Keyboard-only shortcut to the page's main content.
 * Uses a button because hash links would conflict with HashRouter routing.
 */
export default function SkipLink() {
  const focusMain = () => {
    const main = document.getElementById("main-content");
    if (!main) return;
    main.focus({ preventScroll: false });
    main.scrollIntoView({ block: "start" });
  };

  return (
    <button
      type="button"
      onClick={focusMain}
      className="fixed left-4 top-4 z-[100] -translate-y-24 bg-gold px-5 py-3 text-label-2 font-bold uppercase tracking-[0.2em] text-black transition-transform focus:translate-y-0"
    >
      Skip to content
    </button>
  );
}
