import React from 'react';
import axios from 'axios';

function SearchPage() {
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="please enter the keyword or anything!"
          name="search"
        />
        <button type="submit">검색</button>
      </div>
    </>
  );
}

export default SearchPage;
