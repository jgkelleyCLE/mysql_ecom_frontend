import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/userSlice';

const UserDropdown = ({ user }) => {
  const color = user?.user?.bgColor;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          style={{ backgroundColor: color }}
          className=" w-10 h-10 rounded-full flex flex-col items-center justify-center"
        >
          <p className="text-xl text-black">{user?.user?.username?.charAt(0).toUpperCase()}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/orders')}>Order History</DropdownMenuItem>
        <DropdownMenuItem onClick={() => logoutHandler()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
