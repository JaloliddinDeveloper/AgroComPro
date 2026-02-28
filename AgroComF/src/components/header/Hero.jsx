import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Slick uchun CSS
import "slick-carousel/slick/slick-theme.css"; // Slick mavzusi uchun CSS
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRef } from "react";
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-next absolute top-[40%] right-[2%] z-10 py-[2vh] px-[4.3vh] text-white rounded-full hover:bg-black/50 items-center justify-center transition-colors ease-in cursor-pointer" onClick={onClick}>
      <p className="text-[5vh]">❯</p>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-prevabsolute absolute top-[40%] left-[2%] z-10 py-[2vh] px-[4.3vh] text-white rounded-full hover:bg-black/50 flex items-center justify-center transition-colors ease-in cursor-pointer" onClick={onClick}>
      <p className="text-[5vh]">❮</p>
    </div>
  );
};
const Hero = () => {
  const sliderRef = useRef(null);
  const settings = {
    dots: true, // Pastki nuqtalarni ko'rsatadi
    infinite: true, // Cheksiz aylanish
    speed: 1500, // Animatsiya tezligi (ms)
    slidesToShow: 1, // Har safar bitta slayd
    slidesToScroll: 1, // Har safar bitta slaydni aylantirish
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div onClick={() => sliderRef.current.slickNext()} // Mouse bosilganda keyingi slaydga o'tadi
    className="w-full overflow-hidden relative">
      <Slider ref={sliderRef} {...settings}>
        <div>
          <img
            src="/slider/8.jpg"
            alt="Crop Inspection"
            className="w-full h-[80vh] object-cover object-top"
          />
        </div>
        <div>
          <img
            src="/slider/6.jpg"
            alt="Farm Fields"
            className="w-full h-[80vh] object-cover object-center"
          />
        </div>
        <div>
          <img
            src="/slider/12.jpg"
            alt="Crop Inspection"
            className="w-full h-[80vh] object-cover"
          />
        </div>
        <div>
          <img
            src="/slider/7.jpg"
            alt="Agricultural Management"
            className="w-full h-[80vh] object-cover object-center"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Hero;
