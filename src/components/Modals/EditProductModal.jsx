import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGetProductQuery } from '../../redux/productApi';
import { FlexColumn, StyledInput, StyledTextArea } from '../UI';
import PageSpinner from '../Misc/PageSpinner';
import { OrangeButton } from '../Cart/Cart.styles';

const EditProductModal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    price: '',
    status: '',
    category: '',
    tags: '',
  });

  //only fetches if the modal is open
  const { data: product, isLoading, isSuccess, isError, error } = useGetProductQuery(id, {
    skip: !open,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        product: product[0]?.product || '',
        price: product[0]?.price || '',
        status: product[0]?.status || '',
        category: product[0]?.category || '',
        tags: product[0]?.tags || '',
      });
    }
  }, [product]);

  console.log(product);

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <PageSpinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = (
      <form>
        <StyledInput
          className={`disabled:bg-gray-200 dark:disabled:bg-gray-800 cursor-not-allowed`}
          disabled
          value={formData.product}
          onChange={(e) => setFormData({ ...formData, product: e.target.value })}
        />
        <StyledInput
          className={`disabled:bg-gray-200 dark:disabled:bg-gray-800 cursor-not-allowed`}
          disabled
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <StyledInput
          className={`disabled:bg-gray-200 dark:disabled:bg-gray-800 cursor-not-allowed`}
          disabled
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        />
        <StyledInput
          className={`disabled:bg-gray-200 dark:disabled:bg-gray-800 cursor-not-allowed`}
          disabled
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
        <StyledTextArea value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
        <OrangeButton className="-mt-1 w-full">Update</OrangeButton>
      </form>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <p className="text-blue-500">Edit</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? `Edit ${product[0]?.product}` : null}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
