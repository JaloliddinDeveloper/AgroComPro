

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const table = [
  {
    "img": "/npk/image.png",
    "nomi": "GreenPlus® NPK",
    "jadval": [
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.jami_azot",
            "foiz1": "20%",
            "foiz2": "13%",
            "foiz3": "12%"
        },
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.ammoniy_azoti",
            "foiz1": "4%",
            "foiz2": "7.8%",
            "foiz3": "2.3%"
        },
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.mochovina_azoti",
            "foiz1": "16%",
            "foiz2": "5.2%",
            "foiz3": "9.7%"
        },
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.fosfor",
            "foiz1": "20%",
            "foiz2": "40%",
            "foiz3": "40%"
        },
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.kaliy_oksid",
            "foiz1": "20%",
            "foiz2": "10%",
            "foiz3": "36%"
        },
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.bor",
            "foiz1": "0.01%",
            "foiz2": "0.01%",
            "foiz3": "0.01%"
        },
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.mis",
            "foiz1": "0.02%",
            "foiz2": "0.02%",
            "foiz3": "0.02%"
        },
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.temir",
            "foiz1": "0.02%",
            "foiz2": "0.02%",
            "foiz3": "0.02%"
        },
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.marganets",
            "foiz1": "0.02%",
            "foiz2": "0.02%",
            "foiz3": "0.02%"
        },
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.molibden",
            "foiz1": "0.007%",
            "foiz2": "0.007%",
            "foiz3": "0.007%"
        },
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.rux",
            "foiz1": "0.01%",
            "foiz2": "0.01%",
            "foiz3": "0.01%"
        },
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.rangi",
            "foiz1": "Синий",
            "foiz2": "Желтый",
            "foiz3": "Зеленый"
        },
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.ph",
            "foiz1": "5-7",
            "foiz2": "5-7",
            "foiz3": "5-7"
        },
        {
            "tarkibi": "PlantNutrition.Npk1.tarkibi.chokma",
            "foiz1": "0.05%",
            "foiz2": "0.05%",
            "foiz3": "0.05%"
        }
    ],
    "tavsif": "PlantNutrition.Npk1.tavsif",
    "saf_meyor": "PlantNutrition.Npk1.saf_meyor"
  },
  {
    "img": "/npk/npk2.jpg",
    "nomi": "POLIFERT NPK",
    "jadval": [
        {
            "tarkibi": "Жами азот (N)",
            "foiz1": "20%",
            "foiz2": "18%",
            "foiz3": "13%",
            "foiz4": "3%"
        },
        {
            "tarkibi": "Нитратли Азот (N)",
            "foiz1": "5.5%",
            "foiz2": "9%",
            "foiz3": "1%",
            "foiz4": "1%"
        },
        {
            "tarkibi": "Аммоний азоти (N)",
            "foiz1": "3%",
            "foiz2": "9%",
            "foiz3": "9%",
            "foiz4": "2%"
        },
        {
            "tarkibi": "Мочевина азоти (N)",
            "foiz1": "11%",
            "foiz2": "6%",
            "foiz3": "3%",
            "foiz4": "-"
        },
        {
            "tarkibi": "Сувда эрувчан фосфор 5-оксид (P₂O₅)",
            "foiz1": "20%",
            "foiz2": "18%",
            "foiz3": "40%",
            "foiz4": "11%"
        },
        {
            "tarkibi": "Сувда эрувчан калий оксид (K₂O)",
            "foiz1": "20%",
            "foiz2": "18%",
            "foiz3": "13%",
            "foiz4": "18%"
        },
        {
            "tarkibi": "Сувда эрувчан бор (B)",
            "foiz1": "0.01%",
            "foiz2": "0.01%",
            "foiz3": "0.01%",
            "foiz4": "0.01%"
        },
        {
            "tarkibi": "Сувда эрувчан мис (Cu)",
            "foiz1": "0.02%",
            "foiz2": "0.02%",
            "foiz3": "0.02%",
            "foiz4": "0.02%"
        },
        {
            "tarkibi": "Сувда эрувчан темир (Fe)",
            "foiz1": "0.02%",
            "foiz2": "0.02%",
            "foiz3": "0.02%",
            "foiz4": "0.02%"
        },
        {
            "tarkibi": "Сувда эрувчан марганец (Mn)",
            "foiz1": "0.02%",
            "foiz2": "0.02%",
            "foiz3": "0.02%",
            "foiz4": "0.02%"
        },
        {
            "tarkibi": "Сувда эрувчан молибден (Mo)",
            "foiz1": "0.001%",
            "foiz2": "0.001%",
            "foiz3": "0.001%",
            "foiz4": "0.001%"
        },
        {
            "tarkibi": "Сувда эрувчан рух (Zn)",
            "foiz1": "0.01%",
            "foiz2": "0.01%",
            "foiz3": "0.01%",
            "foiz4": "0.01%"
        },
        {
            "tarkibi": "Ранги",
            "foiz1": "Қизил",
            "foiz2": "Яшил",
            "foiz3": "Тўқ сариқ",
            "foiz4": "Қизил"
        },
        {
            "tarkibi": "pH",
            "foiz1": "4-6",
            "foiz2": "4-6",
            "foiz3": "4-6",
            "foiz4": "4-6"
        },
        {
            "tarkibi": "Сувда эримайдиган чўкманинг максимал оғирлиги",
            "foiz1": "0.05%",
            "foiz2": "0.05%",
            "foiz3": "0.05%",
            "foiz4": "0.05%"
        }
    ],
    "tavsif": "Poly Fert NPK белгиланган нисбатда барча ўсимликлар ва мевали дарахтларда хавфсиз ишлатиладиган мувозанатли ўғитдир. Таркибидаги қўшимча магний ва ферментлар туфайли озиқ моддаларнинг ўсимликлар томонидан тўғри ва юкламасиз ўзлаштирилишини таъминлайди.",
    "saf_meyor": "10 л сувга 20-25 гр."
  }
]

