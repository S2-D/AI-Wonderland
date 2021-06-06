// 1) 데이터 불러오기 분석 - 페이지 이동 시에 asin 넘버를 어떻게 물고 올 것인지
// 2) 추천 아이템 연결 - 상품 넘버 연결 필요 (Link to 미작동 문제 해결해야 함)
// 4) 리뷰 데이터 로드 -> 그냥 펑션 따로 빼서 하면 편할 듯 > 이거 버튼 클릭할 때마다다 response.data = 기존 response.data + 새 reponse.data 해주면 됨
// 5) 리뷰 클릭 시 이동 > ref 사용해서 구현

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../url/http';
import Carousel from './Carousel';

import 'tailwindcss/tailwind.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const productInfoUrl = `${baseUrl}/products/productlist/B00007GDFV/`;
const reviewInfoUrl = `${baseUrl}/products/reviewlist/?p_no=B00007GDFV`;

const userKeyWords = ['young', 'worm', 'wool', 'wonderful', 'withy']; // api 완성 전 예시 배열임. 나중에 꼭 지우기(To-do)
// const userKeyWords = []; // api 완성 전 예시 배열임. 나중에 꼭 지우기(To-do)
const itemDescription = []; // api 완성 전 예시 배열임. 나중에 꼭 지우기(To-do)
const nlpDescription = [
  "Beautifully rendered, heartbreakingly adorab, item description example sentences this is amoomal deajanchi janchihanikka I'm hungry, but the train goes on. I like the song 'Ms little perfect' these day. I'm not sure if this paragraph's grammer is right though.",
];

export default function ProductDetail() {
  const [productInfo, setProductInfo] = useState([]);
  const [reviewInfo, setReviewInfo] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [userNo, setUserNo] = useState(0);
  const [onToggle, setOnToggle] = useState(false);
  // 데이터 받아오기 아래는 다 예시 url임. 나중에 바꿔야 함.
  // useEffect 안에 setState 3개. 프론트 url에 asin 붙이는 거는 app.js에서 path 뒷부분에 스트링 붙이는 거 찾아보기!

  // API - 개별 상품 정보 받아오기
  useEffect(() => {
    async function getProductInfo() {
      try {
        const response = await axios.get(productInfoUrl);
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

  // API - 로그인 유저 정보 받아오기
  useEffect(() => {
    async function getUser() {
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await axios.get(`${baseUrl}/member/auth/`, {
          headers: { Authorization: `jwt ${access_token}` },
        });
        if (response.data.status === 'success') {
          console.log(response.data);
          setUserNo(response.data.user.id);
          setAccessToken(access_token);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  // API - 개별 상품의 리뷰 정보 받아오기
  useEffect(() => {
    async function getReviewInfo() {
      try {
        const response = await axios.get(reviewInfoUrl);
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

  // API - 로그인 유저의 스크랩북에 상품 추가하기
  const addtoScrapbook = () => {
    axios
      .post(
        `${baseUrl}/scrapbook/scrapbooklist/`,
        {
          mem_id: userNo,
          p_no: 'B000072XRF',
        },
        {
          headers: {
            Authorization: `jwt ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        console.log(response.data.message);
      });
  };

  return (
    <div className="flex my-4 justify-center font-mono">
      <div className="flex flex-col gap-3 justify-center">
        {/* 상품 정보 (1) - 이미지, 브랜드, 리뷰 수, 상품명, 가격, 스크랩북에 추가 */}
        <div
          className="grid grid-cols-2 gap-x-2 gap-y-1 p-1 auto-rows-auto shadow-sm"
          style={{
            maxWidth: '310px',
            height: 'auto',
          }}
        >
          <div className="col-span-2 p-4 flex justify-center">
            <img
              style={{
                maxWidth: '240px',
                height: 'auto',
              }}
              src="https://images-na.ssl-images-amazon.com/images/I/41Rtah4DGHL.jpg"
              // 지금은 api 완성 전 예시 이미지. 나중에 상품 정보에서 꺼내와야 함
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
              onClick={() => {
                {
                  if (userNo === 0) {
                    alert('Please login to continue.');
                  } else {
                    alert('The item is added to the scrapbook.');
                    addtoScrapbook();
                  }
                }
              }}
            >
              Add to Scrapbook
            </button>
          </div>
        </div>

        {/* 상품 정보 (2) - 아마존 랭킹 순위, 상품 번호(ASIN), 등록 날짜 */}
        <div
          className="shadow-sm py-2 px-3 text-xs font-medium"
          style={{
            maxWidth: '310px',
            // height: 'auto',
          }}
        >
          <p className="p-1 m-0">
            Amazon Best Sellers Rank: 441908
            {/* {productInfo.p_rank} */}
          </p>
          <p className="p-1 m-0">ASIN: {productInfo.p_no}</p>
          <p className="p-1 m-0">Date First Available: {productInfo.p_date}</p>
        </div>

        {/* 상품 정보 (3) -상품 상세 설명 */}
        <div
          className="shadow-sm py-2 px-3"
          style={{
            maxWidth: '310px',
            height: 'auto',
          }}
        >
          <p className="flex p-1 text-sm font-semibold">Item Description</p>
          {itemDescription.length > 0 ? (
            <p className="p-1 text-xs text-justify font-medium">
              {/* {productInfo.p_description.length > 0} */}
              {/* {productInfo.p_description} */}
              Show nomal item description
            </p>
          ) : (
            <div className="flex flex-wrap justify-center p-1 text-xs text-center font-semibold text-gray-700">
              <img
                src="./images/rabbit_example.jpg"
                className="rounded-3xl m-4"
                style={{ width: '200px' }}
              />
              Okay, our database does not have this detail about the item.
              <br></br> How about we go back in time and extract the information
              instead?*
              <button
                type="button"
                className="bg-purple-500 hover:bg-purple-800 m-3 text-lg text-white font-semibold rounded-lg"
                style={{
                  fontFamily: 'neodgm',
                  width: '200px',
                  height: '35px',
                }}
                onClick={() => {
                  alert('Traveling through Time & Restoring Data');
                  setOnToggle(true);
                }}
              >
                {console.log('NLP 생성 버튼 클릭 상태 : ' + onToggle)}
                Execute
              </button>
              <p className="font-semibold text-gray-400">
                * Powered by Alice the AI Rabbit
              </p>
            </div>
          )}
          {onToggle === true ? (
            <p className="p-3 text-xs text-justify font-medium break-all">
              {nlpDescription}
            </p>
          ) : null}
        </div>
        <div
          className="shadow-sm py-2 px-3 text-md font-medium"
          style={{
            maxWidth: '310px',
            height: 'auto',
          }}
        >
          {/* 상품 인포 2 */}
          <p className="pl-1 pt-1 pb-1 text-sm font-semibold">
            AI Review Analysis
          </p>
          <div className="inline-flex flex-wrap justify-center gap-x-3 gap-y-2 m-2">
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

        <div
          className="shadow-sm py-2 px-3 text-md font-medium"
          style={{
            maxWidth: '310px',
            height: 'auto',
          }}
        >
          {/* 추천 상품 */}
          <p className="pl-1 pt-1 pb-3 text-sm font-semibold">
            Customers who bought this item also bought
          </p>
          <div className="rounded-none shadow-none">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
}
