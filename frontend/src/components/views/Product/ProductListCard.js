/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../../url/http';
import styledProductListCard from './styledProductListCard.css';


export default function ProductListCard(props) {
  
  const access_token = localStorage.getItem('access_token');
  
  const onClickAddHandler = (e) => {
    e.preventDefault();
    // alert(e.target.dataset.id)

  const body = {
    p_no: e.target.dataset.id
  };

  console.log('post 값 ', body);
    
  axios
    .post(baseUrl + '/scrapbook/scrapbooklist/', body, {
      headers: {
        Authorization: `jwt ${access_token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      alert('Item Added');
    })
    .catch((error) => {
      console.log(error.response);
      console.log(error.request);
    });
  };

  return (
    <div className="product-list-card">
      <Link
        to={`/product_detail/${props.p_toDetail}`}
        style={{
          // display: 'inline-flex',
          margin: '0px',
          textDecoration: 'none',
        }}
      >
        {props.p_todetail}
        <img
          className="product-list-card-img"
          src={props.p_imgUrl}
        ></img>
        {/* {props.p_image} */}
        <section>
          <img
            className="product-list-card-p_price-coin"
            src="/images/icon_img/coin_fixed.png"
          ></img>
          <div className="product-list-card-p_price">$ {props.p_price}</div>
        </section>
        <section className="product-list-card-p_name">{props.p_name}</section>
        </Link>
        <section className="flex justify-end">
          <img
            src="/images/icon_img/product_cart_white.png"
            className="product-list-card-icon"
            data-id={props.p_toDetail}
            onClick={onClickAddHandler}
          ></img>
        </section>
    </div>
  );
}