import React from 'react';
import { Link } from 'react-router-dom';

import styledProductListCard from './styledProductListCard.css';

export default function ProductListCard(props) {
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
          src="/images/intro/rabbit02_nerd.png"
        ></img>
        {props.p_image}
        <section>
          <img
            className="product-list-card-p_price-coin"
            src="/images/icon_img/coin_fixed.png"
          ></img>
          <div className="product-list-card-p_price">$ {props.p_price}</div>
        </section>
        <section className="product-list-card-p_name">{props.p_name}</section>
        <section className="flex justify-end">
          <img
            src="/images/icon_img/product_cart_white.png"
            className="product-list-card-icon"
          ></img>
        </section>
      </Link>
    </div>
  );
}
