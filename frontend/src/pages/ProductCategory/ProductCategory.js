// To-do : 로딩 중 화면에 표시하기, 예시 상품 이미지와 가격 이미지 넣어보기,
// 데이터 추가해서 더 보기 버튼(+ 무한 스크롤링)
import React, { useEffect, useState } from 'react';

import ProductCard from './ProductCard.js';
import { Container, Row, Col, Button } from 'react-bootstrap';
import baseUrl from '../../url/http.js';

export default function ProductCategory() {
  // pcategory_code 1: 상의, 2: 하의, 3: 신발, 4: 기타
  const [categoryValue, setCategoryValue] = useState(1);
  const categories = [
    { name: 'Tops', value: 1 },
    { name: 'Bottoms', value: 2 },
    { name: 'Shoes', value: 3 },
    { name: 'Others', value: 4 },
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
  const productsUrl =
    baseUrl +
    'api/products/productslist/?pcategory_code=' +
    categoryValue +
    '&ordering=' +
    orderingValue +
    '&page=' +
    pageNumber;

  return (
    <Container
      fluid
      style={{
        flexWrap: 'wrap',
        justifyContent: 'center',
        // justifyContent: 'spaceBetween',
      }}
    >
      <Row style={{ justifyContent: 'center', padding: '10' }}>
        <Col md="auto" sm="auto" xs="auto">
          {/* 카테고리 버튼 */}
          {categories.map((category, idx) => (
            <Button
              key={idx}
              variant="outline-primary"
              size="sm"
              // style={{ justifyContent: 'center', padding: '10' }}
              name={category.name}
              value={category.value}
              onChange={(e) => setCategoryValue(e.currentTarget.value)}
            >
              {category.name}
            </Button>
          ))}

          {console.log(categoryValue)}

          <ProductCard
            p_imgUrl="p_image"
            p_name="p_name"
            p_price="p_price"
            p_toDetail="p_no + 링크 넣기"
          />
          <ProductCard />
        </Col>
      </Row>
    </Container>
  );
}
