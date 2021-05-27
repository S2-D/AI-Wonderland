import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../url/http';
import { Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';

import Icon from '@ant-design/icons';
// 정렬 조건 : 유저가 정렬 기준 버튼을 누를 때, 그 value 값을 물고 있어야 함
// > 클릭하면 그 물고 있는 값을 url 뒤에 붙여줘서 데이터 받아와주면 됨
// e.target.value = 변수 선언 >>> baseurl + products?=변수 => 작업 편하다^0^
let loaded = false;

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // axios.get(baseUrl + '/products/productslist/')
    if (!loaded) {
      axios
        .get('http://localhost:5000/productslist')
        .then((response) => {
          console.log(response.status);

          if (response.status === 200) {
            console.log(response.data[0].results);
            setProducts(response.data[0].results);
            loaded = true;
          } else if (response.status === 404) {
            console.log('404 진입 ' + response);
            alert('상품 정보 로딩에 실패했습니다.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
  return (
    <>
      <div style={{ width: '75%', margin: '3rem auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>
            Product List Page <Icon type="rocket" />
          </h1>
        </div>

        {/* Filter */}

        {/* search */}

        {/* cards */}

        <Card>
          <Meta />
        </Card>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button>더보기</button>
        </div>
      </div>
    </>
  );
}
