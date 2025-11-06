import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageSpinner from '../Misc/PageSpinner';
import Time from 'react-time-format';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSelector } from 'react-redux';
import { useGetUserOrdersQuery } from '../../redux/orderApi';
import { Link } from 'react-router-dom';

const OrderHistoryTable = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const { data: orders, isLoading, isSuccess, isError, error } = useGetUserOrdersQuery(user?.user?.user_id);

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
      {isError ? (
        <FlexColumn>
          <p className="mt-6">Error fetching orders: {error?.data?.message}</p>
        </FlexColumn>
      ) : (
        <Table>
          <TableCaption>A list of all your orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Title</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Event Date</TableHead>

              <TableHead className="">Amount</TableHead>
              <TableHead className="">Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.length === 0 ? (
              <h1 className="mt-6 md:text-xl italic">You have not placed any orders yet.</h1>
            ) : (
              content
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OrderHistoryTable;
