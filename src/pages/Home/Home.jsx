import Hero from "./Hero";
import AboutIntro from "../../components/AboutIntro/AboutIntro";
import KeyMetrics from "../../components/KeyMetrics/KeyMetrics";
import CategoryShowcase from "../../components/CategoryShowcase/CategoryShowcase";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import FeaturedProduct from "../../components/FeaturedProduct/FeaturedProduct";
import WorkProcess from "../../components/WorkProcess/WorkProcess";
import Testimonials from "../../components/Testimonials/Testimonials";
import Partners from "../../components/Partners/Partners";

const Home = () => {
  return (
    <main className="w-full overflow-x-hidden bg-[#ffffff]">
      <Hero />
      <AboutIntro />
      <KeyMetrics />
      <CategoryShowcase />
      <NewArrivals />
      <FeaturedProduct />
      <WorkProcess />
      <Testimonials />
      <Partners />
    </main>
  );
};

export default Home;