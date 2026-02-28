import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Products from "../pages/products/Products";
import useStore from "../../store/useStore";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { transformImageUrl } from "../../utils/transformImgUrl";
import { useTranslation } from "react-i18next";
import { getLocalizedKey } from "../../utils/translateFormat";

// ProductCard komponenti
const ProductCard = ({ img, title, desc, id }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col items-center p-4 space-y-4 h-full">
      <div className="relative">
        <img
          src={img}
          alt="Product Image"
          className="w-full h-48 3xl:h-96 object-cover rounded-lg"
        />
      </div>

      <div className="flex-grow flex flex-col justify-between w-full">
        <h3 className="text-xl xl:text-2xl 3xl:text-3xl font-semibold text-gray-800 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 text-sm xl:text-xl 3xl:text-2xl mt-2 line-clamp-2">
          {desc}
        </p>
      </div>

      <div className="flex justify-between w-full mt-auto text-lg xl:text-xl 3xl:text-2xl">
        <NavLink
          to={`/products/plant-protection/view/${id}`}
          className="text-green-500 hover:text-green-800 transition-all ease-in cursor-pointer"
        >
          {t("MoreDetail")}
        </NavLink>
        <span className="text-green-500">&#9733;</span>
      </div>
    </div>
  );
};


const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-next absolute top-[40%] right-[-40px] z-10 p-3 bg-teal-500 hover:bg-teal-800 transition-all ease-in rounded-[50%] text-white cursor-pointer" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-prevabsolute absolute top-[40%] left-[-40px] z-10 p-3 bg-teal-500 hover:bg-teal-800 transition-all ease-in rounded-[50%] text-white cursor-pointer" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
};

function LazyLoad() {
  const {
    productOne,
    productTwo,
    loading,
    error,
    fetchProductOne,
    fetchProductTwo
  } = useStore();
  useEffect(() => {
    fetchProductOne();
    fetchProductTwo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>error...🤷‍♂️</div>;
  }



  const settings = {
    dots: false,
    lazyLoad: "ondemand",
    infinite: true,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    centerMode: false,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          speed: 200
        }
      }
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full h-full py-10 bg-gray-100">
      <div className="container mx-auto px-[5%]">
        <div>
          <Products />
        </div>
        <div>
        <Slider {...settings}>
          {productOne?.map((item, index) => (
            <div className="px-2 my-2 h-full flex" key={index}>
              <ProductCard title={item.titleUz} img={transformImageUrl(item.productPicture)} desc={getLocalizedKey(item, "description")} id={item.id} /> {/* vaqtincha */}
            </div>
          ))}
        </Slider>
        </div>
      </div>
    </div>
  );
}

export default LazyLoad;