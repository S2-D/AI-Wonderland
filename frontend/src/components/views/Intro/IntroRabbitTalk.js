import React from 'react';
import { useState } from 'react';

import styledIntro from './styledIntro.css';

const rabbitWords = [
  {
    id: 1,
    text: 'Direction isn’t the only thing you have lost.',
  },
  {
    id: 2,
    text: 'You have lost your fashion sense.',
  },
  {
    id: 3,
    text: 'Remember how you dressed in the 2000s? So hip!',
  },
  {
    id: 4,
    text: 'Let me take you to our vintage shop located in the 2000s.',
  },
  {
    id: 5,
    text: 'You can definitely rebuild your fashion sense!',
  },
  {
    id: 6,
    text:
      'And don’t you forget, you MUST login to fully use all the features at our shop!',
  },
];

export default function IntroRabbitTalk(props) {
  // 유저의 선택지 (바로 로그인 or 토끼의 설명 듣기) 상태 업데이트
  const [rabbitWordsId, setRabbitWordsId] = useState(1);

  return (
    <div className="flex m-2 justify-center">
      {/* 배경 및 전체 그리드 */}
      <div
        className="grid grid-cols-12 gap-1 rounded-md"
        id="intro-container-grid"
        style={{
          backgroundImage: 'URL("images/intro/background_sky.png")',
        }}
      >
        {/* 배경 음악 플레이 */}
        <div
          className="col-span-12 flex justify-end m-3 gap-2"
          style={{ fontFamily: 'light_p_7', color: 'white', fontSize: '10px' }}
        >
          <i className="far fa-play-circle"></i>
          Play Sound
        </div>
        {/* 타이틀 이미지 & 텍스트 */}
        <div className="col-span-3 flex justify-end items-end">
          <img
            src="/images/intro/rabbit_logo.png"
            style={{
              width: 'auto',
              height: '40px',
              marginTop: '100px',
              marginBottom: '5px',
            }}
          ></img>
        </div>
        <div className="col-span-9 flex justify-start items-end text-white">
          <p
            style={{
              marginBottom: '0px',
              alignItems: 'center',
              fontSize: '25px',
              fontFamily: 'light_p_7',
            }}
          >
            AI WONDERLAND
          </p>
        </div>
        {/* 빈티지 상점 이미지 */}
        <div className="col-span-12 flex flex-col justify-center items-center">
          <img
            src={'/images/intro/store_art.png'}
            style={{ width: '65%', paddingTop: '30px' }}
          ></img>
          <p
            style={{
              fontFamily: 'sb_pixel_7',
              color: 'white',
              fontSize: '20px',
              margin: '10px',
            }}
          >
            ~ Welcome to the shop of SoondoongSix ~
          </p>
          {/* User 선택지 불러오기  */}
        </div>

        <div className="col-span-12 row-span-3 row-start-4 row-end-6 flex flex-row justify-start">
          <img
            src="/images/intro/rabbit01_clerk.png"
            id="intro-rabbit-img"
          ></img>
          <div className="col-span-12 row-span-3 row-start-4 row-end-7 flex justify-start">
            <div className="intro-rabbit-chatbox">
              {props.onIntroduction === false ? (
                <button
                  onClick={() => {
                    props.handleInteraction('userTalkOn');
                  }}
                  style={{ marginLeft: '90%' }}
                >
                  <p id="intro-rabbit-chatbox-text">
                    Darling, it seems like you are quite lost right now.
                    <i
                      className="fas fa-forward"
                      style={{ padding: '5px' }}
                    ></i>
                  </p>
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.handleInteraction('userTalkOn');
                    setRabbitWordsIdx(rabbitWordsId + 1);
                  }}
                  style={{ marginLeft: '90%' }}
                >
                  <p id="intro-rabbit-chatbox-text">
                    {rabbitWords.text}
                    <i
                      className="fas fa-forward"
                      style={{ padding: '5px' }}
                    ></i>
                  </p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
