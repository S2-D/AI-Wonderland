import React, { useState } from 'react';
import useBookSearch from './useBookSearch';
// 1) npm i axios로 api 가져오기

function InfiniteScrolling() {
  const [query, setQuery] = useState('');
  const [pageNumber, setpageNumber] = useState(1);

  function handleSearch(e) {
    setQuery(e.target.value);
    setpageNumber(1);
  }

  useBookSearch(query, pageNumber);

  return (
    <>
      <input type="text" onChange={handleSearch}></input>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Lording...</div>
      <div>Error</div>
    </>
  );
}

export default InfiniteScrolling;
