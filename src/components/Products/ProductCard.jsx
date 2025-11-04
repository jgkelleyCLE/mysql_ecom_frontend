import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemCard, ProductCardDetails, FlexRow, ViewProductButton } from '../UI';

const ProductCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    // <div className="p-2 shadow-md" key={item.product_id} onClick={() => navigate(`/product/${item.product_id}`)}>
    //   <img src={item.image} alt="product image" />
    //   <h1>{item.product}</h1>
    // </div>
    <ItemCard key={item._id} className="relative">
      <img
        src={item.image}
        alt={item.product}
        width={400}
        height={200}
        onClick={() => navigate(`/product/${item.product_id}`)}
        className="rounded-t-md w-full h-[250px] object-cover bg-white cursor-pointer"
      />
      <ProductCardDetails>
        <FlexRow>
          <h1 className="font-semibold text-md md:text-lg lg:text-xl line-clamp-1">{item.product}</h1>
        </FlexRow>
        <h1 className="font-semibold text-gray-400 -mt-1">
          ${Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h1>
        <ViewProductButton onClick={() => navigate(`/product/${item.product_id}`)}>View Product</ViewProductButton>
      </ProductCardDetails>
    </ItemCard>
  );
};

export default ProductCard;
