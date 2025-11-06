import React from 'react';
import { FlexColumn, FlexRow, PageContainer, PageHeader } from '../components/UI';
import { useSelector } from 'react-redux';
import { useGetUserOrdersQuery } from '../redux/orderApi';
import PageSpinner from '../components/Misc/PageSpinner';
import Time from 'react-time-format';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import OrderHistoryTable from '../components/Orders/OrderHistoryTable';

const OrderHistory = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  const { data: orders, isLoading, isSuccess, isError, error } = useGetUserOrdersQuery(user?.user?.user_id);

  console.log(orders);

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <PageSpinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = orders?.map((item, index) => (
      <React.Fragment key={item.order_id}>
        <div
          className="flex items-center justify-between p-4  w-11/12 dark:hover:bg-gray-800 hover:bg-gray-100 transition duration-300 cursor-pointer rounded-md"
          onClick={() => navigate(`/order/${item.order_id}`)}
        >
          <h1>{item.title}</h1>
          <h2>
            ${Number(item.total_price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <h2>
            Created: <Time value={item.created_at} format="MM/DD/YYYY" />
          </h2>

          <h2>
            Event: <Time value={item.event_date} format="MM/DD/YYYY" />
          </h2>
        </div>
        {index !== orders.length - 1 && <hr className="w-11/12 border-gray-300" />}
      </React.Fragment>
    ));
  }

  return (
    <>
      <title>Order History | SQL Rentals</title>
      <PageContainer>
        <FlexRow>
          <PageHeader>Order History</PageHeader>
        </FlexRow>
        {/* <FlexColumn>
          {orders?.length === 0 ? (
            <h1 className="mt-6 md:text-xl italic">You have not placed any orders yet.</h1>
          ) : (
            content
          )}
        </FlexColumn> */}
        <div className="w-11/12 mx-auto">
          <OrderHistoryTable />
        </div>
      </PageContainer>
    </>
  );
};

export default OrderHistory;
