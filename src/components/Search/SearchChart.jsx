import React from 'react';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const SearchChart = ({ searches, isLoading, isSuccess }) => {
  const getTopSearchTerms = (searches) => {
    if (!searches || !searches.length) return [];

    // Count occurrences of each search term
    const termCounts = searches.reduce((acc, search) => {
      const term = search.term.toLowerCase(); // Normalize to lowercase
      acc[term] = (acc[term] || 0) + 1;
      return acc;
    }, {});

    // Convert to array and sort by count (descending)
    const sortedTerms = Object.entries(termCounts)
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    return sortedTerms;
  };

  const topSearches = getTopSearchTerms(searches);

  return (
    <>
      Search Chart
      <ResponsiveContainer width={'100%'} height={300}>
        <BarChart data={topSearches}>
          <XAxis dataKey="term" />
          <YAxis />
          <Tooltip labelStyle={{ color: 'red' }} contentStyle={{ borderRadius: 10 }} />
          {/* <Bar dataKey="count" fill="#8884d8" /> */}
          <Bar dataKey="count" fill="#00618a" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default SearchChart;
