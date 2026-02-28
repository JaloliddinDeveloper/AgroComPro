
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../../../store/useStore";
import Orb from "../../../../Orb";
import PlantNutritionCard from "../../../../components/cards/PLantNutritionCard";
import Npk from "../../../../components/cards/Npk";

const PlantNutritionNpk = () => {
  const { selectedProduct, fetchProductDetails, loading, error } = useStore();
  const { id } = useParams();
  const type = 'productTwo'

  useEffect(() => {
    fetchProductDetails(id, 'productTwo');
  }, [type, id]);

  if (loading) return (
    <div className="w-[100%] h-[80vh] flex items-center justify-center">
      <Orb
        hoverIntensity={0.2}
        rotateOnHover={true}
        hue={2}
        forceHoverState={true}
      />
    </div>
  );
  if (error) return <p>Xatolik yuz berdi: {error}</p>;
  if (!selectedProduct) return <p>Mahsulot topilmadi!</p>;

  const productData = selectedProduct?.productTwo

  if (!productData) return <p>Ma'lumot mavjud emas!</p>;

  return (
    <div className="">
      <Npk id={id}/>
    </div>
  );
};

export default PlantNutritionNpk;
