import React from 'react';
import { FlexColumn, PageContainer, PageHeader } from '../components/UI';
import UserAvatar from '../components/Auth/UserAvatar';
import { useSelector } from 'react-redux';
import Time from 'react-time-format';
import OrderHistory from './OrderHistory';
import EditUserModal from '../components/User/EditUserModal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      document.title = `${user?.user?.username}'s Profile | Tentlify`;
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <title>{user?.user?.username} | Tentlify</title>
      <PageContainer>
        <PageHeader>Profile</PageHeader>
        <FlexColumn>
          <UserAvatar user={user} />
          <p className="text-2xl">{user?.user?.username}</p>
          <p className="text-gray-400">
            Member since: <Time value={user?.user?.createdAt} format="MM/DD/YYYY" />
          </p>
          <EditUserModal user={user} />
        </FlexColumn>
        <div>
          <OrderHistory />
        </div>
      </PageContainer>
    </>
  );
};

export default Profile;
