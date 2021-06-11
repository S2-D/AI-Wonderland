/* eslint-disable */
// To-do :
// 2) 이미지 조건부 렌더링
// 3) 가격 정렬 api 받아오기
// 4) 로딩 중 표시 추가
// 5) http://localhost:3000/productList/p_category?=Top 로, 링크 붙여주기
// 테일윈드 드랍다운 버튼 있음~! https://tailwindui.com/components/application-ui/elements/dropdowns

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../../url/http';

import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import ProductListCard from './ProductListCard';


import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function ProductList(props) {
  // pcategory_code 1: 상의, 2: 하의, 3: 신발, 4: 기타
  const [categoryValue, setCategoryValue] = useState(1);

  // ordering -p_readcount : 조회 순, -p_price : 가격 순, -p_rank : 랭킹 순, -p_date : 등록일 순
  const [orderingValue, setOrderingValue] = useState('-p_readcount');
  const orders = [
    { id: 1, name: 'View Count', value: '-p_readcount' },
    { id: 2, name: 'Amazon Best Sellers Rank', value: '-p_rank' },
    { id: 3, name: 'Price: High-Low', value: '-p_price' },
    { id: 4, name: 'Price: Low-High', value: 'p_price' },
    { id: 5, name: 'Newest', value: '-p_date' },
  ];
  const [pageNumber, setPageNumber] = useState(1);
  const [productNextPage, setProductNextPage] = useState(1);

  // 상품 데이터 받아오기
  const productsUrl = `${baseUrl}/products/productlist/?pcategory_code=${categoryValue}&ordering=${orderingValue}&page=${pageNumber}`;
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // alert(match.params)
    console.log(props.match.params['categoryValue'])
    const { categoryValue } = props.match.params;
    if (categoryValue === undefined) {
      setCategoryValue(1);
    } else {
      setCategoryValue(categoryValue);
    }
  }, []);

  useEffect(() => {
    async function getProductList() {
      try {
        const response = await axios.get(productsUrl);
        // console.log('상품 데이터 ', response.data);
        if (response.status === 200) {
          setProducts([...products, ...response.data.results]);
          setProductNextPage(response.data.next)
          
        } else if (response.status === 404) {
          console.log('404 진입' + response);
          alert('Fail to load the product data');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProductList();
  }, [productsUrl]);

  useEffect(() => {
    axios
      .get(productsUrl)
      .then((response) => {
        setProducts(response.data.results);
        setProductNextPage(response.data.next)
      });
    // async function getProductList() {
    //   try {
    //     const response = await axios.get(productsUrl);
    //     // console.log('상품 데이터 ', response.data);
    //     if (response.status === 200) {
    //       setProducts(response.data.results);
    //       setProductNextPage(response.data.next)
          
    //     } else if (response.status === 404) {
    //       console.log('404 진입' + response);
    //       alert('Fail to load the product data');
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // getProductList();
  }, [categoryValue]);

  const onClickCallAPIHandler = (e) => {
    e.preventDefault();
    setPageNumber(pageNumber + 1);

  };
  

  return (
    <div style={{ paddingBottom: '65px' }}>
      <GNB />
      <div className="flex m-2 justify-center">
        <div className="grid grid-cols-4 gap-1">
          <div className="col-span-4 flex justify-center mt-2 gap-2">
            <button
              className="product-list-category-btn"
              // onClick={() =>
              //   history.push('/productlist/1')
              // }
              onClick={() => window.location = '/productlist/1'}
            >
              Tops
            </button>
            <button
              className="product-list-category-btn"
              onClick={() => window.location = '/productlist/2'}
              // onClick={() => history.push('/productlist/2')}
            >
              Bottoms
            </button>
            <button
              className="product-list-category-btn"
              // onClick={() =>
              //   history.push('/productlist/3')
              // }
              onClick={() => window.location = '/productlist/3'}
            >
              Shoes
            </button>
            <button
              className="product-list-category-btn"
              // onClick={() => 
              //   history.push('/productlist/4')
              // }
              onClick={() => window.location = '/productlist/4'}
            >
              Others
            </button>
            <button className="product-list-timegram-btn" onClick={() => history.push('/timegram')}>Timegram</button>
          </div>
          <div className="col-span-4 flex justify-end mr-2">
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
            <div className="col-span-5 m-3 flex justify-center">
              {productNextPage === null ? null : (
                  <button
                    type="button"
                    className="bg-purple-600 text-sm text-white font-semibold rounded-lg"
                    style={{
                      fontFamily: 'neodgm',
                      width: '180px',
                      height: '30px',
                    }}
                    onClick={onClickCallAPIHandler}
                  >
                    Load More Items(+20)
                  </button>
                )}
              </div>
        </div>
      </div>
      <Toolbar />
    </div>
  );
}