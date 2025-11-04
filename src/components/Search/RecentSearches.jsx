import React from 'react';
import { FlexColStart, FlexColumn, FlexRow } from '../UI';
import PageSpinner from '../Misc/PageSpinner';
import { useNavigate } from 'react-router-dom';
import Time from 'react-time-format';

const RecentSearches = ({ searches, isLoading, isSuccess }) => {
  const navigate = useNavigate();
  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <PageSpinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = searches.slice(0, 10).map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between gap-2 bg-white dark:bg-gray-800 p-2 rounded-md my-1 hover:bg-white/60 dark:hover:bg-gray-900 transition duration-300 cursor-pointer"
        onClick={() => navigate(`/search/${item.search_id}`)}
      >
        <h1 className="flex-[0.5] min-w-0 truncate">"{item.term}"</h1>
        <div className="flex flex-col items-start flex-shrink-0 w-32 ">
          <span className="text-gray-400 italic text-xs">
            <Time value={item.created_at} format="MM/DD/YYYY hh:mm" />{' '}
          </span>
          <FlexRow>
            <div
              style={{ backgroundColor: `${item.bgColor}` }}
              className={`rounded-full w-5 h-5 flex items-center justify-center`}
            >
              <h1 className="text-sm">{item.username.charAt(0)}</h1>
            </div>
            <h1>{item.username}</h1>
          </FlexRow>
        </div>

        <span className="text-gray-400 italic text-xs flex-shrink-0 w-20 text-right">
          {item.results_count} results{' '}
        </span>
      </div>
    ));
  }

  return (
    <div className="bg-gray-200 dark:bg-gray-700 w-full p-2 rounded-md md:w-1/2 h-full">
      <h1 className="text-xl flex dark:text-gray-300 text-gray-700 font-bold items-center gap-2 mb-2">
        10 Most Recent Searches
      </h1>

      {content}

      <button
        onClick={() => navigate('/admin/all-searches')}
        className="bg-sqlBlue dark:bg-sqlBlueHover cursor-pointer hover:bg-sqlBlueHover hover:dark:bg-sqlBlue transition duration-300 text-white w-full mt-1 font-bold p-2 rounded-md"
      >
        View All Searches
      </button>
    </div>
  );
};

export default RecentSearches;
