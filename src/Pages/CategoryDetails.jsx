import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from '../redux/productApi';
import { CategoryGrid, FlexColumn, PageContainer, PageHeader } from '../components/UI';
import PageSpinner from '../components/Misc/PageSpinner';
import ProductCard from '../components/Products/ProductCard';

const CategoryDetails = () => {
  const { Category } = useParams();

  // Decode the URL parameter
  const decodedCategory = Category ? decodeURIComponent(Category) : 'Products';

  const { data: products, isLoading, isSuccess, isError, error } = useGetProductsByCategoryQuery(Category);

  // Fallback: manually set document title
  useEffect(() => {
    document.title = `${decodedCategory} | SQL Rentals`;
  }, [decodedCategory]);

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <PageSpinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = products?.map((item) => <ProductCard key={item.product_id} item={item} />);
  }

  return (
    <>
      <title>{decodedCategory ? decodedCategory : 'Tentlify'} | SQL Rentals</title>
      <PageContainer>
        <PageHeader>{Category}</PageHeader>
        {isError ? (
          <FlexColumn>
            <p className="md:text-xl italic mt-6 mx-8">
              Error fetching {Category}: {error?.data?.message}
            </p>
          </FlexColumn>
        ) : null}
        <CategoryGrid>{content}</CategoryGrid>
      </PageContainer>
    </>
  );
};

export default CategoryDetails;
