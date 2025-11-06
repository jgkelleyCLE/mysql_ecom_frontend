import React from 'react';
import { FlexColumn, FlexRow } from '../UI';
import PopularSearches from './PopularSearches';
import RecentSearches from './RecentSearches';
import { useGetAllSearchesQuery } from '../../redux/searchApi';
import SearchChart from './SearchChart';

const AdminSearch = () => {
  const { data: searches, isLoading, isSuccess, isError, error } = useGetAllSearchesQuery();

  return (
    <div>
      {isError ? (
        <FlexColumn>
          <p className="mt-6">Error fetching search data: {error?.data?.message}</p>
        </FlexColumn>
      ) : (
        <>
          <SearchChart searches={searches} isLoading={isLoading} isSuccess={isSuccess} />
          <FlexRow className="flex flex-col md:flex-row mt-4">
            <RecentSearches searches={searches} isLoading={isLoading} isSuccess={isSuccess} />
            <PopularSearches searches={searches} isLoading={isLoading} isSuccess={isSuccess} />
          </FlexRow>
        </>
      )}
    </div>
  );
};

export default AdminSearch;
