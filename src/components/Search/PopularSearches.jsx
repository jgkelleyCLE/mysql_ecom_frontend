import React from 'react';
import { useNavigate } from 'react-router-dom';
import Time from 'react-time-format';
import { FlexColumn, FlexRow } from '../UI';
import PageSpinner from '../Misc/PageSpinner';

const PopularSearches = ({ searches, isLoading, isSuccess }) => {
  const navigate = useNavigate();
  let content;

  const getTopSearchTerms = (searches, limit = 10) => {
    if (!searches || !searches.length) return [];

    // Count occurrences of each search term
    const termCounts = searches.reduce((acc, search) => {
      const term = search.term.toLowerCase();
      acc[term] = (acc[term] || 0) + 1;
      return acc;
    }, {});

    // Convert to array and sort by count (descending)
    const sortedTerms = Object.entries(termCounts)
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return sortedTerms;
  };

  const topSearches = getTopSearchTerms(searches, 10);

  if (isLoading) {
    content = (
      <FlexColumn>
        <PageSpinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = topSearches?.map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between gap-2 bg-white dark:bg-gray-800 p-2 rounded-md my-1 hover:bg-white/60 dark:hover:bg-gray-900 transition duration-300 py-4"
      >
        <h1 className="flex-[0.5] min-w-0 truncate">"{item.term}"</h1>
        <div className="flex flex-col items-start flex-shrink-0 w-32 "></div>

        <span className="text-gray-400 italic text-xs flex-shrink-0 w-20 text-right">{item.count} searches </span>
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

export default PopularSearches;
