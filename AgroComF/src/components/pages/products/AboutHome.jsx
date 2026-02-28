import React from 'react';
import kompImg from "../../../assets/img/kompImg.jpg";
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const AboutHome = () => {
  const { t, i18n } = useTranslation()
  return (
    <>
    <div className='container mx-auto'>
      {i18n.language == 'uz' ? <div className='w-[100%] md:w-[90%] mx-auto bg-green-600 my-10 rounded-2xl min-h-[20vh] p-4 md:p-10'>
        <p className='xs:text-lg md:text-xl 2xl:text-3xl 3xl:text-4xl font-bold text-white text-center'>КОМПАНИЯ ҲАҚИДА</p>
        <p className='xs:text-sm md:text-lg 2xl:text-2xl 3xl:text-3xl text-white text-justify indent-10'>
          <span className='xs:text-lg md:text-xl 2xl:text-3xl 3xl:text-4xl'>"AgroCom"</span> компанияси қишлоқ хўжалигида замонавий талабларга жавоб берадиган ўсимликларни ҳимоя қилиш воситалари ҳамда органик ва минерал ўғитларни қишлоқ хўжалиги соҳасида ўзининг инновацион усулларда ишлаб чиқарилган маҳсулотлари билан танилган компаниялардан келтиради ва фермер хўжаликларига етказиб бериш билан шуғулланади.
        </p>
        <p className='xs:text-sm md:text-lg 2xl:text-2xl 3xl:text-3xl text-white text-justify indent-10'>
          <span className='xs:text-lg md:text-xl 2xl:text-3xl 3xl:text-4xl'>"AgroCom"</span> компанияси қисқа вақт ичида қишлоқ хўжалиги соҳасида мустаҳкам ўрин эгаллаб, кластер ва фермерларнинг ишончли ҳамкорига айланди. “Agro Alliance Group” ва “Agro Aziya Group” ўсимликларни ҳимоя қилиш воситалари ва ўғитлар билан таъминлаш борасида муваффақиятли фаолият юритиб, ўз ишончлилигини исботлади. Шу билан бирга, “Marvarid Agro Biznes” ва “Kumush Agro Biznes” МЧЖлари иссиқхоналарда етиштирилган сабзавот ва цитрус мева маҳсулотларини нафақат маҳаллий бозорда, балки халқаро миқёсда ҳам муваффақиятли экспорт қилиб, компаниянинг қишлоқ хўжалигидаги ўрнини янада мустаҳкамлади.
        </p>
      </div> :

      <div className='w-[100%] md:w-[90%] mx-auto bg-green-600 my-10 rounded-2xl min-h-[20vh] p-4 md:p-10'>
        <p className='xs:text-lg md:text-xl 2xl:text-3xl 3xl:text-4xl font-bold text-white text-center'>О КОМПАНИИ</p>
        <p className='xs:text-sm md:text-lg 2xl:text-2xl 3xl:text-3xl text-white text-justify indent-10'>
            <span className='xs:text-lg md:text-xl 2xl:text-3xl 3xl:text-4xl'>"AgroCom"</span> — это компания, которая импортирует средства защиты растений, а также органические и минеральные удобрения, соответствующие современным требованиям сельского хозяйства. Она занимается их поставками в фермерские хозяйства, предлагая продукцию, произведенную по инновационным методам.
        </p>
        <p className='xs:text-sm md:text-lg 2xl:text-2xl 3xl:text-3xl text-white text-justify indent-10'>
            <span className='xs:text-lg md:text-xl 2xl:text-3xl 3xl:text-4xl'>"AgroCom"</span> за короткое время заняла прочное место в сельскохозяйственном секторе, став надежным партнером кластеров и фермеров. Компании “Agro Alliance Group” и “Agro Aziya Group” успешно занимаются поставками средств защиты растений и удобрений, подтверждая свою надежность. Кроме того, компании “Marvarid Agro Biznes” и “Kumush Agro Biznes” экспортируют овощи и цитрусовые, выращенные в теплицах, не только на местный рынок, но и на международный уровень, укрепляя позиции компании в сельском хозяйстве.
        </p>
      </div>
      }

    </div>
    <div className='container mx-auto mt-8'>
      <div className='w-[90%] mx-auto min-h-24'>
        <div className='my-10 flex justify-center items-center'>
          <div className="wrap my-0 md:my-8">
            <NavLink to={'about'} className="button">
              {t("MoreDetail")}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default AboutHome;