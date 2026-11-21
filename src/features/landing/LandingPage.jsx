import Header from "./sections/Header";
import Topbar from "./sections/Topbar";
import BackToTop from "./sections/BackToTop";
import SkipLink from "../../components/ui/SkipLink";
import HeroSlider from "./sections/HeroSlider";
import Services from "./sections/Services";
import Story from "./sections/Story";
import SpecialDish from "./sections/SpecialDish";
import NutriScoreGrid from "./sections/NutriScoreGrid";
import Testimonial from "./sections/Testimonial";
import Donation from "./sections/Donation";
import WhyChooseUs from "./sections/WhyChooseUs";
import Updates from "./sections/Updates";
import Footer from "./sections/Footer";
import { useScrollState } from "./hooks/useScrollState";

export default function LandingPage() {
  const { scrolled, hidden } = useScrollState();

  return (
    <div className="min-h-screen overflow-x-clip bg-eerie-1 font-sans text-body-2 leading-[1.85] text-white">
      <SkipLink />
      <Topbar hidden={scrolled} />
      <Header scrolled={scrolled} hidden={hidden} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSlider />
        <Services />
        <Story />
        <SpecialDish />
        <NutriScoreGrid />
        <Testimonial />
        <Donation />
        <WhyChooseUs />
        <Updates />
      </main>

      <Footer />
      <BackToTop visible={scrolled} />
    </div>
  );
}
