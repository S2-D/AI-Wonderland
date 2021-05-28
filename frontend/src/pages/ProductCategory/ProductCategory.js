// Accordian으로 카테고리 필터 구현하기

// 정렬 조건 : 유저가 정렬 기준 버튼을 누를 때, 그 value 값을 물고 있어야 함
// > 클릭하면 그 물고 있는 값을 url 뒤에 붙여줘서 데이터 받아와주면 됨
// e.target.value = 변수 선언(setStatus로 그때그때 바꿔주면 됨)
// >>> baseurl + products?=변수 => 작업 편하다^0^
// To-do : 로딩 중 화면에 표시하기, 예시 상품 이미지와 가격 이미지 넣어보기,
// 데이터 추가해서 더 보기 버튼(+ 무한 스크롤링)
import React from 'react';
import Product from './ProductCard.js';
import { Container, Row, Col } from 'react-bootstrap';

export default function ProductCategory() {
  return (
    <Container
      fluid
      style={{
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <Row style={{ justifyContent: 'center', padding: '10' }}>
        <Col md="auto" sm="auto" xs="auto">
          <h1>Product List Page</h1>
          <Product />
          <Product />
        </Col>
      </Row>
    </Container>
  );
}
