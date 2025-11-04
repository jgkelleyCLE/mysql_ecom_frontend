import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const UserAvatar = ({ user, open, setOpen }) => {
  const color = user?.user?.bgColor;
  const navigate = useNavigate();

  const profileHandler = () => {
    navigate('/profile');
    setOpen(false);
  };

  return (
    <div
      onClick={profileHandler}
      className="flex items-center justify-between p-3 w-full border-2 border-white rounded-md cursor-pointer hover:bg-gray-700/50 transition duration-300"
    >
      <div className="flex items-center justify-start gap-2">
        <div style={{ backgroundColor: color }} className={`rounded-full w-8 h-8 flex items-center justify-center`}>
          <h1>{user?.user?.username.charAt(0).toUpperCase()}</h1>
        </div>
        <h1>{user?.user?.username}</h1>
      </div>
      <FaChevronRight />
    </div>
  );
};

export default UserAvatar;
