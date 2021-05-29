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

export default function ProductCard(props) {
  return (
    // 카테고리 버튼

    // 정렬 기준

    // 개별 상품
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
        <Card.Title>{props.p_name}</Card.Title>
        <Card.Text>$ {props.p_price}</Card.Text>
        <Card.Link herf={props.p_toDetail}>
          <Cart />
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
