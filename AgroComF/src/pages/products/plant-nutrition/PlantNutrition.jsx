import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store/useStore";
import Orb from "../../../Orb";
import ProductCard from "../../../components/cards/ProductCard";
import { getLocalizedKey } from "../../../utils/translateFormat";
import { transformImageUrl } from "../../../utils/transformImgUrl";
import { useSearchParams } from "react-router-dom";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { NPK_DATA } from "../../../components/cards/tableType"
import { useTranslation } from "react-i18next";
const ITEMS_PER_PAGE = 6;
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-next absolute top-[40%] right-[-30px] z-10 p-3 bg-teal-500 rounded-[50%] text-white cursor-pointer" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
};

const PrevArrow = (props) => {
  const { t } = useTranslation()
  const { onClick } = props;
  return (
    <div className="custom-prevabsolute absolute top-[40%] left-[-30px] z-10 p-3 bg-teal-500 rounded-[50%] text-white cursor-pointer" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
};

const categories = [
  { id: 1, name: "PlantNutrition.biostimulator" },
  { id: 2, name: "PlantNutrition.microelement" },
  { id: 3, name: "PlantNutrition.organic_fertilizer" },
  { id: 4, name: "PlantNutrition.npk_fertilizer" }
];


function PlantNutrition() {
  const { t } = useTranslation()
  const { productTwo, loading, error, fetchProductTwo } = useStore();

  const [activeTab, setActiveTab] = useState(categories[0].id);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const type = parseInt(searchParams.get("type")) || 1; // `page` ni olish

  const catalogHeaderRef = useRef(null);

  let totalPages = null
  let currentProducts = null
  let allproducts = null

  useEffect(() => {
    fetchProductTwo();
    setActiveTab(type);
  }, []);

  useEffect(()=>{
    setSearchParams({ type: activeTab });
    setCurrentPage(1);
  }, [activeTab])



  const scrollToHeader = () => {
    catalogHeaderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="w-[100%] h-[70vh] flex items-center justify-center">
        <Orb
          hoverIntensity={0.2}
          rotateOnHover={true}
          hue={2}
          forceHoverState={true}
        />
      </div>
    );
  }

  


  function FilterProduct(type){

    if(type == 4) {
      return [...NPK_DATA, ...productTwo?.filter((product) => product?.productTwoType == type)]
    }
    return productTwo?.filter((product) => product?.productTwoType == type);
  }


  // Umumiy sahifalar sonini hisoblash
  totalPages = Math.ceil(FilterProduct(activeTab)?.length / ITEMS_PER_PAGE);

  // Joriy sahifadagi mahsulotlarni olish
  currentProducts = FilterProduct(activeTab)?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  allproducts = FilterProduct(activeTab)


  if (error) {
    return <div className="text-center min-h-[80vh]">Xatolik yuz berdi: {error}</div>;
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
    autoplaySpeed: 4000,
    cssEase: "linear",
    centerMode: false,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1280,
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
    <div className="bg-slate-100">


<div className="w-full container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 bg-gray-100 p-4 text-sm 2xl:text-xl">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex items-center 3xl:text-2xl 4xl:text-3xl gap-1 md:hover:bg-green-300 transition-all ease-in p-2 text-left w-full ${
              activeTab === category.id
                ? "text-black font-bold border-l-4 border-green-500 bg-white shadow"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(category.id)}
          >
            {t(category.name)}
          </button>
        ))}
      </div>
    </div>




      <div className="container mx-auto flex items-center justify-center flex-col px-2 py-8">
        <div className="flex w-full items-center flex-col md:flex-row justify-center gap-4">
          <div className="text-center ">
            <h2 ref={catalogHeaderRef} className="text-3xl 2xl:text-4xl font-bold">{t("OurCatalog")}</h2>
            {
              currentProducts?.length ?
              <p className="text-lg text-gray-600 2xl:text-2xl">{t(categories.find((c) => c.id === activeTab)?.name)} {FilterProduct(activeTab)?.length}+ {t("TypeProducts")}</p> :
              <p className="text-lg text-gray-600 2xl:text-2xl min-h-[60vh]">{t(categories.find((c) => c.id === activeTab)?.name)} маҳсулотлар мавжуд эмас</p>
            }
          </div>
        </div>

        <div className="hidden md:block">
          {
            currentProducts?.length ? (<>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              {currentProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  id={product.id}
                  icon={null}
                  productPicture={activeTab == 4 ? product.productPicture : transformImageUrl(product.productPicture)}
                  title={getLocalizedKey(product, "title")}
                  description={getLocalizedKey(product, "description")}
                  type="productTwo"
                  productType={activeTab}
                  static_data={product?.static}
                />
              ))}
            </div>

            <div className=" w-full flex justify-center items-center gap-4 mt-10">
              <button
                className="px-4 py-2 2xl:py-[12px] 2xl:text-xl border rounded disabled:opacity-50 bg-teal-500 hover:bg-teal-900 text-white"
                onClick={() => (setCurrentPage((prev) => Math.max(prev - 1, 1)), scrollToHeader())}
                disabled={currentPage === 1}
              >
                ⬅️ {t("previous")}
              </button>

              <span className="text-lg 2xl:text-2xl font-semibold">
                {currentPage} / {totalPages}
              </span>

              <button
                className="px-4 py-2 2xl:py-[12px] 2xl:text-xl border rounded disabled:opacity-50 bg-teal-500 hover:bg-teal-900 text-white"
                onClick={() => (setCurrentPage((prev) => Math.min(prev + 1, totalPages)), scrollToHeader())}
                disabled={currentPage === totalPages}
              >
                {t("next")} ➡️
              </button>
            </div>
            </>) : ''
          }
        </div>

          <div className="md:hidden w-full h-full">
            {allproducts?.length > 1 ? 
              <Slider {...settings}>
                {allproducts?.map((product, index) => (
                  <div className="px-2 my-2 h-full flex" key={index}>
                    <ProductCard
                      key={index}
                      id={product.id}
                      icon={null}
                      productPicture={activeTab == 4 ? product.productPicture : transformImageUrl(product.productPicture)}
                      title={getLocalizedKey(product, "title")}
                      description={getLocalizedKey(product, "description")}
                      type="productTwo"
                      productType={activeTab}
                      static_data={product?.static}
                    />
                  </div>
                ))}
              </Slider> :
              currentProducts?.map((product, index) => (
                <div className="px-2 my-2 h-full flex" key={index}>
                  <ProductCard
                    key={index}
                    id={product.id}
                    icon={null}
                    productPicture={activeTab == 4 ? product.productPicture : transformImageUrl(product.productPicture)}
                    title={getLocalizedKey(product, "title")}
                    description={getLocalizedKey(product, "description")}
                    type="productTwo"
                    productType={activeTab}
                    static_data={product?.static}
                  />
                </div>
              ))
            }
          </div>
      </div>
    </div>
  );
}

export default PlantNutrition;