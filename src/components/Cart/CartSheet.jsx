import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';
import { removeFromCart } from '../../redux/cartSlice';
import { toast } from 'sonner';
import { FlexColumn } from '../UI';
import { OrangeButton } from '../Cart/Cart.styles';
import { SheetFooter } from '../ui/sheet';
import CartBadge from './CartBadge';

const CartSheet = () => {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart.cartList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
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
  const sortedCart = [...cart].sort((a, b) => b.price - a.price);

  const list = sortedCart?.map((item) => (
    <div
      key={item.product_id}
      className="bg-gray-200 dark:bg-gray-800 dark:text-gray-200 p-2 rounded-md flex items-center justify-start my-2 relative cursor-pointer hover:bg-gray-100 transition duration-300 w-11/12"
      onClick={() => navigationHandler(item)}
    >
      <img src={item.image} alt={item.product} className="w-20 rounded-md m-2 mr-4" />
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">{item.product}</h1>
        <h1 className="text-sm">
          ${Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h1>
        <h1 className="text-sm">Qty: {item.cartQuantity}</h1>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent event from bubbling up to the parent div
          removeHandler(item);
        }}
      >
        <TiDelete className="text-3xl absolute -top-2 -right-3 z-40 hover:text-red-500 transition duration-300 cursor-pointer" />
      </button>
    </div>
  ));

  const cartHandler = () => {
    navigate('/cart');
    setOpen(false);
  };

  const navigationHandler = (item) => {
    navigate(`/product/${item.product_id}`);
    setOpen(false);
  };

  const productHandler = () => {
    navigate('/product');
    setOpen(false);
    // onClose()
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="relative mr-2">
          <FaShoppingCart className="text-white text-2xl" />
          <CartBadge cart={cart} />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart ({cart.length})</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {cart.length === 0 ? (
          <FlexColumn>
            <h1 className="text-xl text-gray-400 italic">Cart is empty</h1>
            <OrangeButton onClick={() => productHandler()}>View Products</OrangeButton>
          </FlexColumn>
        ) : null}
        <FlexColumn>{list}</FlexColumn>

        <SheetFooter>
          <div className="flex flex-col items-end gap-2">
            <h1 className="text-2xl">
              Subtotal: ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h1>
            {/* <h1>Delivery Fee: ${deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
            <h1>Tax: ${taxPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
            <h1>Total: ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1> */}
            <div className="flex items-center gap-2">
              <OrangeButton
                className="bg-gray-400 hover:bg-gray-300 transition duration-300 mt-0"
                mr={3}
                onClick={() => setOpen(false)}
              >
                Cancel
              </OrangeButton>
              <OrangeButton className="mt-0" onClick={cartHandler}>
                View Quote
              </OrangeButton>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
