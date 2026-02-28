import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
const TabsWithRouter = () => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/products") {
      // navigate("/products/plant-protection");
    }
  }, [navigate]);
  return (
    <div className="p-4 min-h-[80vh]">
      <div className="flex space-x-4 border-b text-lg 2xl:text-2xl">
        <NavLink
          to="/products/plant-protection"
          className={({ isActive }) =>
            `text-center w-[50%] px-4 py-2 font-semibold ${
              isActive
                ? "text-teal-600 border-b-2 border-teal-600"
                : "text-gray-500 hover:text-teal-500"
            }`
          }
        >
          {t("Menu.PlantProtection")}
        </NavLink>
        <NavLink
          to="/products/plant-nutrition"
          className={({ isActive }) =>
            `text-center w-[50%] px-4 py-2 font-semibold ${
              isActive
                ? "text-teal-600 border-b-2 border-teal-600"
                : "text-gray-500 hover:text-teal-500"
            }`
          }
        >
          {t("Menu.PlantNutrition")}
        </NavLink>
      </div>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default TabsWithRouter
