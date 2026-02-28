
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../../../store/useStore";
import AgroNurellCard from "../../../../components/cards/Card1";
import Orb from "../../../../Orb";

const PlantProtectionView = () => {
  const navigate = useNavigate();
  const { selectedProduct, fetchProductDetails, loading, error } = useStore();
  const { id } = useParams();
  const type = 'productOne'

  useEffect(() => {
    fetchProductDetails(id, 'productOne');
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

  const productData =
    type === "productOne"
      ? selectedProduct?.productOne
      : selectedProduct?.productTwo;

  const tableData =
    type === "productOne"
      ? selectedProduct?.tableOnes || []
      : selectedProduct?.tableTwo || [];

  if (!productData) return <p>Ma'lumot mavjud emas!</p>;

  return (
    <div className="">
      <AgroNurellCard data={selectedProduct}/>
    </div>
  );
};

export default PlantProtectionView;
