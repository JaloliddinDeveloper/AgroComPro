import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import kalsiyCom from "../../../assets/img/kalsiyCom.jpg";
import agroVertimaks from "../../../assets/img/Agro-Vertimeks.png";

const ProductCard = ({ src, title, catalogLink, imgScale, bgColor = "bg-white", textColor = "text-green-600" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col md:flex-row items-center ${bgColor} shadow-lg rounded-lg p-4`}> 
      <div onClick={() => setIsOpen(true)} className="relative md:w-1/2 w-[200px] h-[200px] md:h-full cursor-pointer group">
        <img src={src} alt={title} className="w-full h-full object-contain bg-white rounded-lg shadow-md transition-transform duration-300" />
        <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-center text-lg 2xl:text-2xl 3xl:text-3xl">{t("ClickToView")}</p>
        </div>
      </div>

      <div className="p-4 text-start flex flex-col justify-between w-full md:w-1/2">
        <h3 className={`text-xl xl:text-3xl font-semibold mb-2 ${textColor}`}>{title}</h3>
        <NavLink className="relative w-[100%] sm:w-[80%] md:w-[100%] 2xl:w-[80%] overflow-hidden xs:text-sm md:text-lg 2xl:text-xl 4xl:text-2xl px-5 py-2 3xl:px-10 3xl:py-4 bg-teal-600 text-white rounded-full my-3 group" to={catalogLink}>
          <span className="absolute left-0 top-0 h-full w-0 bg-teal-800 transition-all duration-700 group-hover:w-full"></span>
          <span className="relative z-10">{t("NextCatalog")}</span>
        </NavLink>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.img 
              src={src} 
              className="p-10 md:h-[80%] max-w-[90%] max-h-[90%] object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: imgScale }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Products = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-100 py-10">
      <h2 className="text-center text-3xl xl:text-5xl font-bold mb-10 text-green-500">
        {t("Navbar.Menu.Products")}
      </h2>
      <div className="flex flex-col md:flex-row gap-6 mx-auto container px-4">
        <ProductCard src={agroVertimaks} title={t("Menu.PlantProtection")} catalogLink="/products/plant-protection" imgScale={1.6} />
        <ProductCard src={kalsiyCom} title={t("Menu.PlantNutrition")} catalogLink="/products/plant-nutrition" bgColor="bg-green-600" textColor="text-white" imgScale={1.2} />
      </div>
    </div>
  );
};

export default Products;