import React from 'react';

import styledProductListCard from './styledProductListCard.css';

export default function ProductListCard() {
  return (
    <div className="product-list-card">
      <img
        className="product-list-card-img"
        src="/images/intro/rabbit02_nerd.png"
      ></img>
      <section>
        <img
          className="product-list-card-p_price-coin"
          src="/images/icon_img/coin_fixed.png"
        ></img>
        <div className="product-list-card-p_price">$ 1,00098</div>
      </section>
      <section className="product-list-card-p_name">
        Product Name It's really really wrong
      </section>
      <section className="flex justify-end">
        <img
          src="/images/icon_img/product_cart.png"
          className="product-list-card-icon"
        ></img>
      </section>
    </div>
  );
}
