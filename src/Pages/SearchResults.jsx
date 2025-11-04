import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchProductsQuery } from '../redux/productApi';
import ProductCard from '../components/Products/ProductCard';
import { FlexColumn, GridContainer, PageContainer } from '../components/UI';
import { useEffect } from 'react';
import { useCreateSearchMutation } from '../redux/searchApi';
import { useSelector } from 'react-redux';

const SearchResults = () => {
  const query = decodeURIComponent(useLocation().search.split('=')[1]);

  const user = useSelector((state) => state.auth.user);

  console.log('USER on search: ', user.user.user_id);

  const { data: searchData, isLoading, isSuccess, isError, error } = useSearchProductsQuery(query);

  const [createSearch] = useCreateSearchMutation();

  let content;
  let errorMessage;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    if (searchData?.length === 0 || searchData === undefined) {
      errorMessage = (
        <div className="flex flex-col items-center w-full mt-40">
          <h1 className="text-2xl font-semibold">Sorry, no products match your search</h1>
        </div>
      );
    } else {
      content = searchData?.map((item) => <ProductCard key={item.product_id} item={item} />);
    }
  }

  useEffect(() => {
    if (query && searchData) {
      console.log('SEARCH DATA: ', searchData?.product_id);
      createSearch({
        term: query,
        user_id: user ? user.user.user_id : null,
        results_count: searchData?.length,
        result_ids: searchData?.map((item) => item.product_id),
      });
    }
  }, [query, searchData]);

  return (
    <PageContainer>
      <h1 className="text-3xl mb-2">Search results for "{query}": </h1>
      {errorMessage}
      <FlexColumn>
        <GridContainer>{content}</GridContainer>
      </FlexColumn>
    </PageContainer>
  );
};

export default SearchResults;
