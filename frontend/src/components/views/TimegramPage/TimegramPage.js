import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../url/http';
import './Timegram.css';

import { Container, Row, Col, Button } from 'react-bootstrap';

import TimegramCard from './TimegramCard.js';
import Toolbar from '../Toolbar/Toolbar';
import Compass from '../GNB/Compass';

function TimegramPage() {
  // ordering -p_readcount : 조회 순, -p_price : 가격 순, -p_rank : 랭킹 순, -p_date : 등록일 순
  const [orderingValue, setOrderingValue] = useState('-p_readcount');
  const orders = [
    { id: 1, name: 'View Count', value: '-p_readcount' },
    { id: 2, name: 'Amazon Best Sellers Rank', value: '-p_price' },
    { id: 3, name: 'Price: High-Low', value: '-p_rank' },
    { id: 4, name: 'Price: Low-High', value: '' },
    { id: 5, name: 'Newest', value: '-p_date' },
  ];

  // 상품 카테고리 받아오기
  const categoryUrl = `${baseUrl}/products/categotylist/`;
  const [categories, setCategories] = useState([]);

  // Timegram
  const timegramUrl = `${baseUrl}/timegram/timegramList/`;
  const [timegrams, setTimegrams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLike, setIsLike] = useState(false);

  async function onClickLike(e) {
    const timegram_id = e.target.id;

    const data = {
      timegram: timegram_id,
    };

    const access_token = localStorage.getItem('access_token');

    try {
      await axios
        .post(baseUrl + '/timegram/like/', data, {
          headers: { Authorization: `jwt ${access_token}` },
        })
        .then((response) => {
          if (response.data.status === 'success') {
            if (isLike) {
              setIsLike(false);
            } else {
              setIsLike(true);
            }
          } else {
            alert(response.data.message);
          }
        });
    } catch (error) {
      if (error.message.slice(-3) == 401) {
        alert('You must be logged in to click the like button!!');
      }
    }
  }

  useEffect(() => {
    async function getCategoriesList() {
      try {
        const response = await axios.get(categoryUrl);

        if (response.status === 200) {
          setCategories(response.data.results);
          getTimegramList();
        } else if (response.status === 404) {
          console.log('404 진입' + response);
          alert('Fail to load the categoty data');
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function getTimegramList() {
      try {
        const response = await axios.get(timegramUrl);

        if (response.status === 200) {
          setTimegrams(response.data.results);
          setLoading(true);
        } else if (response.status === 404) {
          console.log('404 진입' + response);
          alert('Fail to load the timegram data');
        }
      } catch (error) {
        console.log(error);
      }
    }

    getCategoriesList();
  }, [isLike]);

  return (
    <>
      <Compass />
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
                name={category.pcategory_name}
                value={category.pcategory_code}
                onClick={(e) => {
                  console.log(e.target.value);
                }}
                style={{
                  display: 'inline-flex',
                  float: 'center',
                  padding: '5px',
                  listStyle: 'none',
                  height: '26px',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#999',
                }}
              >
                <a href={category.pcategory_code}>{category.pcategory_name}</a>
              </li>
            ))}
            <li
              style={{
                display: 'inline-flex',
                float: 'center',
                padding: '5px',
                listStyle: 'none',
                height: '26px',
                fontSize: '13px',
                fontWeight: '700',
                color: '#999',
              }}
            >
              Timegram
            </li>
          </Col>
        </Row>
        {!loading ? (
          <Row className="justify-content-md-center p-5"></Row>
        ) : (
          <div>
            {timegrams.map((timegram, idx) => (
              <Row
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <hr></hr>
                <TimegramCard
                  key={idx}
                  id={timegram.id}
                  title={timegram.title}
                  p_no1={timegram.p_no1}
                  p_no2={timegram.p_no2}
                  p_no3={timegram.p_no3}
                  p_no4={timegram.p_no4}
                  p_no5={timegram.p_no5}
                  p_no6={timegram.p_no6}
                  total_like={timegram.total_like}
                  total_price={timegram.total_price}
                  mem_id={timegram.mem.id}
                />
                <div className="timegram_title">
                  <span>{timegram.title}</span>
                  <span className="floatR">
                    <img
                      className="flex content-center"
                      src="./images/icon_img/coin_move.gif"
                      className="coin_img"
                      width="35px"
                      style={{ display: 'inline', marginTop: '0px' }}
                    />
                    ${timegram.total_price}
                  </span>
                </div>

                <button
                  id={timegram.id}
                  onClick={onClickLike}
                  type="button"
                  className={isLike ? 'btn_like btn_unlike' : 'btn_like'}
                >
                  <span id={timegram.id} className="img_emoti">
                    좋아요
                  </span>
                  <span id={timegram.id} className="like_span">
                    {' '}
                    +{timegram.total_like} like!
                  </span>
                </button>
              </Row>
            ))}
          </div>
        )}
      </Container>
      <Toolbar />
    </>
  );
}

export default TimegramPage;
