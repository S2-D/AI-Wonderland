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
  const [category, setCategory] = useState([]);

  // 데이터 받아오기 아래는 다 예시 url임. 나중에 바꿔야 함.
  // useEffect 안에 setState 3개. 프론트 url에 asin 붙이는 거는 app.js에서 path 뒷부분에 스트링 붙이는 거 찾아보기!
  const productInfoUrl = `${baseUrl}/products/productlist/B00007GDFV/`;
  const categoryUrl = `${baseUrl}/products/categotylist/${category}/`;
  const reviewInfoUrl = `${baseUrl}/products/reviewlist/?p_no=B00007GDFV`;
  const recommendProductsUrl = `${baseUrl}/products/productTop4List/?pcategory_code=1`;

  const userKeyWords = ['young', 'worm', 'wool', 'wonderful', 'withy']; // 예시 배열임. 나중에 꼭 지우기(To-do)
  // const userKeyWords = []; // 예시 배열임. 나중에 꼭 지우기(To-do)
  // const nlpDescription = [
  //   "Beautifully rendered, heartbreakingly adorab, item description example sentences this is amoomal deajanchi janchihanikka I'm hungry, but the train goes on. I like the song 'Ms little perfect' haha.",
  // ];
  const nlpDescription = []; // 예시 배열임. 나중에 꼭 지우기(To-do)
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
          alert('Fail to load the review data');
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
          alert('Fail to load the recommend data');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getRecommendProducts();
  }, [recommendProductsUrl]);

  // useEffect(() => {
  //   async function getCategory() {
  //     try {
  //       const response = await axios.get(categoryUrl);
  //       console.log(response.status);
  //       console.log(response.data);
  //       if (response.status === 200) {
  //         setCategory(response.data);
  //       } else if (response.status === 404) {
  //         console.log('404 진입' + response);
  //         alert('Fail to load the category data');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getCategory();
  // }, [categoryUrl]);

  return (
    // 그리드를 플렉스로 감싸서 가운데 정렬 > 그 안에서 그리드로 레이아웃
    //   전체 박스는 min-max-300이 맞을 듯?
    //   그 안에 이미지는 min-max-240이 맞겠고. width를 고정시키자
    //   flex-flow: column;
    <div className="flex my-4 justify-center font-mono">
      <div className="flex flex-col gap-3 justify-center">
        <div
          className="grid grid-cols-2 gap-x-2 gap-y-1 p-1 auto-rows-auto shadow-sm"
          style={{
            maxWidth: '310px',
            height: 'auto',
          }}
        >
          {/* 그리드에서는 수평, 수직축의 갭을 구분해서 넣어줄 수 있음 */}
          <div className="col-span-2 p-4 flex justify-center">
            <img
              style={{
                maxWidth: '240px',
                height: 'auto',
              }}
              src="https://images-na.ssl-images-amazon.com/images/I/41Rtah4DGHL.jpg"
              // 지금은 예시 이미지. 나중에 상품 정보에서 꺼내와야 함
            ></img>
          </div>
          <div className="col-span-1 pl-3 flex justify-start">
            <p className="text-sm font-semibold">{productInfo.p_brand}</p>
          </div>
          <div className="col-span-1 pr-3 flex justify-end">
            <p className="text-sm">{reviewInfo.count} Reviews</p>
          </div>
          <div className="col-span-2 p-3">
            <p className="text-md font-medium">{productInfo.p_name}</p>
          </div>
          <div className="col-span-2 pl-4 text-lg font-semibold">
            <img
              className="flex content-center"
              src="./images/icon_img/coin_move.gif"
              className="coin_img"
              width="35px"
              style={{ display: 'inline', marginTop: '0px' }}
            />
            {productInfo.p_price}
          </div>
          <div className="col-span-2 p-3 flex justify-center">
            <button
              type="button"
              className="bg-purple-700 hover:bg-purple-800 text-xl text-white font-semibold rounded-lg"
              style={{
                fontFamily: 'neodgm',
                width: '270px',
                height: '35px',
              }}
            >
              Add to Scrapbook
              {/* onClick 시 alert 노출되고, api에 post 요청이 가도록 설계해야 함 */}
            </button>
          </div>
        </div>
        <div
          className="shadow-sm py-2 px-3 text-xs font-medium"
          style={{
            maxWidth: '310px',
            // height: 'auto',
          }}
        >
          <p className="p-1">Sub-Category: {productInfo.pcategory_code}</p>
          {/* 카테고리 연동 어떻게 하지..? */}
          <p className="p-1">
            Amazon Best Sellers Rank: 441908
            {/* {productInfo.p_rank} */}
          </p>
          <p className="p-1">ASIN: {productInfo.p_no}</p>
          <p className="p-1">Date First Available: {productInfo.p_date}</p>
        </div>
        <div
          className="shadow-sm py-2 px-3"
          style={{
            maxWidth: '310px',
            height: 'auto',
          }}
        >
          <p className="flex p-1 text-sm font-semibold">Item Description</p>

          {nlpDescription.length > 0 ? (
            <p className="p-1 text-xs text-justify font-medium">
              nlpDescription
            </p>
          ) : (
            <p className="flex flex-wrap justify-center p-1 text-xs text-center font-semibold text-gray-500">
              <img
                src="./images/rabbit_example.jpg"
                className="rounded-3xl m-4"
                style={{ width: '200px' }}
              />
              Okay, our database does not have this detail about the item.
              <br></br> But it does not mean that it is forever lost!
              <button
                type="button"
                className="bg-purple-500 hover:bg-purple-800 m-3 text-md text-white font-semibold rounded-lg"
                style={{
                  fontFamily: 'neodgm',
                  width: '200px',
                  height: '35px',
                }}
                onClick={() => {
                  alert('Traveling through Time & Restoring Data');
                  // 토글 스테이터스를 하나 만들면 됨...
                  return (
                    <p>
                      Awesome nlp text. This is amoomal deajanchi again, I'm so
                      happy but tired at the same time. Let's go traveling. I
                      don't know if this spelling is wright but I don't xx care.
                    </p>
                  );
                }}
              >
                Let's do the time warp again
              </button>
            </p>
          )}

          {/* {productInfo.p_description} */}
        </div>
        <div
          className="shadow-sm py-2 px-3 text-md font-medium"
          style={{
            maxWidth: '310px',
            height: 'auto',
          }}
        >
          {/* 상품 인포 2 */}
          <p className="pl-1 pt-1 pb-3 text-sm font-semibold">
            AI Review Analysis
          </p>
          <div className="inline-flex flex-wrap justify-center gap-x-3 gap-y-2">
            {userKeyWords.length > 0 ? (
              userKeyWords.map((keyWord, idx) => (
                <div
                  key={idx}
                  className="rounded-xl text-sm py-2 px-3 bg-purple-500"
                  style={{ fontFamily: 'neodgm', color: 'white' }}
                >
                  {keyWord}
                </div>
              ))
            ) : (
              <div>
                <p className="p-1 text-xs text-justify font-medium">
                  Oh No! There is insufficient data for the AI to analyze.
                </p>
              </div>
            )}
          </div>
          {/* <p>{productInfo.p_keyword}</p> */}
        </div>
      </div>
    </div>
  );
}
