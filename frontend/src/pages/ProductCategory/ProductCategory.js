import React, { useEffect, useState } from 'react';

import ProductCard from './ProductCard.js';
import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import baseUrl from '../../url/http.js';

import dropdown from './dropdown.css';

export default function ProductCategory() {
  // pcategory_code 1: 상의, 2: 하의, 3: 신발, 4: 기타
  const [categoryValue, setCategoryValue] = useState(1);
  const categories = [
    { name: 'Tops', value: 1 },
    { name: 'Bottoms', value: 2 },
    { name: 'Shoes', value: 3 },
    { name: 'Others', value: 4 },
    { name: 'Timegram', value: 5 },
  ];

  // ordering -p_readcount : 조회 순, -p_price : 가격 순, -p_rank : 랭킹 순, -p_date : 등록일 순
  const [orderingValue, setOrderingValue] = useState('-p_readcount');
  const orders = [
    { value: '-p_readcount' },
    { value: '-p_price' },
    { value: '-p_rank' },
    { value: '-p_date' },
  ];
  const [pageNumber, setPageNumber] = useState(1);

  // 상품 데이터 받아오기
  const [products, setProducts] = useState([]);
  const productsUrl = `${baseUrl}/products/?pcategory_code=${categoryValue}&ordering=${orderingValue}&page=${pageNumber}`;

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
          {categories.map((category, idx) => (
            <li
              key={idx}
              name={category.name}
              value={category.value}
              onClick={(e) => setCategoryValue(e.currentTarget.value)}
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
          <DropdownButton
            title="Sort by"
            style={{
              float: 'right',
              padding: '10px',
            }}
            variant="Secondary"
            size="sm"
          >
            <Dropdown.Item href="#/action-1">View Count</Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              Amazon Best Sellers Rank
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3">Price: High-low</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Price: Low-High</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Newest</Dropdown.Item>
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
          <ProductCard
            p_imgUrl="p_image"
            p_name="p_name"
            p_price="p_price"
            p_toDetail="p_no + 링크 넣기"
          />
        </Col>
      </Row>
    </Container>
  );
}
