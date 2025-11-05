import React from 'react';
import { FlexColumn, PageContainer, PageHeader } from '../components/UI';
import { useGetAllSearchesQuery } from '../redux/searchApi';
import PageSpinner from '../components/Misc/PageSpinner';

const AllSearches = () => {
  const { data: searches, isLoading, isSuccess, isError, error } = useGetAllSearchesQuery();

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <PageSpinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = searches?.map((item, index) => (
      <a
        href={`/search/${item.search_id}`}
        key={item.search_id}
        className="flex items-center justify-between gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md my-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-300 line-clamp-1"
        aria-label="View search details"
      >
        <h1>"{item.term}"</h1>
        <span className="text-gray-400 italic text-xs sm:hidden">{new Date(item.created_at).toLocaleDateString()}</span>
        <span className="text-gray-400 italic text-xs hidden sm:inline ">
          {new Date(item.created_at).toLocaleString()}
        </span>
        <h1>{item.results_count} results</h1>
      </a>
    ));
  }

  return (
    <>
      <title>Search History | SQL Rentals</title>
      <PageContainer>
        <PageHeader>All Searches</PageHeader>
        <div className="mx-8">{content}</div>
      </PageContainer>
    </>
  );
};

export default AllSearches;
