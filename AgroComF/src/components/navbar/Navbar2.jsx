import React, { useEffect, useState } from 'react';
import logo from "/logo/logo-white.png";
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RxInstagramLogo } from "react-icons/rx";
import { TbBrandFacebook } from "react-icons/tb";
import { PiTelegramLogo } from "react-icons/pi";
const Navbar2 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pathName, setPathName] = useState()
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsDropdownOpen2(false);
  };
  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
    setIsDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(()=>{
    setIsMobileMenuOpen(false);
    setIsDropdownOpen2(false);
    setIsDropdownOpen(false);
    setPathName(location.pathname)
  }, [location.pathname])

  return (
    <>
    <div className="bg-green-800">
      <div className='lg:container mx-auto text-white py-2 px-6 flex justify-center md:justify-between items-center text-sm 2xl:text-2xl'>
        <div className="hidden md:flex items-center gap-2">
          {
            i18n.language == 'uz' ?
            <p className='font-bold text-sm 2xl:text-xl 4xl:text-2xl'>СИЗГА ЮҚОРИ ҲОСИЛ ОЛИШИНГИЗДА КЎМАКЛАШАМИЗ</p> :
            <p className='font-bold text-sm 2xl:text-xl 4xl:text-2xl'>МЫ ПОМОЖЕМ ВАМ ДОСТИЧЬ ВЫСОКОГО УРОЖАЯ</p>
          }
        </div>

        <div className="flex items-center gap-8">
          {/* <p className='hidden md:block font-bold'>{t("Navbar.Address")}</p> */}

          <div className="flex gap-2">
            {/* <button onClick={() => changeLanguage('uz')} className={`underline-offset-4 hover:underline font-bold ${i18n.language == 'uz' ? 'underline' : ''}`}>🇺🇿 ЎЗ</button> */}
            <button onClick={() => changeLanguage('uz')} className={`flex items-center gap-2 border-b-2 hover:text-green-200 font-bold ${i18n.language == 'uz' ? 'border-white' : 'border-hidden'}`}><img src="/flags/uz.svg" alt="Uzbekistan Flag" width="40" /> ЎЗ</button>
            <span>/</span>
            {/* <button onClick={() => changeLanguage('ru')} className={`underline-offset-4 hover:underline font-bold ${i18n.language == 'ru' ? 'underline' : ''}`}>🇷🇺 РУ</button> */}
            <button onClick={() => changeLanguage('ru')} className={`flex items-center gap-2 border-b-2 hover:text-green-200 font-bold ${i18n.language == 'ru' ? 'border-white' : 'border-hidden'}`}><img src="/flags/ru.svg" alt="Russia Flag" width="30" /> РУ</button>
          </div>
        </div>
      </div>
    </div>
    <nav className="w-full bg-green-600">
      <div className="lg:container flex flex-wrap items-center justify-between mx-auto p-8 text-sm 2xl:text-2xl 4xl:text-3xl">
        <NavLink to='/' className="flex items-center space-x-3 rtl:space-x-reverse" end>
          {/* <div className="rounded-sm rounded-tr-[55px] rounded-bl-[30px] bg-white p-1 h-[70px] w-[210px]"> */}
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
          {/* </div> */}
        </NavLink>


        <div className="hidden md:flex lg:hidden items-center gap-7">
              <div className="flex items-center gap-3 font-medium text-white">
                <div className="flex-col flex">
                  <a
                    href="tel:+998998510018"
                    className="text-white hover:underline">
                    📞: +998 99 851 00 18
                  </a>
                  <a
                    href="tel:+998998210018"
                    className="text-white hover:underline">
                    📞: +998 99 821 00 18
                  </a>
                  <a
                    href="tel:+998772997700"
                    className="text-white hover:underline">
                    📞: +998 77 299 77 00
                  </a>
                </div>
              </div>
          </div>
        
        <button
          onClick={toggleMobileMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className='w-full lg:w-[70%] flex flex-col gap-4'>
          <div className='w-full flex flex-col items-end'>
            <div className="hidden lg:flex items-center gap-7">
              <div className="flex flex-col items-center font-bold gap-3 text-white">
                <div className="flex flex-col">
                  <a
                    href="tel:+998998510018"
                    className="text-white hover:underline">
                    📞: +998 99 851 00 18
                  </a>
                  <a
                    href="tel:+998998210018"
                    className="text-white hover:underline">
                    📞: +998 99 821 00 18
                  </a>
                  <a
                    href="tel:+998772997700"
                    className="text-white hover:underline">
                    📞: +998 77 299 77 00
                  </a>
                </div>
                <div className="flex justify-center md:justify-start gap-3">
                  <a target="_blank" href="https://www.facebook.com/100090505449159/" className="p-2 bg-white text-green-600 rounded-md hover:bg-green-500 hover:text-white"><TbBrandFacebook size={24} /></a>
                  <a target="_blank" href="https://www.instagram.com/agrocom_uz?igsh=OXRyOTA3YXo5enhq" className="p-2 bg-white text-green-600 rounded-md hover:bg-green-500 hover:text-white"><RxInstagramLogo size={24} /></a>
                  <a target="_blank" href="https://t.me/agrocomguruh" className="p-2 bg-white text-green-600 rounded-md hover:bg-green-500 hover:text-white"><PiTelegramLogo size={24} /></a>
                  </div>
              </div>
            </div>
          </div>
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full lg:block md:w-auto`} id="navbar-dropdown">
            <ul className="w-full md:w-[95%] flex flex-col md:flex-row font-medium p-4 md:p-0 mt-4 rounded-lg bg-green-600 justify-between 3xl:justify-normal 3xl:gap-10">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `lg:bg-green-700 bg-green-600 block py-2 px-3 rounded-full md:p-3 font-bold hover:bg-green-900 text-white ${
                      isActive ? 'bg-green-900 lg:bg-green-900' : 'bg-green-600'
                    }`
                  }
                >
                  {t("Navbar.Menu.Home")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `lg:bg-green-700 bg-green-600 block py-2 px-3 rounded-full md:p-3 font-bold hover:bg-green-900 text-white ${
                      isActive ? 'bg-green-900 lg:bg-green-900' : 'bg-green-600'
                    }`
                  }
                >
                  {t("Navbar.Menu.About")}
                </NavLink>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setIsDropdownOpen2(true)}
                onMouseLeave={() => setIsDropdownOpen2(false)}
              >
                <button
                  onClick={toggleDropdown2}
                  className={`lg:bg-green-700 bg-green-600 md:p-3 flex items-center justify-between w-full py-2 px-3 rounded-full font-bold hover:bg-green-900 text-white md:border-0 md:w-auto
                    ${
                      (pathName == '/products/plant-protection' || pathName == '/products/plant-nutrition') ? 'bg-green-900 lg:bg-green-900' : 'bg-green-600'
                    }
                    `
                  }
                >
                  {t("Navbar.Menu.Products")}
                  {/* <svg
                    className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-200 ${
                      isDropdownOpen2 ? 'rotate-180' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg> */}
                </button>

                
                  <div className={`absolute left-0 mt-2 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-md w-[100%] md:w-[150%] overflow-hidden transition-all duration-500 ease-in-out ${
                    isDropdownOpen2 ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <ul className="py-2 text-sm 2xl:text-2xl 4xl:text-3xl">
                      <li>
                        <NavLink to={'/products/plant-protection'}
                          className = {({ isActive }) =>
                            `block px-4 py-2 hover:bg-gray-100 ${
                              isActive ? 'bg-gray-200 text-green-900' : ''
                            }`
                          }
                        >
                          {t("Menu.PlantProtection")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={'/products/plant-nutrition'}
                          className = {({ isActive }) =>
                            `block px-4 py-2 hover:bg-gray-100 ${
                              isActive ? 'bg-gray-200 text-green-900' : ''
                            }`
                          }
                        >
                          {t("Menu.PlantNutrition")}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
              </li>
              <li>
                <NavLink
                  to="/news"
                  className={({ isActive }) =>
                    `lg:bg-green-700 bg-green-600 block py-2 px-3 rounded-full md:p-3 font-bold hover:bg-green-900 text-white ${
                      isActive ? 'bg-green-900 lg:bg-green-900' : 'bg-green-600'
                    }`
                  }
                >
                  {t("Navbar.Menu.News")}
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/catalog"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm md:p-0 font-bold hover:text-green-300 ${
                      isActive ? 'text-green-900' : 'text-white'
                    }`
                  }
                >
                  {'Каталог'}
                </NavLink>
              </li> */}
              <li 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  onClick={toggleDropdown}
                  className={`lg:bg-green-700 bg-green-600 md:p-3 flex items-center justify-between w-full py-2 px-3 rounded-full font-bold hover:bg-green-900 text-white md:border-0 md:w-auto
                    ${
                      (['/catalog', '/liflet', '/grain-program', '/cotton-program', '/orchard-program', '/greenhouse-program'].includes(pathName)) ? 'bg-green-900 lg:bg-green-900' : 'bg-green-600'
                    }
                    `
                  }
                >
                  Каталог
                  {/* <svg
                    className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg> */}
                </button>

                  <div className={`absolute left-0 mt-2 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-md w-[100%] md:w-[250%] overflow-hidden transition-all duration-500 ease-in-out ${
                    isDropdownOpen ? 'max-h-[60vh] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <ul className="py-2 text-sm 2xl:text-2xl 4xl:text-3xl">
                      <li>
                        <NavLink to={'/catalog'}
                          className = {({ isActive }) =>
                            `block px-4 py-2 hover:bg-gray-100 ${
                              isActive ? 'bg-gray-200 text-green-900' : ''
                            }`
                          }
                        >
                          Каталог
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={'/liflet'}
                          className = {({ isActive }) =>
                            `block px-4 py-2 hover:bg-gray-100 ${
                              isActive ? 'bg-gray-200 text-green-900' : ''
                            }`
                          }
                        >
                          Лифлет
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={'/grain-program'}
                          className = {({ isActive }) =>
                            `block px-4 py-2 hover:bg-gray-100 ${
                              isActive ? 'bg-gray-200 text-green-900' : ''
                            }`
                          }
                        >
                          {t("grain_program")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={'/cotton-program'}
                          className = {({ isActive }) =>
                            `block px-4 py-2 hover:bg-gray-100 ${
                              isActive ? 'bg-gray-200 text-green-900' : ''
                            }`
                          }
                        >
                          {t("cotton_program")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={'/orchard-program'}
                          className = {({ isActive }) =>
                            `block px-4 py-2 hover:bg-gray-100 ${
                              isActive ? 'bg-gray-200 text-green-900' : ''
                            }`
                          }
                        >
                          {t("orchard_program")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={'/greenhouse-program'}
                          className = {({ isActive }) =>
                            `block px-4 py-2 hover:bg-gray-100 ${
                              isActive ? 'bg-gray-200 text-green-900' : ''
                            }`
                          }
                        >
                          {t("greenhouse_program")}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `lg:bg-green-700 bg-green-600 block py-2 px-3 rounded-full md:p-3 font-bold hover:bg-green-900 text-white ${
                      isActive ? 'bg-green-900 lg:bg-green-900' : 'bg-green-600'
                    }`
                  }
                >
                  {t("Navbar.Menu.Contact")}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar2;