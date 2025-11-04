import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

export const OrangeButton = tw.button`
    bg-sqlBlue 
    hover:bg-sqlBlueHover
    p-2
    px-6
    rounded-md 
    text-white 
    transition 
    duration-300
    mt-4
    font-bold
    cursor-pointer
`;

export const OrangeTrigger = tw.div`
    bg-sqlBlue
    hover:bg-sqlBlueHover
    p-2
    px-6
    rounded-md 
    text-white 
    transition 
    duration-300
    mt-1
    font-bold
    cursor-pointer
`;

export const CancelTrigger = tw.div`
     bg-gray-400
    hover:bg-gray-500
    p-2
    px-6
    rounded-md 
    text-white 
    transition 
    duration-300
    mt-4
    font-bold
    cursor-pointer
`;

export const OrangeLink = tw(Link)`
    bg-sqlBlue
    hover:bg-sqlBlueHover
    p-2
    px-6
    rounded-md 
    text-white 
    transition 
    duration-300
    font-bold
    mt-8
`;

export const CartCard = tw.div`
    flex 
    items-center 
    justify-between 
    p-2 
    shadow-md 
    shadow-black/20
    dark:bg-gray-800
    bg-gray-100
    w-full
    rounded-md 
    my-2
`;

export const QuantityContainer = tw.div`
    flex 
    items-center 
    gap-2
`;

export const MinusIcon = tw(FiMinusCircle)`
    cursor-pointer
    text-xl
`;

export const PlusIcon = tw(FiPlusCircle)`
    cursor-pointer
    text-xl
`;
