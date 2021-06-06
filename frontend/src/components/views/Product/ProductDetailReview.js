// 리뷰 더보기 버튼의 토글 속성은 위에서 다운 받아서 오자

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../url/http';

import 'tailwindcss/tailwind.css';

const reviewInfoUrl = `${baseUrl}/products/reviewlist/?p_no=B00007GDFV`;

export default function ProductDetailReview() {
  const [reviewInfo, setReviewInfo] = useState([]);

  // API - 개별 상품의 리뷰 정보 받아오기
  useEffect(() => {
    async function getReviewInfo() {
      try {
        // const response = await axios.get(reviewInfoUrl);
        const response = await axios.get('https://randomuser.me/api/');
        if (response.status === 200) {
          setReviewInfo(response.results);
          // 지금은 예시 유알엘임. 고치기
        } else if (response.status === 404) {
          console.log('404 진입' + response);
          alert('Fail to load the review data');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getReviewInfo();
  }, [reviewInfoUrl]);

  return (
    <div>
      <p>This is review component</p>
    </div>
  );
}
