import React, { useState } from "react";
import { RxInstagramLogo } from "react-icons/rx";
import { TbBrandFacebook } from "react-icons/tb";
import { PiTelegramLogo } from "react-icons/pi";
import logo from "/logo/logo-white.png";
import { NavLink } from "react-router-dom";
import ModalForm from "../modal/ModalForm";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    
  };

  return (
    <>
    <div className="w-full bg-green-600 text-white py-10 px-5 text-sm 2xl:text-2xl 4xl:text-3xl">
      <div className="container mx-auto grid grid-cols-12 gap-4 text-center md:text-left">
        {/* Logo Section */}
        {/* <div className="rounded-sm rounded-tr-[55px] rounded-bl-[30px] bg-white p-1 h-[70px] w-[210px]"> */}
            <div className="col-span-12 md:col-span-7 lg:col-span-4">
              <NavLink to="/" className="flex items-center justify-center md:justify-start space-x-3 rtl:space-x-reverse">
              <div className="flex items-center justify-between gap-2 p-3 rounded">
                <img
                  src={logo}
                  alt="logo"
                  className="rounded-[17px] w-[40px] h-[40px] md:w-[90px] md:h-[65px] xl:h-[75px]"
                />
                <div className="w-full text-end ml-2">
                  {/* <h3 className="font-bold text-[#0E644D] text-start text-sm md:text-lg xl:text-2xl 4xl:text-3xl"> */}
                  <h3 className="font-bold text-white text-start text-xl md:text-2xl xl:text-3xl 4xl:text-4xl">
                    Agro<span className="text-white">Com®</span>
                  </h3>
                  <span className="text-white text-end w-full font-medium text-xs md:text-sm xl:text-sm 4xl:text-xl">
                    Ishonchli himoya
                  </span>
                </div>
              </div>
              </NavLink>
              {
                i18n.language == 'uz' ?
                <p className='font-bold text-sm md:text-sm 3xl:text-lg mt-2 4xl:text-2xl'>СИЗГА ЮҚОРИ ҲОСИЛ ОЛИШИНГИЗДА КЎМАКЛАШАМИЗ</p> :
                <p className='font-bold text-sm md:text-sm 3xl:text-lg mt-2 4xl:text-2xl'>МЫ ПОМОЖЕМ ВАМ ДОСТИЧЬ ВЫСОКОГО УРОЖАЯ</p>
              }
            </div>
          {/* </div> */}

        {/* Address Section */}
        <div className="col-span-12 lg:col-span-3 md:col-span-5">
          <h3 className="text-lg 4xl:text-3xl font-bold">{t("Address")}</h3>
          <p className="max-w-[300px] mt-2">{t("Navbar.Address")}</p>
        </div>

        {/* Contact Section */}
        <div className="col-span-12 md:col-span-7 lg:col-span-2">
          <h3 className="text-lg 4xl:text-3xl font-bold">{t("Navbar.Menu.Contact")}</h3>
          <div className="mt-2 space-y-1">
            <a href="tel:+998998510018" className="block hover:text-green-300">+998 99 851 00 18</a>
            <a href="tel:+998998210018" className="block hover:text-green-300">+998 99 821 00 18</a>
            <a href="tel:+998772997700" className="block hover:text-green-300">+998 77 299 77 00</a>
          </div>
          <a href="mailto:info@aag-group.uz" className="hover:text-green-200 mt-2 inline-block">info@aag-group.uz</a>
        </div>

        {/* Social Media & Modal Button */}
        <div className="col-span-12 md:col-span-5 lg:col-span-3">
          <h3 className="text-lg 4xl:text-3xl font-bold">{t("UsSocial")}</h3>
          <div className="flex justify-center md:justify-start gap-3 mt-2">
            <a target="_blank" href="https://www.facebook.com/100090505449159/" className="p-2 bg-white text-green-600 rounded-md hover:bg-green-500 hover:text-white"><TbBrandFacebook size={24} /></a>
            <a target="_blank" href="https://www.instagram.com/agrocom_uz?igsh=OXRyOTA3YXo5enhq" className="p-2 bg-white text-green-600 rounded-md hover:bg-green-500 hover:text-white"><RxInstagramLogo size={24} /></a>
            <a target="_blank" href="https://t.me/agrocomguruh" className="p-2 bg-white text-green-600 rounded-md hover:bg-green-500 hover:text-white"><PiTelegramLogo size={24} /></a>
          </div>
          <p onClick={toggleModal} className="cursor-pointer mt-4 font-medium py-2 rounded-lg hover:text-green-200 text-md 2xl:text-lg 3xl:text-xl 4xl:text-2xl">
            {t("RequestRecons")}
          </p>
        </div>
      </div>

      {/* Modal */}
      {isOpen && <ModalForm toggleModal={toggleModal} />} 
    </div>
    {/* <div className="py-3 bg-green-800 text-center text-white">
      <p className='font-bold text-sm md:text-lg 2xl:text-xl 4xl:text-2xl mt-2'>СИЗГА ЮҚОРИ ҲОСИЛ ОЛИШИНГИЗДА КЎМАКЛАШАМИЗ</p>
    </div> */}
  </>
  );
};

export default Footer;
