import React from 'react';
import { FlexRow } from '../UI';
import PopularSearches from './PopularSearches';
import RecentSearches from './RecentSearches';
import { useGetAllSearchesQuery } from '../../redux/searchApi';
import SearchChart from './SearchChart';

const AdminSearch = () => {
  const { data: searches, isLoading, isSuccess, isError, error } = useGetAllSearchesQuery();

  return (
    <div>
      <SearchChart searches={searches} isLoading={isLoading} isSuccess={isSuccess} />
      <FlexRow>
        <RecentSearches searches={searches} isLoading={isLoading} isSuccess={isSuccess} />
        <PopularSearches searches={searches} isLoading={isLoading} isSuccess={isSuccess} />
      </FlexRow>
    </div>
  );
};

export default AdminSearch;
