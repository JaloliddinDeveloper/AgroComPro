import React, { useEffect, useState } from "react";
import useStore from "../../store/useStore.js";
import dayjs from "dayjs";
import Orb from "../../Orb.jsx";
import { useTranslation } from "react-i18next";
import { getLocalizedKey } from "../../utils/translateFormat";
import { transformImageUrl } from "../../utils/transformImgUrl.js";
import { motion, AnimatePresence } from "framer-motion";
const News = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const { newsS, loading, error, fetchNewsS } = useStore();

  useEffect(() => {
    fetchNewsS();
  }, [fetchNewsS]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Orb hoverIntensity={0.2} rotateOnHover={true} hue={2} forceHoverState={true} />
      </div>
    );
  }
  if (error) {
    return <p className="text-center min-h-screen text-red-500">Xatolik: {error}</p>;
  }

  return (
    <section className="min-h-[70vh] px-4 py-6 container lg:max-w-7xl mx-auto">
      <h1 className="text-slate-700 text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl  font-semibold text-center mb-10">
        {t("News.Title")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsS.map((news) => (
          <div
            key={news.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl flex flex-col justify-between">
            <img src={transformImageUrl(news.newPicture)} alt="" className="w-full h-48 object-contain" />
            <div className="p-4 space-y-2">
              <h3 className="text-xl 2xl:text-2xl font-semibold text-start mb-2">{getLocalizedKey(news, "title")}</h3>
              <p className="text-gray-700 ttext-sm 2xl:text-lg font-medium">
                {getLocalizedKey(news, "describtion")?.length > 60
                  ? getLocalizedKey(news, "describtion").slice(0, 60) + "..."
                  : getLocalizedKey(news, "describtion")}
              </p>
              <p className="text-green-500 text-sm 2xl:text-lg font-medium">{dayjs(news.date).format("DD.MM.YYYY")}</p>
              <button
                onClick={() => {
                  setSelectedNews(news);
                  setIsOpen(true);
                }}
                className="relative overflow-hidden w-full bg-teal-500 font-medium text-white py-[6px] 2xl:py-[12px] 2xl:text-xl rounded-lg group"
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-teal-800 transition-all duration-500 group-hover:w-full"></span>
                <span className="relative z-10">{t("MoreDetail")}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // onClick={() => setIsOpen(false)}
              >
                <motion.div className="relative bg-white rounded-lg shadow-lg w-[90%] md:w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  {/* Modal header */}
                  <div className="sticky top-0 bg-white p-4 md:p-5 border-b border-gray-200 rounded-t flex items-center justify-between z-10">
                    <h2 className="text-xl 2xl:text-2xl font-semibold">{getLocalizedKey(selectedNews, "title")}</h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                    </button>
                  </div>
                  {/* Modal body */}
                  <div className="p-4 md:p-5">
                    <img src={transformImageUrl(selectedNews.newPicture)} alt="" className="w-full rounded-md mb-4" />
                    <p className="text-gray-700 ttext-sm 2xl:text-lg font-medium">{getLocalizedKey(selectedNews, "describtion")}</p>
                    <p className="text-green-500 text-sm 2xl:text-lg font-medium mt-2">{dayjs(selectedNews.date).format("DD.MM.YYYY")}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
    </section>
  );
};

export default News;
