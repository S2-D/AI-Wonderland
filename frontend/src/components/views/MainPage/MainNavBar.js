import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../url/http';
import { useHistory } from 'react-router-dom';

import Toolbar from '../Toolbar/Toolbar';

export default function ProductList() {
  const history = useHistory();

  return (
    <div>
      <div className="flex m-2 justify-center">
        <div className="grid grid-cols-4 gap-1">
          <div className="col-span-4 flex justify-center mt-2 gap-2">
            <button
              className="product-list-category-btn"
              onClick={() => {
                history.push({
                  pathname: '/productList',
                  state: { categoryValue: 1 },
                });
              }}
            >
              Tops
            </button>
            <button
              className="product-list-category-btn"
              onClick={() => {
                history.push({
                  pathname: '/productList',
                  state: { categoryValue: 2 },
                });
              }}
            >
              Bottoms
            </button>
            <button
              className="product-list-category-btn"
              onClick={() => {
                history.push({
                  pathname: '/productList',
                  state: { categoryValue: 3 },
                });
              }}
            >
              Shoes
            </button>
            <button
              className="product-list-category-btn"
              onClick={() => {
                history.push({
                  pathname: '/productList',
                  state: { categoryValue: 4 },
                });
              }}
            >
              Others
            </button>
            <button
              className="product-list-timegram-btn"
              onClick={() => {
                history.push({
                  pathname: '/timegram',
                });
              }}
            >
              Timegram
            </button>
          </div>
        </div>
      </div>
      <Toolbar />
    </div>
  );
}
