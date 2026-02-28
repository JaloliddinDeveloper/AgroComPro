import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";
import { t } from "i18next";


function ProductCard({ icon, productPicture, title, description, type, id, productType, static_data }) {
  const navigate = useNavigate();
  const { setSelectedProduct } = useStore();

  const handleDetailsClick = () => {
    setSelectedProduct(id, type);
    // navigate(`/details/${type}/${id}`);

    if(type == 'productOne') {
      navigate(`/products/plant-protection/view/${id}`)
    } else {
      if(productType == 4) {
        if(static_data){
        navigate(`/products/plant-nutrition/npk/${id}`)
        } else {
          navigate(`/products/plant-nutrition/view/${id}`)
        }
      } else {
      navigate(`/products/plant-nutrition/view/${id}`)
      }
    }

  };

  const [showFullText, setShowFullText] = useState(false);
  const maxLength = 60;
  const isTextLong = description?.length > maxLength;
  const displayText = showFullText
    ? description
    : description.slice(0, maxLength) + (isTextLong ? "..." : "");

  return (
    <div className="bg-white rounded-lg transform transition duration-300 hover:scale-105 shadow-lg hover:shadow-2xl p-4 w-full sm:w-60 md:w-72 lg:w-80 2xl:w-[400px] space-y-2 flex flex-col justify-between">
      <div className="flex justify-center items-center mb-4">
        {icon && <img
          src={icon}
          alt={title}
          className="w-[50px] absolute top-1 right-2 object-contain bg-white"
          // onError={(e) => (e.target.src = "/default-image.jpg")}
        />}
        <img
          src={productPicture}
          alt={title}
          className="w-[250px] h-[250px] 3xl:h-[350px] object-contain bg-white"
          // onError={(e) => (e.target.src = "/default-image.jpg")}
        />
      </div>
      <div>
        <h3 className="text-xl 2xl:text-2xl font-semibold text-start mb-2">{title}</h3>
        <p className="text-gray-700 text-start text-sm 2xl:text-lg font-medium">
          {displayText}
        </p>
      </div>

      <button
        onClick={handleDetailsClick}
        className="relative overflow-hidden w-full bg-teal-500 font-medium text-white py-[6px] 2xl:py-[12px] 2xl:text-xl rounded-lg group"
      >
        <span className="absolute left-0 top-0 h-full w-0 bg-teal-800 transition-all duration-500 group-hover:w-full"></span>
        <span className="relative z-10">{t("MoreDetail")}</span>
      </button>

    </div>
  );
}

export default ProductCard