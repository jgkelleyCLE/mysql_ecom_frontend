import React from 'react';
import { PageContainer } from '../components/UI';
import { OrangeLink } from '../components/Cart/Cart.styles';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen relative">
      <div className="absolute top-0 left-0 w-full h-[100vh] bg-black/20 z-10"></div>
      <img
        alt="hero"
        draggable="false"
        src="https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/media%2FGreekFestivalOverhead.jpg?alt=media&token=a9ec3aa2-0747-489b-ae6d-b62af5996ff0"
        className="w-full h-[100vh] object-cover absolute top-0 left-0"
        priority="true"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2 z-10 w-[90%] max-w-[700px] bg-black/80 p-6 rounded-lg text-gray-200">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/Tenlify_Logo_Thin_Small.png?alt=media&token=59587449-7b7c-439f-a434-5b4059035b11"
          alt="Tentlify Rentals"
          className="w-[150px]"
        />
        <h1 className="text-2xl text-center">Thank you for your interest in Tentlify Rentals!</h1>
        <p>Your email will arrive momentarily.</p>
        <p className="italic text-center">
          This is a fictitious website to test and generate data for statistical analysis!{' '}
        </p>

        <OrangeLink to="/">Return to Home</OrangeLink>
      </div>
    </div>
  );
};

export default ThankYou;
