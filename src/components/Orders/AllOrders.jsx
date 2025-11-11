import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetOrderItemsQuery, useGetOrdersQuery } from '../../redux/orderApi';
import { FlexColumn } from '../UI';
import PageSpinner from '../Misc/PageSpinner';
import { Link } from 'react-router-dom';
import Time from 'react-time-format';
import OrderStatusSelect from '../Select/OrderStatusSelect';

const AllOrders = () => {
  const { data: orders, isLoading, isSuccess, isError, error } = useGetOrdersQuery();

  const [query, setQuery] = useState('');

  const filteredOrders = orders?.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.order_status.toLowerCase().includes(query.toLowerCase())
    // item.orderItems.some((orderItem) => orderItem.product?.toLowerCase().includes(query.toLowerCase()))
  );

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
    content = filteredOrders?.map((item) => (
      <TableRow key={item.order_id}>
        <TableCell className="font-medium w-24 md:w-auto break-words md:break-normal whitespace-normal">
          {item.title}
        </TableCell>
        <TableCell>
          <Time value={item.created_at} format="MM/DD/YYYY" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Time value={item.event_date} format="MM/DD/YYYY" />
        </TableCell>
        {/* <TableCell>{item.order_status}</TableCell> */}
        <TableCell>
          <OrderStatusSelect item={item} />
        </TableCell>
        <TableCell className="hidden md:table-cell">
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
      <FlexColumn>
        <input
          placeholder="Filter orders by title or status..."
          className="w-11/12 md:w-3/4 border-2 border-sqlBlue p-2 rounded-md mb-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </FlexColumn>
      {isError ? (
        <FlexColumn>
          <p className="mt-6">Error fetching orders: {error?.data?.message}</p>
        </FlexColumn>
      ) : (
        <>
          <Table>
            <TableCaption>A list of all orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24 md:w-auto">Title</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="hidden md:table-cell">Event Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Amount</TableHead>
                <TableHead className="">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{content}</TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default AllOrders;
