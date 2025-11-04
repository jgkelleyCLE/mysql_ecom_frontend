import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Please enter a search query.');
      return;
    } else {
      navigate(`/search?query=${query}`);
      setQuery('');
    }
  };

  return (
    <div className=" flex items-center justify-center w-[95%] max-w-[600px] ">
      <form className="flex items-center w-full" onSubmit={handleSearchSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search our products..."
          className="p-3 rounded-l-md text-gray-700 placeholder-gray-600 text-2xl bg-white/60 outline-none h-12 z-0 w-[95%]"
        />
        <button type="submit" className="flex items-center gap-2 rounded-r-md bg-white p-4" title="Search">
          <FaSearch className="text-black" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
