import Header from "./sections/Header";
import Topbar from "./sections/Topbar";
import BackToTop from "./sections/BackToTop";
import { useScrollState } from "./hooks/useScrollState";

export default function LandingPage() {
  const { scrolled, hidden } = useScrollState();

  return (
    <div className="min-h-screen bg-eerie-1 font-sans text-body-2 leading-[1.85] text-white">
      <Topbar hidden={scrolled} />
      <Header scrolled={scrolled} hidden={hidden} />
      <main />
      <BackToTop visible={scrolled} />
    </div>
  );
}
