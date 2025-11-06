import React from 'react';
import { NavContainer } from './styles.navbar';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import { ModeToggle } from './ModeToggle';
import { FlexRow } from '../UI';
import CartSheet from '../Cart/CartSheet';
import { useSelector } from 'react-redux';
import MobileMenu from '../Mobile/MobileMenu';
import UserDropdown from '../Auth/UserDropdown';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  const location = useLocation();

  return (
    <NavContainer className="absolute top-0 left-0 z-40 w-full">
      <MobileMenu user={user} />
      <Link to="/" className="text-2xl text-white">
        <div className="relative">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/Tenlify_Logo_Thin_Small.png?alt=media&token=59587449-7b7c-439f-a434-5b4059035b11"
            alt="Tentlify Logo"
            className="w-28 md:w-40"
          />
          <img
            src="https://images.icon-icons.com/2415/PNG/512/mysql_plain_wordmark_logo_icon_146415.png"
            className="w-[48px] md:w-[75px] absolute top-2 -right-11 md:-right-17"
          />
        </div>
      </Link>
      <FlexRow>
        <NavLinks user={user} />
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <Link
            to="/auth"
            className={`ml-2 text-xl ${location.pathname === '/auth' ? 'text-sqlBlueLight' : 'text-white'}`}
          >
            Login
          </Link>
        )}

        <ModeToggle />
        <CartSheet />
      </FlexRow>
    </NavContainer>
  );
};

export default Navbar;