const Npk = ({id}) => {
  const navigate = useNavigate();
  const { t } = useTranslation()
  useEffect(()=>{
  },[])
  return (
    table && <div className="bg-gray-100 p-0 min-h-screen flex items-center justify-center relative rounded-lg">
      <button
        onClick={() => navigate(-1)}
        className="bg-teal-500 font-medium text-white py-2 px-5 rounded-lg hover:bg-teal-600 absolute left-0 top-0 text-lg 2xl:text-2xl"
      ><span className="mr-1">←</span>{t('back')}</button>
      <div className="mt-16 w-full md:w-[80%]  bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-300">
        <div className="flex flex-col items-center md:flex-row">
          <img
            src={table[id-1].img} // vaqtincha
            alt="Agro-Nurell 55% эм.к."
            className="w-96 h-96 object-contain p-2"
          />
          <div className="px-1 md:px-4 py-4">
            <h1 className="text-2xl font-bold text-green-700">{table[id-1].nomi}</h1>

            <div className="w-full overflow-x-auto md:overflow-visible">
              <table className="w-full mt-2 text-xs sm:text-sm 2xl:text-xl text-left text-gray-700 border border-gray-300 table p-0">
                <thead className="bg-green-100">
                  {id == 2 ? <tr>
                    <th className="p-1 sm:p-2 border">Таркиби</th>
                    <th className="p-1 sm:p-2 border">20-20-20+M³</th>
                    <th className="p-1 sm:p-2 border">18-18-18+M³</th>
                    <th className="p-1 sm:p-2 border">13-40-13+M³</th>
                    <th className="p-1 sm:p-2 border">3-11-18+</th>
                  </tr> :
                  <tr>
                    <th className="p-1 sm:p-2 border">Таркиби</th>
                    <th className="p-1 sm:p-2 border">20-20-20+M³</th>
                    <th className="p-1 sm:p-2 border">13-40-13+M³</th>
                    <th className="p-1 sm:p-2 border">12-12-36+M³</th>
                  </tr>}
                </thead>
                <tbody>
                  { 
                    table[id - 1]?.jadval.map((data, index)=>(
                      <tr key={index}>
                        <td className="p-1 sm:p-2 border">{t(data?.["tarkibi"])}</td>
                        <td className="p-1 sm:p-2 border">{data?.["foiz1"]}</td>
                        <td className="p-1 sm:p-2 border">{data?.["foiz2"]}</td>
                        <td className="p-1 sm:p-2 border">{data?.["foiz3"]}</td>
                        {id == 2 ? <td className="p-1 sm:p-2 border">{data?.["foiz4"]}</td> : ''}
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <div>
                <p className="mt-2 md:text-lg 2xl:text-xl">{t(table[id-1].tavsif)}</p>
                <p className="font-bold md:text-lg 2xl:text-xl mt-2">{t(table[id-1].saf_meyor)}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Npk;