

import React, { useEffect } from 'react';
import useStore from '../../store/useStore';
import Orb from '../../Orb';
import { useTranslation } from 'react-i18next';
import { transformImageUrl } from '../../utils/transformImgUrl';

const OrchardProgram = () => {
  const { t } = useTranslation()

  const { Catalogs, loading, error, fetchCatalog } = useStore();

  

  useEffect(() => {
    fetchCatalog();
  }, []);

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

  if (error) {
    return <div className="text-center min-h-[80vh]">Xatolik yuz berdi: {error}</div>;
  }


  return (
    <div className='min-h-[70vh] container mx-auto'>
      <h1 className="text-slate-700 text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl  font-semibold text-center mt-5 mb-10">
        {t("orchard_program")}
      </h1>

      <div className='md:w-[70%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-8'>
        {
          Catalogs?.filter((item)=> item.type == 5).length ? 
          Catalogs.filter((item)=> item.type == 5).map((item, index)=>(
          <div key={index} className="bg-white rounded-lg transform transition duration-300 hover:scale-105 shadow-lg hover:shadow-2xl p-4 w-full space-y-2">
              <div className="flex justify-center items-center mb-4">
                <img
                  src={transformImageUrl(item?.filePicture)}
                  alt={item.fileName}
                  className="w-[250px] h-[250px] object-contain bg-white"
                />
              </div>
              <div className='flex gap-5 items-center mb-2'>
                <h3 className="text-lg 2xl:text-3xl font-semibold text-start">{item.nameUz}</h3>
                <p className="text-md 2xl:text-xl">{((item.fileSize / 1024) / 1024).toFixed(1)}MB</p>
              </div>
              
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = item.filePath;
                  link.target = '_blank'
                  link.setAttribute("download", item.fileName || "file.pdf");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="relative overflow-hidden w-full bg-teal-500 font-medium text-white py-[6px] 2xl:py-[12px] 2xl:text-xl rounded-lg group"
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-teal-800 transition-all duration-500 group-hover:w-full"></span>
                <span className="relative z-10">{t("download")}</span>
              </button>
          </div>
          )) : ''
        }
      </div>
    </div>
  );
};

export default OrchardProgram;