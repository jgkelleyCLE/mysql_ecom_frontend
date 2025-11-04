import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyledInput } from '../UI';
import { OrangeButton } from '../Cart/Cart.styles';
import ColorChooser from '../ColorPicker/ColorChooser';
import { useUpdateUserMutation } from '../../redux/userApi';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

const EditUserModal = ({ user }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState('');

  const [updateUser, { data: updateData, isLoading, isSuccess, isError, error }] = useUpdateUserMutation(
    user?.user?.user_id
  );

  const [formData, setFormData] = useState({
    username: '',
    bgColor: color,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.user?.username || '',
        bgColor: color || '',
      });
      setColor(user?.user?.bgColor || '');
    }
  }, [user]);

  // Sync color changes with formData
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      bgColor: color,
    }));
  }, [color]);

  console.log('USER IN EDIT: ', user);

  const submitHandler = (e) => {
    e.preventDefault();

    updateUser({
      id: user?.user?.user_id,
      formData: {
        username: formData.username,
        bgColor: color, // Use the current color state
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      // Update the Redux state with the new user data
      const updatedUser = {
        ...user,
        user: {
          ...user.user,
          username: formData.username,
          bgColor: color,
        },
      };

      dispatch(setUser(updatedUser));
      toast.success('User updated!');
      setOpen(false);
    }

    if (isError) {
      toast.error(`Error updating: ${error?.data?.message}`);
    }
  }, [isSuccess, isError]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-sqlBlue w-32 p-2 rounded-md text-white font-bold cursor-pointer hover:bg-sqlBlueHover transition duration-300">
        <p>Edit</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <StyledInput
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <p>{color}</p>
          <ColorChooser formData={formData} color={color} setColor={setColor} />
          <OrangeButton>Update</OrangeButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
