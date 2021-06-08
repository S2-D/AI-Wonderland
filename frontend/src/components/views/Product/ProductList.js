// To-do :
// 1) 컴포넌트 url 변경(나윤님과 합의해 공통 페이지 만들기!) v
// 2) 이미지 조건부 렌더링
// 3) 가격 정렬 api 받아오기
// 4) 로딩 중 표시 추가
// 5) http://localhost:3000/productList/p_category?=Top 로, 링크 붙여주기
// 테일윈드 드랍다운 버튼 있음~! https://tailwindui.com/components/application-ui/elements/dropdowns

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../url/http';

import { Dropdown, DropdownButton } from 'react-bootstrap';
import ProductCard from './ProductCard.js';

export default function ProductList() {
  // pcategory_code 1: 상의, 2: 하의, 3: 신발, 4: 기타
  const [categoryValue, setCategoryValue] = useState(1);
  const categories = [
    { id: 1, name: 'Tops', value: 1 },
    { id: 2, name: 'Bottoms', value: 2 },
    { id: 3, name: 'Shoes', value: 3 },
    { id: 4, name: 'Others', value: 4 },
  ];

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
    // 상품 전체 데이터 받아오기(디폴트 정렬)
    async function getProductList() {
      try {
        setLoading(true);
        // 데이터 받아오기 전 로딩
        const response = await axios.get(productsUrl);
        console.log(response);
        console.log(response.status);
        console.log(response.data.results);
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
    <div>
      {categories.map((category, id) => (
        <li
          key={id}
          name={category.name}
          value={category.value}
          onClick={(e) => {
            setCategoryValue(e.target.value);
            console.log(e.target.value);
          }}
          style={{
            display: 'inline-flex',
            float: 'center',
            // justifyContent: 'space-around',
            padding: '5px',
            listStyle: 'none',
            height: '26px',
            fontSize: '13px',
            fontWeight: '700',
            color: '#999',
          }}
        >
          {category.name}
        </li>
      ))}
      <li
        style={{
          display: 'inline-flex',
          float: 'center',
          // justifyContent: 'space-around',
          padding: '5px',
          listStyle: 'none',
          height: '26px',
          fontSize: '13px',
          fontWeight: '700',
          color: '#999',
        }}
      >
        Timegrame
      </li>
      <DropdownButton
        title="Sort by"
        style={{
          float: 'right',
          padding: '10px',
        }}
        variant="Secondary"
        size="sm"
      >
        {orders.map((order, id) => (
          <Dropdown.Item
            key={id}
            name={order.name}
            value={order.value}
            onClick={(e) => {
              setOrderingValue(order.value);
              // console.log(orderingValue);
              // console.log(order.value);
              // console.log(e.target.value);
              // To-do: 왜 e.target.value로 불러오면 안 되는지, 혹은 뭐가 더 좋은 방법인지 물어보기
            }}
          >
            {order.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      {products.map((product, idx) => (
        <ProductCard
          key={idx}
          p_imgUrl={product.p_image}
          p_name={product.p_name}
          p_price={product.p_price}
          p_toDetail={product.p_no}
        />
      ))}
    </div>
  );
}
