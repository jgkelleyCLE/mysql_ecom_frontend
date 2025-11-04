import React, { useState } from 'react';
import { useGetProductQuery } from '../redux/productApi';
import { useParams } from 'react-router-dom';
import { useGetPartsQuery } from '../redux/partApi';
import { AddToCartButton, FlexColumn, FlexRow, PageContainer, ProductDetailsContainer } from '../components/UI';
import { useDispatch } from 'react-redux';
import PageSpinner from '../components/Misc/PageSpinner';
import { FaCartPlus } from 'react-icons/fa';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState('');
  const dispatch = useDispatch();

  const { data: product, isLoading, isSuccess, isError, error } = useGetProductQuery(id);

  // Create safe metadata values
  const productData = product?.[0];
  const productTitle = productData?.product || 'Product Details';
  const productPrice = productData?.price ? `$${parseFloat(productData.price).toFixed(2)}` : '';
  const productImage = productData?.image || '';
  const productDescription = `${productTitle} - ${productPrice} | Your Store Name`;

  console.log(product);

  const cartHandler = (product) => {
    console.log('PRODUCT: ', product);
    if (quantity === '') {
      return toast.error('Please enter a quantity');
    } else {
      dispatch(addToCart({ ...product, cartQuantity: quantity }));
      toast.success(`${quantity} - ${product.product}${quantity > 1 ? 's' : ''} added to cart`);
      setQuantity('');
    }
  };

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <PageSpinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = (
      <FlexRow className="mt-2 flex-col lg:flex-row items-start  ">
        {/* LEFT SIDE */}
        <div className="lg:w-1/2 w-full  ">
          <img
            className="w-full rounded-md max-h-[700px] object-contain"
            src={product[0]?.image}
            alt={product[0]?.product}
          />
        </div>

        {/* RIGHT SIDE */}
        <ProductDetailsContainer className="lg:w-1/2 w-full">
          <h1 className="text-2xl font-bold">{product[0]?.product}</h1>
          <h1 className="text-gray-600 dark:text-gray-300 font-semibold my-4">
            ${Number(product[0]?.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
          {/* <h1 className="font-semibold text-gray-500">Reviews ({product?.numReviews})</h1> */}

          <input
            type="number"
            className="w-full max-w-[300px] bg-white p-2 text-black font-bold text-xl"
            placeholder="Qty"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <AddToCartButton
            className="w-full max-w-[300px] bg-green-400 hover:bg-green-500 font-bold"
            onClick={() => cartHandler(product[0])}
          >
            <FaCartPlus className="text-xl" /> Add to Cart
          </AddToCartButton>
        </ProductDetailsContainer>
      </FlexRow>
    );
  }

  return (
    <>
      <title>{productTitle}</title>

      {/* Open Graph metadata for Facebook, LinkedIn, etc. */}
      <meta property="og:title" content={productTitle} />
      <meta property="og:description" content={productDescription} />
      <meta property="og:image" content={productImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content="Tentlify" />

      <PageContainer className="mx-4">{content}</PageContainer>
    </>
  );
};

export default ProductDetails;
