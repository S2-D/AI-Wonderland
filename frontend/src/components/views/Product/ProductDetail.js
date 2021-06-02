// 1) 전체 레이아웃 잡기
// 2) 상세 레이아웃 - 예시 url로 잡기, 순풍이 공식문서 바로가기 https://tailwindcss.com/docs/justify-content
// 3) 데이터 불러오기 분석 - 페이지 이동 시에 asin 넘버를 어떻게 물고 올 것인지
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

  useEffect(() => {
    async function getProductInfo() {
      const response = await axios.get(productInfoUrl);
      console.log(response.data);
    }
  }, []);

  return (
    // 그리드 레이아웃(전체)
    //   전체 박스는 min-max-300이 맞을 듯?
    //   그 안에 이미지는 min-max-250이 맞겠고. width를 고정시키자
    //   flex-flow: column;
    //   https://chlolisher.tistory.com/33
    // 플렉스는 필요한 요소에만 선택적으로 사용하면 될 듯!

    <div className="grid grid-cols-6 gap-x-2 gap-y-4 min-w-full md:min-w-full">
      {/* 그리드에서는 수평, 수직축의 갭을 구분해서 넣어줄 수 있음 */}
      <div className="col-span-6 bg-blue-400 p-3 rounded">
        p_image,
        https://images-na.ssl-images-amazon.com/images/I/41HaQemJWhL._SR38,50_.jpg
      </div>
      <div className="col-span-3 bg-blue-400 p-3 rounded">
        p_brand: "Buxton",
      </div>
      <div className="col-span-3 bg-blue-400 p-3 rounded">
        review_sum_count : ???
      </div>
      <div className="col-span-6 bg-blue-400 p-3 rounded">
        p_name: "Buxton Heiress Pik-Me-Up Framed Case",
      </div>
      <div className="col-span-6 bg-blue-400 p-3 rounded">
        p_price: "$16.95 ",
      </div>
      <div className="col-span-6 bg-blue-400 p-3 rounded">
        Add to Scrapbook Button
      </div>
      <div className="col-span-6 bg-blue-400 p-3 rounded">
        pcategory_code: 1, Amazon Best Sellers Rank: p_rank, ASIN: p_no, Date
        First Available: p_date
      </div>
      <div className="col-span-6 bg-blue-400 p-3 rounded">
        p_description: "['Authentic crunch leather with rich floral embossed
        logo heiress pik-me-up framed case features a large pocket, outside slip
        pocket and outside zipper pocket.']",
      </div>
      <div className="col-span-6 bg-blue-400 p-3 rounded">
        AI Review Analysis - Keywords: p_keyword???
      </div>
      <div className="col-span-6 bg-blue-400 p-3 rounded">
        Customers who bought this item also bought
      </div>
      <div className="col-span-6 bg-blue-400 p-3 rounded">캐러셀</div>
      <div className="col-span-2 bg-blue-400 p-3 rounded">
        Review User's Profile
      </div>
      <div className="col-span-4 bg-blue-400 p-3 rounded">
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
  );
}
