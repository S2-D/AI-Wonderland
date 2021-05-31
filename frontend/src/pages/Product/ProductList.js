import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../url/http';

import { Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Icon from '@ant-design/icons';

import imgAlt from './imgAlt.jpg';

// 정렬 조건 : 유저가 정렬 기준 버튼을 누를 때, 그 value 값을 물고 있어야 함
// > 클릭하면 그 물고 있는 값을 url 뒤에 붙여줘서 데이터 받아와주면 됨
// e.target.value = 변수 선언 >>> baseurl + products?=변수 => 작업 편하다^0^
// To-do : 로딩 중 화면에 표시하기, 예시 상품 이미지와 가격 이미지 넣어보기, 데이터 추가해서 더 보기 버튼(+ 무한 스크롤링)

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        // 데이터 받아오기 전 로딩 중
        const response = await axios.get(`${baseUrl}/products/productslist/`);
        // console.log(response);
        console.log(response.status);
        console.log(response.data.results);

        if (response.status === 200) {
          setProducts(response.data.results);
        } else if (response.status === 404) {
          console.log('404 진입' + response);
          alert('Fail to load the products list');
        }
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
    setLoading(false);
  }, []);

  // 상품 이미지(p_image), 상품명(p_name), 상품 가격(p_price), 스크랩북 아이콘(이건 포스트로 보내야 함)
  const { Meta } = Card;
  const renderCard = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          key={index}
          style={{ width: '18rem' }}
          cover={<img alt="" src={product.p_image} />}
        >
          <Meta title={product.p_name} description={`$${product.p_price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <>
      <div style={{ width: '75%', margin: '3rem auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>
            Product List Page <Icon type="rocket" />
          </h1>
          {renderCard}
        </div>

        {/* Filter */}

        {/* search */}

        {/* cards */}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button>더보기</button>
        </div>
      </div>
    </>
  );
}
