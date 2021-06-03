// 1) 상세 레이아웃 - 예시 url로 잡기, 순풍이 공식문서 바로가기 https://tailwindcss.com/docs/justify-content
// 2) 데이터 불러오기 분석 - 페이지 이동 시에 asin 넘버를 어떻게 물고 올 것인지
// 3) 캐러솔 실패하면 끊어서. JS에서도 리스트 저장할 때 슬라이스 가능할 것임
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../url/http';

import 'tailwindcss/tailwind.css';

export default function ProductDetail() {
  const [productInfo, setProductInfo] = useState([]);
  const [reviewInfo, setReviewInfo] = useState([]);
  const [recommendProducts, setRecommendProducts] = useState([]);

  // 데이터 받아오기 아래는 다 예시 url임. 나중에 바꿔야 함.
  // useEffect 안에 setState 3개. 프론트 url에 asin 붙이는 거는 app.js에서 path 뒷부분에 스트링 붙이는 거 찾아보기!
  const productInfoUrl = `${baseUrl}/products/productlist/B00007GDFV/`;
  const reviewInfoUrl = `${baseUrl}/products/reviewlist/?p_no=B00007GDFV`;
  const recommendProductsUrl = `${baseUrl}/products/productTop4List/?pcategory_code=1`;

  // 상품 이미지 설정
  useEffect(() => {
    async function getProductInfo() {
      try {
        const response = await axios.get(productInfoUrl);
        console.log(response.status);
        console.log(response.data);
        if (response.status === 200) {
          setProductInfo(response.data);
        } else if (response.status === 404) {
          console.log('404 진입' + response);
          alert('Fail to load the product data');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProductInfo();
  }, [productInfoUrl]);

  useEffect(() => {
    async function getReviewInfo() {
      try {
        const response = await axios.get(reviewInfoUrl);
        console.log(response.status);
        console.log(response.data);
        if (response.status === 200) {
          setReviewInfo(response.data);
        } else if (response.status === 404) {
          console.log('404 진입' + response);
          alert('Fail to load the product data');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getReviewInfo();
  }, [reviewInfoUrl]);

  useEffect(() => {
    async function getRecommendProducts() {
      try {
        const response = await axios.get(recommendProductsUrl);
        console.log(response.status);
        console.log(response.data);
        if (response.status === 200) {
          setRecommendProducts(response.data);
        } else if (response.status === 404) {
          console.log('404 진입' + response);
          alert('Fail to load the product data');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getRecommendProducts();
  }, [recommendProductsUrl]);

  return (
    // 그리드를 플렉스로 감싸서 가운데 정렬 > 그 안에서 그리드로 레이아웃
    //   전체 박스는 min-max-300이 맞을 듯?
    //   그 안에 이미지는 min-max-250이 맞겠고. width를 고정시키자
    //   flex-flow: column;
    //   https://chlolisher.tistory.com/33
    // 플렉스는 필요한 요소에만 선택적으로 사용하면 될 듯!

    <div className="flex justify-center font-mono">
      <div className="grid grid-cols-6 gap-x-2 gap-y-1 auto-rows-auto max-w-xs">
        {/* 그리드에서는 수평, 수직축의 갭을 구분해서 넣어줄 수 있음 */}
        <div className="col-span-6 bg-blue-400 p-3 rounded">
          <img
            className="max-w-250"
            src="https://images-na.ssl-images-amazon.com/images/I/41Rtah4DGHL.jpg"
            // 지금은 예시 이미지. 나중에 상품 정보에서 꺼내와야 함
          ></img>
        </div>
        <div className="col-span-3 bg-blue-400 p-3 rounded flex justify-start">
          <p className="text-xs font-semibold">{productInfo.p_brand}</p>
        </div>
        <div className="col-span-3 bg-blue-400 p-3 rounded flex justify-end">
          <p className="text-xs">{reviewInfo.count} Reviews</p>
        </div>
        <div className="col-span-6 bg-blue-400 p-3 rounded">
          <p className="text-md font-medium">{productInfo.p_name}</p>
        </div>
        <div className="col-span-6 bg-blue-400 p-3 rounded">
          <p className="text-lg font-semibold">{productInfo.p_price}</p>
        </div>
        <div className="col-span-6 bg-blue-400 p-3 rounded flex justify-center">
          <button
            className="text-xl font-semibold"
            style={{ fontFamily: 'neodgm' }}
          >
            Add to Scrapbook
          </button>
        </div>
        <div className="col-span-6 bg-blue-400 p-3 rounded flex-1 text-xs">
          <p>Category: {productInfo.pcategory_code}</p>
          {/* 조건문으로 돌리기 */}
          <p>Amazon Best Sellers Rank: {productInfo.p_rank}</p>
          <p>ASIN: {productInfo.p_no}</p>
          <p>Date First Available: {productInfo.p_date}</p>
        </div>
        <div className="col-span-6 bg-blue-400 p-3 rounded text-sm">
          <p className="text-md font-semibold">Item Description</p>
          <p>{productInfo.p_description}</p>
          {/* 정인님이 전처리 해주셨으므로 상관 없음 */}
        </div>
        <div className="col-span-6 bg-blue-400 p-3 rounded">
          {/* <p>{productInfo.p_keyword}</p> */}
          가상 키워드 몇 개 배열로 만들어서 돌려야 함 AI Review Analysis -
          Keywords: p_keyword???
        </div>
        <div className="col-span-6 bg-blue-400 p-3 rounded">
          Customers who bought this item also bought
        </div>
        <div className="col-span-6 bg-blue-400 p-3 rounded">캐러셀</div>
        <div className="col-span-2 bg-blue-400 p-3 rounded">유저 아이콘</div>
        <div className="col-span-4 bg-blue-400 p-3 rounded">
          {/* <p>{reviewInfo.results}</p> */}
          This is the title : summary, review_memID: "Darrow H Ankrum II",
        </div>
        <div className="col-span-6 bg-blue-400 p-3 rounded">
          review_content: "mother - in - law wanted it as a present for her
          sister. she liked it and said it would work.", review_date:
          "2013-09-22",
        </div>
        <div className="col-span-6 bg-blue-400 p-3 rounded">
          Load More Reviews(+10) Button
        </div>
      </div>
    </div>
  );
}
