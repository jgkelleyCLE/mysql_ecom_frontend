import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSearchDetailsQuery } from '../redux/searchApi';
import { FlexColumn, PageContainer, PageHeader } from '../components/UI';
import PageSpinner from '../components/Misc/PageSpinner';

const SearchDetails = () => {
  const { id } = useParams();

  const { data: products, isLoading, isSuccess, isError, error } = useGetSearchDetailsQuery(id);

  console.log('PRODUCTS: ', products);

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <PageSpinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = products?.map((item) => (
      //   <div key={item.product_id} className="flex items-center justify-between m-2">
      //     <div className="flex items-center">
      //       <img className="w-20" src={item.image} alt={item.product} />
      //       <h1>{item.product}</h1>
      //     </div>
      //   </div>
      <div
        key={item.product_id}
        className="flex flex-row items-center justify-between border-b border-gray-200 p-4 w-11/12 mx-auto"
      >
        <div className="flex flex-row items-center">
          <img src={item.image} alt={item.product} className="w-20 h-20 object-contain rounded-md" />
          <div className="ml-4">
            <p className="text-md md:text-xl font-bold">{item.product}</p>
          </div>
        </div>
        <p className="text-md md:text-xl font-bold">
          ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    ));
  }

  return (
    <PageContainer>
      <PageHeader>Search Details ({products?.length})</PageHeader>
      {content}
    </PageContainer>
  );
};

export default SearchDetails;
