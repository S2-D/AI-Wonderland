import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../url/http';

import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import ProductListCard from '../Product/ProductListCard';

import { Dropdown, DropdownButton } from 'react-bootstrap';
import styledSearch from './styledSearch.css';

export default function SearchPage() {
  // pcategory_code 1: 상의, 2: 하의, 3: 신발, 4: 기타
  const [categoryValue, setCategoryValue] = useState(1);

  // ordering -p_readcount : 조회 순, -p_price : 가격 순, -p_rank : 랭킹 순, -p_date : 등록일 순
  const [orderingValue, setOrderingValue] = useState('-p_readcount');
  const orders = [
    { id: 1, name: 'View Count', value: '-p_readcount' },
    { id: 2, name: 'Amazon Best Sellers Rank', value: '-p_price' },
    { id: 3, name: 'Price: High-Low', value: '-p_rank' },
    // { id: 4,name: 'Price: Low-High', value: '' },
    //  To-do : 차후 api 개발되면 그때 추가하기
    { id: 5, name: 'Newest', value: '-p_date' },
  ];
  const [pageNumber, setPageNumber] = useState(1);

  // 상품 데이터 받아오기
  const productsUrl = `${baseUrl}/products/productlist/?pcategory_code=${categoryValue}&ordering=${orderingValue}&page=${pageNumber}`;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProductList() {
      try {
        setLoading(true);
        // 데이터 받아오기 전 로딩
        const response = await axios.get(productsUrl);
        console.log('상품 데이터 ', response.data.results);
        if (response.status === 200) {
          setProducts(response.data.results);
        } else if (response.status === 404) {
          console.log('404 진입' + response);
          alert('Fail to load the product data');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProductList();
    setLoading(false);
  }, [productsUrl]);

  return (
    <div style={{ paddingBottom: '65px' }}>
      <GNB />
      <div className="flex m-2 justify-center">
        <div className="grid grid-cols-4 gap-1">
          {/* 검색바 */}
          <div className="col-span-4 flex justify-center mt-2 gap-2">
            <div className="search-wrap">
              <div className="search">
                <input
                  type="text"
                  className="searchTerm"
                  placeholder="Item to search"
                ></input>
                <button type="submit" class="searchButton">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-4 flex justify-center mt-2 gap-2">
            <button
              className="product-list-category-btn"
              onClick={() => {
                setCategoryValue(1);
              }}
            >
              Tops
            </button>
            <button
              className="product-list-category-btn"
              onClick={() => {
                setCategoryValue(2);
              }}
            >
              Bottoms
            </button>
            <button
              className="product-list-category-btn"
              onClick={() => {
                setCategoryValue(3);
              }}
            >
              Shoes
            </button>
            <button
              className="product-list-category-btn"
              onClick={() => {
                setCategoryValue(4);
              }}
            >
              Others
            </button>
            <button className="product-list-timegram-btn">Timegram</button>
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
            {products.map((product, idx) => (
              <ProductListCard
                key={idx}
                p_imgUrl={product.p_image}
                p_name={product.p_name}
                p_price={product.p_price}
                p_toDetail={product.p_no}
              />
            ))}
          </div>
        </div>
      </div>
      <Toolbar />
    </div>
  );
}
