import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { useUpdateStatusMutation } from '../../redux/productApi';

const ProductStatusSelect = ({ item }) => {
  const statuses = ['Active', 'Inactive'];

  const [updateStatus, { data: updateData, isLoading, isSuccess, isError, error }] = useUpdateStatusMutation(
    item.product_id
  );

  const statusHandler = (productId, newStatus) => {
    console.log(productId, newStatus);
    updateStatus({ id: productId, status: newStatus });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${item.product} is now ${item.status}!`);
    }

    if (isError) {
      toast.error(`Error updating status: ${error}`);
    }
  }, [isSuccess, isError]);

  return (
    <select
      value={item.status}
      onChange={(e) => statusHandler(item.product_id, e.target.value)}
      className="border-2 bg-white dark:bg-gray-700 border-gray-300 rounded-md px-1"
    >
      {statuses.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default ProductStatusSelect;
