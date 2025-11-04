import React from 'react';
import { FlexColStart, FlexColumn, FlexRow, PageContainer, PageHeader } from '../components/UI';
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery, useGetOrderItemsQuery } from '../redux/orderApi';
import PageSpinner from '../components/Misc/PageSpinner';
import Time from 'react-time-format';

const OrderDetails = () => {
  const { id } = useParams();

  const { data: order, isLoading, isSuccess, isError, error } = useGetOrderByIdQuery(id);

  console.log(order);

  const { data: orderItems } = useGetOrderItemsQuery(id);

  console.log('ORDER ITEMS: ', orderItems);

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <PageSpinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = (
      <div>
        <FlexColStart className="mx-8 -gap-2">
          {/* <h1 className="text-xl ">{order[0].title}</h1> */}

          <span className="italic">
            Order Date:
            <Time value={order[0].created_at} format="MM/DD/YYYY" />
          </span>
          <span className="italic">
            Event Date:
            <Time value={order[0].event_date} format="MM/DD/YYYY" />
          </span>
          <br />
          <h1>Subtotal: ${order[0]?.subtotal}</h1>
          <h1>Tax: ${order[0]?.tax_price}</h1>
          <h1>Total: ${order[0]?.total_price}</h1>
        </FlexColStart>
      </div>
    );
  }

  return (
    <PageContainer>
      <FlexRow>
        {' '}
        <PageHeader className="text-xl">Order Details - {order ? order[0].title : null}</PageHeader>{' '}
      </FlexRow>
      {content}

      <div>
        {orderItems?.map((item) => (
          <div
            key={item.product_id}
            className="flex flex-row items-center justify-between border-b border-gray-200 p-4 w-11/12 mx-auto"
          >
            <div className="flex flex-row items-center">
              <img src={item.image} alt={item.product} className="w-20 h-20 object-contain" />
              <div className="ml-4">
                <p className="text-md md:text-xl font-bold">{item.product}</p>
                <p className="text-sm italic">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="text-md md:text-xl font-bold">
              ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default OrderDetails;
