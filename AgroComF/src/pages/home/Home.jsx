import Hero from "../../components/header/Hero";
import About from "../about/About";
import OurProducts from "../../components/ourProducts/OurProducts";
import AboutHome from "../../components/pages/products/AboutHome";

const Home = () => {
  const latitude = 41.334992;
  const longitude = 69.325074;

  const mapSrc = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;
  return (
    <div className="">
      <Hero />
      <AboutHome />
      <OurProducts />
      {/* <About /> */}
      <div className="container mx-auto">
        <div className="relative w-[90%] mx-auto my-6 h-96 3xl:h-[600px]">
          <iframe
            src={mapSrc}
            title="Google Map"
            aria-label="Map"
            aria-roledescription="map"
            role="region"
            className="absolute inset-0 w-full h-full border-none"
            allowFullScreen></iframe>
          </div>
      </div>
    </div>
  );
};

export default Home;
