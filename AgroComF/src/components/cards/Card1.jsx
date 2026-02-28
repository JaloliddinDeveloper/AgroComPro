import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { transformImageUrl } from "../../utils/transformImgUrl";
import { table, tableRu, tableType } from "./tableType";
import { useTranslation } from "react-i18next";
import { getLocalizedKey } from "../../utils/translateFormat";
const AgroNurellCard = ({data}) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const glassRef = useRef(null);
  const zoom = 3;

  useEffect(() => {
    const magnify = () => {
      const img = imgRef.current;
      const glass = glassRef.current;
      if (!img || !glass) return;

      glass.style.backgroundImage = `url('${img.src}')`;
      glass.style.backgroundRepeat = "no-repeat";
      glass.style.backgroundSize = `${img.width * zoom}px ${
        img.height * zoom
      }px`;

      const bw = 3;
      const w = glass.offsetWidth / 2;
      const h = glass.offsetHeight / 2;

      const moveMagnifier = (e) => {
        e.preventDefault();
        const pos = getCursorPos(e);
        let x = pos.x;
        let y = pos.y;

        if (x > img.width - w / zoom) x = img.width - w / zoom;
        if (x < w / zoom) x = w / zoom;
        if (y > img.height - h / zoom) y = img.height - h / zoom;
        if (y < h / zoom) y = h / zoom;

        glass.style.left = `${x - w + 100}px`;
        glass.style.top = `${y - h + 100}px`;
        glass.style.backgroundPosition = `-${x * zoom - w + bw}px -${
          y * zoom - h + bw
        }px`;
      };

      const getCursorPos = (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.pageX - rect.left - window.pageXOffset;
        const y = e.pageY - rect.top - window.pageYOffset;
        return { x, y };
      };

      img.addEventListener("mousemove", moveMagnifier);
      glass.addEventListener("mousemove", moveMagnifier);

      img.addEventListener("touchmove", moveMagnifier);
      glass.addEventListener("touchmove", moveMagnifier);
    };

    magnify();
  }, []);
  return (
    data && <div className="bg-gray-100 p-0 min-h-screen flex items-center justify-center relative rounded-lg">
      <button
        onClick={() => navigate(-1)}
        className="bg-teal-500 font-medium text-white py-2 px-5 rounded-lg hover:bg-teal-600 absolute left-0 top-0 text-lg 2xl:text-2xl"
      ><span className="mr-1">←</span>{t("back")}</button>
      <div className="mt-16 w-full md:w-[90%]  bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-300">
        <div className="flex flex-col items-center md:flex-row">
        <div
          ref={glassRef}
          className="absolute w-[180px] h-[180px] bg-white rounded-full border-2 shadow-lg cursor-none"
          style={{ visibility: "hidden" }}>
        </div>
          <img
            ref={imgRef}
            src={transformImageUrl(data?.productOne?.productPicture)} // vaqtincha
            alt="Agro-Nurell 55% эм.к."
            className="w-96 h-96 object-contain p-2 transition-transform duration-300 cursor-pointer"
            onMouseEnter={() => {
              const glass = glassRef.current;
              if (glass) glass.style.visibility = "visible";
            }}
            onMouseLeave={() => {
              const glass = glassRef.current;
              if (glass) glass.style.visibility = "hidden";
            }}
          />
          <div className="px-1 md:px-4 py-4">
            <h1 className="text-2xl 2xl:text-4xl font-bold text-green-700">{getLocalizedKey(data?.productOne, "title")}</h1>
            <p className="text-sm 2xl:text-lg text-gray-600 mt-1">{ data?.productOne?.productOneName }</p>
            <p className="text-lg 2xl:text-xl text-gray-700 mt-2">{ getLocalizedKey(data?.productOne, "description") }</p>
          </div>
        </div>

        <div className="px-1 md:px-4 pb-4">
          <div className="flex gap-2 md:gap-10 flex-col items-start md:flex-row md:items-center text-lg 2xl:text-xl">
            <div className="mt-2">
              <h2 className="font-semibold text-gray-800 ">{t("PlantProtection.View.active_ingredient")}:</h2>
              <p className="text-gray-700">{ getLocalizedKey(data?.productOne, "tasirModda") }</p>
            </div>

            <div className="mt-2">
              <h2 className="font-semibold text-gray-800">{t("PlantProtection.View.chemical_class")}:</h2>
              <p className="text-gray-700">{getLocalizedKey(data?.productOne, "kimyoviySinfi")}</p>
            </div>

            <div className="mt-2">
              <h2 className="font-semibold text-gray-800">{t("PlantProtection.View.formulation")}:</h2>
              <p className="text-gray-700">{ getLocalizedKey(data?.productOne, "preparatShakli") }</p>
            </div>
            <div className="mt-2">
              <h2 className="font-semibold text-gray-800">{t("PlantProtection.View.packaging")}:</h2>
              <p className="text-gray-700">{ getLocalizedKey(data?.productOne, "qadogi") }</p>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg 2xl:text-xl font-semibold text-green-700">
              {t("PlantProtection.View.application_rates_and_usage")}:
            </h2>
            <div className="w-full overflow-x-auto md:overflow-visible">
              <table className="w-full mt-2 text-xs sm:text-sm 2xl:text-lg text-left text-gray-700 border border-gray-300 table p-0">
                <thead className="bg-green-100">
                  <tr className="text-center">
                    { i18n.language == 'uz' ? table[data?.productOne.jadvalType - 1] : tableRu[data?.productOne.jadvalType - 1]}
                  </tr>
                </thead>
                <tbody>
                  { 
                    (data?.productOne?.jadvalType != 3 && data?.productOne?.jadvalType != 14 && data?.productOne?.jadvalType != 15 && data?.productOne?.jadvalType != 16 && data?.productOne?.jadvalType != 20) ?
                    data?.tableOnes?.map((data, index) => (
                      <tr className="text-center" key={index}>
                        <td className="p-1 sm:p-2 border">{getLocalizedKey(data, "ekinTuri")}</td>
                        <td className="p-1 sm:p-2 border">{getLocalizedKey(data, "begonaQarshi")}</td>
                        <td className="p-1 sm:p-2 border">{getLocalizedKey(data, "sarfMeyori")}</td>
                        <td className="p-1 sm:p-2 border">{getLocalizedKey(data, "birgaSarf")}</td>
                        <td className="p-1 sm:p-2 border">{data?.onlsum}</td>
                      </tr>
                    )) : 
                    data?.tableOnes?.map((data, index) => (
                      <tr className="text-center" key={index}>
                        <td className="p-1 sm:p-2 border">{getLocalizedKey(data, "ekinTuri")}</td>
                        <td className="p-1 sm:p-2 border">{getLocalizedKey(data, "begonaQarshi")}</td>
                        <td className="p-1 sm:p-2 border">{getLocalizedKey(data, "sarfMeyori")}</td>
                        <td className="p-1 sm:p-2 border">{getLocalizedKey(data, "birgaSarf")}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgroNurellCard;