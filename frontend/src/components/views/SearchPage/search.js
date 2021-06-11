/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import baseUrl from '../../../url/http';

import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import ProductListCard from '../Product/ProductListCard';

import { Dropdown, DropdownButton } from 'react-bootstrap';
import styledSearch from './styledSearch.css';

export default function SearchPage() {
  // ordering -p_readcount : 조회 순, -p_price : 가격 순, -p_rank : 랭킹 순, -p_date : 등록일 순
  const [orderingValue, setOrderingValue] = useState('-p_readcount');
  const orders = [
    { id: 1, name: 'View Count', value: '-p_readcount' },
    { id: 2, name: 'Amazon Best Sellers Rank', value: '-p_rank' },
    { id: 3, name: 'Price: High-Low', value: '-p_price' },
    { id: 4, name: 'Price: Low-High', value: 'p_price' },
    { id: 5, name: 'Newest', value: '-p_date' },
  ];

  // 유저의 검색 키워드 업데이트
  const [searchKeyword, setSearchKeyword] = useState('');
  const onChangeHandler = (event) => {
    setSearchKeyword(event.target.value);
  };
  // 상품 데이터 받아오기
  const searchUrl = `${baseUrl}/products/search/?p_name=${searchKeyword}&ordering=${orderingValue}`;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function getSearchResults() {
      try {
        const response = await axios.get(searchUrl);
        console.log('검색 데이터 ', response.data.results);
        if (response.status === 200) {
          setSearchResults(response.data.results);
        } else if (response.status === 404) {
          console.log('404 진입' + response);
          alert('Fail to load the product data');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getSearchResults();
  }, [searchUrl]);

  const handleSearchSubmit = (e) => {
    console.log(searchKeyword)
    alert(searchKeyword)
  }
  


  return (
    <div style={{ paddingBottom: '65px' }}>
      <GNB />
      <div className="flex m-2 justify-center">
        <div className="grid grid-cols-4 gap-1">
          {/* 검색바 */}
          <div className="col-span-4 flex justify-center mt-2 gap-2">
            <div className="search-wrap">
              <div className="search">
                <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  className="searchTerm"
                  placeholder="Item to search"
                  onChange={onChangeHandler}
                  value={searchKeyword}
                ></input>
                <button type="submit" className="searchButton">
                  <i className="fa fa-search"></i>
                </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-4 flex justify-end mr-5">
            {/* <ProductListDropDown /> */}
            <DropdownButton
              title="Sort by"
              variant="dropdown"
              className="dropdown-btn"
            >
              {orders.map((order, id) => (
                <Dropdown.Item
                  key={id}
                  name={order.name}
                  onClick={(e) => {
                    setOrderingValue(order.value);
                  }}
                >
                  {order.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
          <div className="col-span-4 flex flex-wrap justify-center m-3 gap-2">
            {searchResults.map((searchResult, idx) => (
              <ProductListCard
                key={idx}
                p_imgUrl={searchResult.p_image}
                p_name={searchResult.p_name}
                p_price={searchResult.p_price}
                p_toDetail={searchResult.p_no}
              />
            ))}
          </div>
        </div>
      </div>
      <Toolbar />
    </div>
  );
}
