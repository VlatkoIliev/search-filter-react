import React from 'react';

const SearchFilter = ({ filterBy, handleInput, handleFilter }) => {
  return (
    <div className='search'>
      <h4> Search todos:</h4>
      <input onChange={handleInput} placeholder='Search by title..' />
      <h4> Filter todos:</h4>
      <select value={filterBy} onChange={handleFilter} className='select'>
        <option>All Todos</option>
        <option>Pending Todos</option>
        <option>Completed Todos</option>
      </select>
    </div>
  );
};

export default SearchFilter;
