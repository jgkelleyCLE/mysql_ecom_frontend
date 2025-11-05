import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { format, set } from 'date-fns';
import { OrangeButton } from '../Cart/Cart.styles';
import { useSendEmailMutation } from '../../redux/emailApi';
import { useCreateOrderMutation } from '../../redux/orderApi';
import { clearCart } from '../../redux/cartSlice';

const EmailModal = ({ subtotal, deliveryFee, taxPrice, total }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const cart = useSelector((state) => state.cart.cartList);

  const [sendEmail, { data: emailData, isLoading, isSuccess, isError, error }] = useSendEmailMutation();

  const [
    createOrder,
    { data: orderData, isLoading: orderLoading, isSuccess: orderSuccess, isError: isOrderError, error: orderError },
  ] = useCreateOrderMutation();

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p className="font-bold">Event date: {format(selected, 'PP')}.</p>;
  }

  const emailHandler = (cart, subtotal, deliveryFee, taxPrice, total, email, selected) => {
    sendEmail({ cart, subtotal, deliveryFee, taxPrice, total, email, selected, title });

    console.log(cart, subtotal, deliveryFee, taxPrice, total, email, selected);

    setEmail('');
    setSelected('');
    toast.success('Email sent');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title) {
      toast.error('Title required.');
    } else if (!email) {
      toast.error('Email required.');
    } else if (!selected) {
      toast.error('Date required.');
    } else if (!user) {
      toast.error('You must be logged in to submit an order!');
    } else {
      emailHandler(cart, subtotal, deliveryFee, taxPrice, total, email, selected, title);

      if (title && email && selected) {
        createOrder({
          user_id: user?.user?.user_id,
          title,
          cart,
          event_date: selected,
          subtotal,
          tax_price: taxPrice,
          shippingPrice: deliveryFee,
          total_price: total,
          orderStatus: 'Pending',
        });
      }
    }
  };

  useEffect(() => {
    if (orderSuccess) {
      toast.success('Order successfully created.');
      setOpen(false);
      dispatch(clearCart());
      navigate('/thank-you');
    }

    if (orderError) {
      toast.error('Failed to create order');
    }
  }, [orderSuccess, orderError]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <p className="bg-blue-500 hover:bg-blue-600 transition duration-300 p-2 rounded-md mt-2 mb-1 w-full text-white">
          Email Quote
        </p>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Email Your Quote</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form className="flex flex-col items-center w-full" onSubmit={submitHandler}>
          <input
            required
            className="border-2 border-gray-300 p-2 rounded-md my-1 w-full"
            placeholder="Event Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* <input className="border-2 border-gray-300 p-2 rounded-md my-1 w-full" type="date" value={formData.date} onChange={(e)=> setFormData({ ...formData, date: e.target.value })} /> */}
          <label>Date of event:</label>
          <DayPicker mode="single" selected={selected} onSelect={setSelected} footer={footer} />
          <input
            required
            className="border-2 border-gray-300 p-2 rounded-md my-1 w-full"
            placeholder="Your email address"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <OrangeButton className="w-full" type="submit">
            Submit
          </OrangeButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;
