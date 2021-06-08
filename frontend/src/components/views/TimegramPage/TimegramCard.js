import Card from 'react-bootstrap/Card';
// 전체 라이브러리를 임포트하기보단, 개별 컴포넌트를 임포트해야 성능(용량, 속도)가 좋음
import React, { useEffect, useState } from 'react';
// 카드 이미지 설정
const imageUrl = 'images/sample.jpg'; // 차후 url 형식으로 바꿔주어야 함

export default function TimegramCard(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const list = [];
    if (props.p_no1 != null) {
      list.push(props.p_no1);
    }
    if (props.p_no2 != null) {
      list.push(props.p_no2);
    }
    if (props.p_no3 != null) {
      list.push(props.p_no3);
    }
    if (props.p_no4 != null) {
      list.push(props.p_no4);
    }
    if (props.p_no5 != null) {
      list.push(props.p_no5);
    }
    if (props.p_no6 != null) {
      list.push(props.p_no6);
    }

    // 조회된 상품이 6개보다 작을경우
    while (list.length < 6) {
      list.push({ p_no: '', p_image: '/images/rabbit_example.jpg' });
    }

    setProducts(list);
  }, []);

  return (
    <div>
      {products.map((product, idx) => (
        <Card
          key={idx}
          style={{
            display: 'inline-flex',
            justifyContent: 'center',
            width: '130px',
            height: '150px',
            marginLeft: '4.5px',
            marginRight: '4.5px',
            marginBottom: '24px',
            verticalAlign: 'top',
          }}
        >
          {product.p_no == '' ? (
            <Card.Img
              variant="top"
              src={product.p_image}
              style={{
                height: '100%',
                maxHeight: '150px',
                width: '100%',
                maxWidth: '130px',
              }}
            />
          ) : (
            <a
              href={`/ProductDetail/${product.p_no}`}
              style={{
                height: '100%',
                maxHeight: '150px',
                width: '100%',
                maxWidth: '130px',
              }}
            >
              <Card.Img
                variant="top"
                src={product.p_image}
                style={{
                  height: '100%',
                  maxHeight: '150px',
                  width: '100%',
                  maxWidth: '130px',
                }}
              />
            </a>
          )}
        </Card>
      ))}
    </div>
  );
}
