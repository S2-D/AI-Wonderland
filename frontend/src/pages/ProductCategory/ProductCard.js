import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GrCart } from 'react-icons/gr';

// 전체 라이브러리를 임포트하기보단, 개별 컴포넌트를 임포트해야 성능(용량, 속도)가 좋음
import styled, { css } from 'styled-components';

// 카드 이미지 설정
const imageUrl = 'image/sample.jpg'; // 차후 url 형식으로 바꿔주어야 함

const Cart = styled(GrCart)`
  color: blue;
  transform: scale(1.5);
  float: right;
`;

export default function ProductCard() {
  return (
    <Card style={{ width: '18rem' }}>
      {/* <Card style={{ styledCard }}> */}
      <Card.Img
        variant="top"
        src={imageUrl}
        style={{
          display: 'block',
          marginTop: '25px',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: 'auto',
          maxHeight: '200px',
          width: 'auto',
          maxWidth: '200px',
        }}
      />
      <Card.Body>
        <Card.Title>Envirosax Kids Series Jessie & Lulu</Card.Title>
        <Card.Text>$ 500,000</Card.Text>
        <Card.Link herf="#">
          <Cart />
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
