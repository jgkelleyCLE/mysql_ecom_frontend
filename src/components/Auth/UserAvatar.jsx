import React from 'react';

const UserAvatar = ({ user }) => {
  const color = user?.user?.bgColor;
  return (
    <div
      style={{ backgroundColor: color }}
      className=" w-32 h-32 rounded-full flex flex-col items-center justify-center"
    >
      <p className="text-6xl">{user?.user?.username?.charAt(0).toUpperCase()}</p>
    </div>
  );
};

export default UserAvatar;
