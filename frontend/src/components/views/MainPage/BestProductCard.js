import Card from 'react-bootstrap/Card';
// 전체 라이브러리를 임포트하기보단, 개별 컴포넌트를 임포트해야 성능(용량, 속도)가 좋음
import styled, { css } from 'styled-components';
import CartButton from './CartButton';
import axios from 'axios';
import baseUrl from '../../../url/http';
import { react, useState, useEffect } from 'react';

export default function BestProductCard(props) {
  const [userNo, setUserNo] = useState(0);
  const [productNo, setProductNo] = useState();
  useEffect(() => {
    async function getUser() {
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await axios.get(`${baseUrl}/member/auth/`, {
          headers: { Authorization: `jwt ${access_token}` },
        });
        if (response.data.status === 'success') {
          setUserNo(response.data.user.id);
        }
      } catch (error) {
        console.log('memNO 데이터 : ', error);
      }
    }
    getUser();
  }, []);

  const addtoScrapbook = () => {
    const access_token = localStorage.getItem('access_token');
    setProductNo(`${props.p_no}`);
    console.log(productNo);
    axios
      .post(
        `${baseUrl}/scrapbook/scrapbooklist/`,
        {
          mem_id: userNo,
          p_no: productNo,
        },
        {
          headers: { Authorization: `jwt ${access_token}` },
        }
      )
      .then((response) => {
        console.log(response);
        console.log(response.data.message);
      });
  };

  return (
    <Card
      className="mainCardBody"
      style={{
        display: 'inline-flex',
        justifyContent: 'center',
        // width: 'calc(50% - 9px)',
        width: '160px',
        height: '250px',
        marginLeft: '4.5px',
        marginRight: '4.5px',
        marginBottom: '24px',
        verticalAlign: 'top',
        fontFamily: 'light_p',
        boxShadow: '0 8px 16px 0 rgb(0 0 0 / 30%)',
        border: '2px solid #14a1d9',
        borderRadius: '10px',
      }}
    >
      {/* <Card style={{ styledCard }}> */}
      <Card.Img
        variant="top"
        src={props.p_imgUrl}
        style={{
          height: '100%',
          maxHeight: '150px',
          width: '100%',
          maxWidth: '130px',
          margin: 'auto',
        }}
      />
      <Card.Body
        style={{ padding: '10px', display: 'inline-flex', flexWrap: 'wrap' }}
      >
        <Card.Title
          style={{
            fontSize: '70%',
            float: 'left',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginBottom: '0',
          }}
        >
          <img
            src="/images/icon_img/coin_move.gif"
            style={{
              display: 'inline-flex',
              width: '15px',
              height: 'auto',
              marginLeft: '0.1rem',
              marginRight: '0.3rem',
              marginBottom: '0.2rem',
            }}
          />
          ${props.p_price}
        </Card.Title>
        <Card.Text
          style={{
            fontSize: '80%',
            float: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginTop: '0',
            marginBottom: '0',
          }}
        >
          {props.p_name}
        </Card.Text>
        <Card.Link herf={props.p_toDetail} style={{ flex: '1' }}>
          {/* flex: '1'을 설정해주지 않으면 오른쪽 정렬 불가능함. 주의하기! */}
          <button>
            <img
              src="./images/icon_img/product_cart_white.png"
              style={{
                float: 'right',
                justifyContent: 'flexEnd',
                marginRight: '0',
                marginBottom: '0',
                padding: '0.2rem',
                width: '20%',
                backgroundColor: '#14a1d9',
                borderRadius: '5rem',
              }}
              onClick={() => {
                {
                  if (userNo === 0) {
                    alert('Please login to continue.');
                  } else {
                    alert('The item is added to the scrapbook.');
                    addtoScrapbook();
                  }
                }
              }}
            ></img>
          </button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
