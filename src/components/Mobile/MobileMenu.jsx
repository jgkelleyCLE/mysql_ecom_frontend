import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { LuMenu } from 'react-icons/lu';
import { FlexColumn } from '../UI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserAvatar from '../User/UserAvatar';

//user passed in from navbar
const MobileMenu = ({ user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const color = user?.user?.bgColor;

  const mobileMenuLinks = [
    {
      title: 'Tents',
      image:
        'https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/7B487F91B0923473A0EC997E5C904F1F.jpg?alt=media&token=3f343ef4-d389-46ea-9b63-6623589502d5',
    },
    {
      title: 'Tables',
      image: 'https://d2j6dbq0eux0bg.cloudfront.net/images/648178/1143315935.jpg',
    },
    {
      title: 'Chairs',
      image:
        'https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/IMG_0059.jpg?alt=media&token=91cb8946-1828-4f36-9775-dc5d49574d4a',
    },
  ];

  const list = mobileMenuLinks.map((item, index) => (
    <div key={index} className="relative w-full" onClick={() => navigationHandler(item)}>
      <div className="bg-black/40 inset-0 absolute z-20 top-0 left-0 w-full"></div>
      <img alt={item.title} src={item.image} priority className="w-full h-[100px] object-cover z-10 rounded-md" />
      <h1 className="text-white text-2xl font-bold absolute left-2 bottom-0 z-30">{item.title}</h1>
    </div>
  ));

  const navigationHandler = (item) => {
    navigate(`/category/${item.title}`);
    setOpen(false);
  };

  const homeHandler = () => {
    navigate('/');
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden text-white">
        <LuMenu className="text-3xl cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#090c25]">
        <SheetHeader>
          <FlexColumn>
            <Link onClick={homeHandler}>
              <img
                alt="Tentlify Rentals"
                src="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/Tenlify_Logo_Thin_Small.png?alt=media&token=59587449-7b7c-439f-a434-5b4059035b11"
                className="w-[150px]"
              />
            </Link>
          </FlexColumn>
        </SheetHeader>

        <FlexColumn className="gap-2 p-3">
          {list}
          <div
            className="relative w-full"
            onClick={() => {
              navigate('/location');
              setOpen(false);
            }}
          >
            <div className="bg-black/30 inset-0 absolute z-20 top-0 left-0 w-full"></div>
            <img
              alt="Location"
              src="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/Screenshot%202024-09-18%20at%205.35.50%E2%80%AFPM.png?alt=media&token=fa1d7420-d9e9-4189-9597-015c43fc5159"
              className="w-full h-[100px] object-cover z-10 rounded-md"
            />
            <h1 className="text-white text-2xl font-bold absolute left-2 bottom-0 z-30">Location</h1>
          </div>

          <div
            className="relative w-full"
            onClick={() => {
              navigate('/gallery');
              setOpen(false);
            }}
          >
            <div className="bg-black/30 inset-0 absolute z-20 top-0 left-0 w-full"></div>
            <img
              alt="Gallery"
              src="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/View%20recent%20photos.jpg?alt=media&token=ad5e25d9-63f9-43fb-8539-4c2a92004bd0"
              className="w-full h-[100px] object-cover z-10 rounded-md"
            />
            <h1 className="text-white text-2xl font-bold absolute left-2 bottom-0 z-30">Gallery</h1>
          </div>
          {user ? <UserAvatar user={user} open={open} setOpen={setOpen} /> : null}
        </FlexColumn>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
