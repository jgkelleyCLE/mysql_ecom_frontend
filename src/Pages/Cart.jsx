import { useState } from 'react';
import { PageContainer, PageHeader } from '../components/UI';
import { useSelector, useDispatch } from 'react-redux';
import { CartCard, QuantityContainer, PlusIcon, MinusIcon } from '../components/Cart/Cart.styles';
import { OrangeButton } from '../components/Cart/Cart.styles';
import { FlexColumn, FlexRow } from '../components/UI';
import { TiDelete } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/cartSlice';
import { toast } from 'sonner';
import ClearCartModal from '../components/Modals/ClearCartModal';
import EmailModal from '../components/Modals/EmailModal';

const Cart = () => {
  const cartList = useSelector((state) => state.cart.cartList || []);

  console.log('LENGTH: ', cartList.length);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  const calculateSubtotal = () => {
    return cartList.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 85.0;
  const taxPrice = subtotal * 0.15;
  const total = subtotal + deliveryFee + taxPrice;

  const removeHandler = (item) => {
    dispatch(removeFromCart(item));
    toast.success(`${item.product} removed from cart`);
  };

  // Sort the cart items by price in descending order
  const sortedCart = [...cartList].sort((a, b) => b.price - a.price);

  return (
    <>
      <title>Cart | Tentlify</title>
      <meta name="description" content={`Shopping cart with ${cartList.length} items totaling $${total.toFixed(2)}`} />
      <meta property="og:title" content={`Cart (${cartList.length}) - Your Store`} />
      <meta property="og:description" content={`Shopping cart with ${cartList.length} items`} />

      <PageContainer>
        <PageHeader>Cart</PageHeader>
        <div>
          {cartList.length === 0 ? (
            <FlexColumn>
              <h1 className="text-2xl my-4">Cart is empty</h1>
              <OrangeButton onClick={() => navigate('/product')}>View Products</OrangeButton>
            </FlexColumn>
          ) : (
            <FlexColumn className="">
              <h1 className="text-2xl my-4">Cart({cartList.length})</h1>
              <FlexRow className="flex flex-col md:flex-row md:items-start items-center w-11/12 max-w-[1600px]">
                {/* LEFT SIDE */}
                <div className="w-[95%] md:w-[65%] mx-4 ">
                  {sortedCart?.map((item) => (
                    <CartCard key={item.product_id} className="relative ">
                      <div className="flex items-start">
                        <img
                          className="w-32 object-fit rounded-md cursor-pointer mr-2"
                          src={item.image}
                          alt={item.product}
                          onClick={() => navigate(`/product/${item._id}`)}
                        />

                        <div className="flex flex-col items-start">
                          <h1
                            className="text-md md:text-xl font-bold cursor-pointer"
                            onClick={() => navigate(`/product/${item._id}`)}
                          >
                            {item.product}
                          </h1>
                          <h1 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                            $
                            {Number(item.price).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </h1>
                          <QuantityContainer>
                            <button onClick={() => dispatch(decreaseQuantity(item))}>
                              <MinusIcon />
                            </button>
                            <h1 className="w-[50px] border-2 border-gray-400 px-2 rounded-md">{item.cartQuantity}</h1>

                            <button onClick={() => dispatch(increaseQuantity(item))}>
                              <PlusIcon />
                            </button>
                          </QuantityContainer>
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event from bubbling up to the parent div
                            removeHandler(item);
                          }}
                        >
                          <TiDelete className="text-3xl absolute -top-2 -right-3 z-40 hover:text-red-500 transition duration-300 cursor-pointer" />
                        </button>
                      </div>
                    </CartCard>
                  ))}
                  <div className="w-full flex items-center justify-end mr-8">
                    <ClearCartModal />
                  </div>
                </div>

                {/* RIGHT SIDE  */}
                <div className="w-[95%] md:w-[30%] flex flex-col items-start gap-1 p-3 shadow-md shadow-black/20 md:mr-4 rounded-md bg-gray-200 dark:bg-gray-600">
                  <h1>
                    Subtotal: $
                    {Number(subtotal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h1>
                  <h1>Estimated Delivery: ${deliveryFee}</h1>
                  <h1>
                    Tax: $
                    {Number(taxPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h1>
                  {/* <Divider my="2" borderColor="gray.500" borderWidth="1px"  /> */}
                  <h1 className="font-bold">
                    Total: $
                    {Number(total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                  </h1>

                  <EmailModal subtotal={subtotal} deliveryFee={deliveryFee} taxPrice={taxPrice} total={total} />
                </div>
              </FlexRow>
            </FlexColumn>
          )}
        </div>
      </PageContainer>
    </>
  );
};

export default Cart;
