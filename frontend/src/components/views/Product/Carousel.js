import React, { useRef, useEffect, useState } from 'react';
import baseUrl from '../../../url/http';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.min.css';

import './styledCarousel.css';
import 'tailwindcss/tailwind.css';

//import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import axios from 'axios';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const recommendProductsUrl = `${baseUrl}/products/productTop4List/?pcategory_code=1`;

export default function Carousel() {
  const [recommendProducts, setRecommendProducts] = useState([]);
  useEffect(() => {
    async function getRecommendProducts() {
      try {
        const response = await axios.get(recommendProductsUrl);
        console.log(response.data.data);
        if (response.status === 200) {
          setRecommendProducts(response.data.data);
        } else if (response.status === 404) {
          console.log('404 진입' + response);
          alert('Fail to load the recommend data');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getRecommendProducts();
  }, [recommendProductsUrl]);

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="mySwiper"
      >
        {recommendProducts.map((recommendProduct, idx) => (
          <SwiperSlide
            key={idx}
            className="flex flex-col justify-center p-1 text-xs text-center font-semibold text-gray-700"
          >
            {/* <p>{recommendProduct.p_image}</p> */}
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/51KgzdilYAL.jpg"
              style={{ width: '200px', height: 'auto' }}
            ></img>
            <p className="p-3 mb-0 text-sm" style={{ marginRight: 'auto' }}>
              {recommendProduct.p_brand}
            </p>
            <p
              className="pl-2 pr-2 text-left font-medium"
              style={{ marginRight: 'auto' }}
            >
              {recommendProduct.p_name} hitop shoes this is line by hungry
              developer
            </p>
            <p
              className="pl-3 mb-0 text-sm font-semibold text-gray-600"
              style={{ marginRight: 'auto' }}
            >
              {recommendProduct.p_price}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
