import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../url/http.js';

import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import ProductCard from './ProductCard.js';
import dropdown from './dropdown.css';

export default function ProductCategory() {
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
    <Container
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Row
        style={{
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <Col md="auto" sm="auto" xs="auto">
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
                }}
              >
                {order.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>

      <Row
        style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Col
          style={{
            padding: '9px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {products.map((product, idx) => (
            <ProductCard
              key={idx}
              p_imgUrl={product.p_image}
              p_name={product.p_name}
              p_price={product.p_price}
              p_toDetail={product.p_no}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
