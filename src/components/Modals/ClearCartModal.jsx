import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CancelTrigger, OrangeButton, OrangeTrigger } from '../Cart/Cart.styles';
import { FlexRow } from '../UI';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';

const ClearCartModal = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const clearHandler = () => {
    dispatch(clearCart());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <OrangeTrigger>Clear Quote</OrangeTrigger>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove all items from quote?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
          <FlexRow>
            <CancelTrigger onClick={() => setOpen(false)}>Cancel</CancelTrigger>
            <OrangeButton onClick={clearHandler}>Yes, Clear</OrangeButton>
          </FlexRow>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ClearCartModal;
