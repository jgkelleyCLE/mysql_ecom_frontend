import React from 'react';
import { toast } from 'sonner';
import { useUpdateOrderStatusMutation } from '../../redux/orderApi';
import { useEffect } from 'react';

const OrderStatusSelect = ({ item }) => {
  const statuses = ['Quote', 'Reservation', 'Delivered', 'Closed', 'Cancelled'];

  const [updateStatus, { data: updateData, isLoading, isSuccess, isError, error }] = useUpdateOrderStatusMutation(
    item.order_id
  );

  const statusHandler = (id, newStatus) => {
    updateStatus({ id, status: newStatus });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${item.title} changed to ${item.order_status}`);
    }

    if (isError) {
      toast.error('Error changing order status!');
    }
  }, [isSuccess, isError]);

  return (
    <select
      value={item.order_status}
      onChange={(e) => statusHandler(item.order_id, e.target.value)}
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

export default OrderStatusSelect;
