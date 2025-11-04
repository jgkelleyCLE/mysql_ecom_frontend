import React from 'react';
import { FlexRow } from '../UI';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserAvatar from '../Auth/UserAvatar';
import UserDropdown from '../Auth/UserDropdown';

const NavLinks = ({ user }) => {
  const location = useLocation();

  return (
    <FlexRow className="gap-4 hidden md:flex">
      <Link to="/" className={`text-xl ${location.pathname === '/' ? 'text-sqlBlueLight' : 'text-white'}`}>
        Home
      </Link>
      <Link
        to="/product"
        className={`text-xl ${
          location.pathname === '/product' || location.pathname.includes('/category')
            ? 'text-sqlBlueLight'
            : 'text-white'
        }`}
      >
        Products
      </Link>
      <Link
        to="/gallery"
        className={`text-xl ${location.pathname === '/gallery' ? 'text-sqlBlueLight' : 'text-white'}`}
      >
        Gallery
      </Link>
      <Link
        to="/location"
        className={`text-xl ${location.pathname === '/location' ? 'text-sqlBlueLight' : 'text-white'}`}
      >
        Location
      </Link>
      <Link to="/admin" className={`text-xl ${location.pathname === '/admin' ? 'text-sqlBlueLight' : 'text-white'}`}>
        Admin
      </Link>
      {/* {user ? (
        
        <UserDropdown user={user} />
      ) : (
        <Link to="/auth" className={`text-xl ${location.pathname === '/auth' ? 'text-sqlBlueLight' : 'text-white'}`}>
          Login
        </Link>
      )} */}
    </FlexRow>
  );
};

export default NavLinks;
