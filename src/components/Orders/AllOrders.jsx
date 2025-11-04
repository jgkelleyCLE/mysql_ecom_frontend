import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetOrdersQuery } from '../../redux/orderApi';
import { FlexColumn } from '../UI';
import PageSpinner from '../Misc/PageSpinner';
import { Link } from 'react-router-dom';
import Time from 'react-time-format';
import OrderStatusSelect from '../Select/OrderStatusSelect';

const AllOrders = () => {
  const { data: orders, isLoading, isSuccess, isError, error } = useGetOrdersQuery();

  let content;

  if (isLoading) {
    content = (
      <TableRow className="flex items-center justify-center w-[90vw]">
        <TableCell className="flex items-center justify-center">
          <PageSpinner />
        </TableCell>
      </TableRow>
    );
  } else if (isSuccess) {
    content = orders?.map((item) => (
      <TableRow key={item.order_id}>
        <TableCell className="font-medium">{item.title}</TableCell>
        <TableCell>
          <Time value={item.created_at} format="MM/DD/YYYY" />
        </TableCell>
        <TableCell>
          <Time value={item.event_date} format="MM/DD/YYYY" />
        </TableCell>
        {/* <TableCell>{item.order_status}</TableCell> */}
        <TableCell>
          <OrderStatusSelect item={item} />
        </TableCell>
        <TableCell className="">
          ${Number(item.total_price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </TableCell>
        <TableCell className="">
          <Link className="underline text-sqlBlueLight" to={`/order/${item.order_id}`}>
            View
          </Link>
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of all orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className="">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{content}</TableBody>
      </Table>
    </div>
  );
};

export default AllOrders;
