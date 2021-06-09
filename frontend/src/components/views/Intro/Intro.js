// 1. 진입 시 로그인, 비로그인 구별 - member auth로 하면 될 듯
// 2. 토끼 랜덤 넣어서 대화창 보여주기 - 일단 레이아웃부터 잡자
// - 토끼 이미지 보여줄 때, 배열 중에 아무거나 선택해서 보여주도록 해야 함
// 3. Let's play some music
import { useState } from 'react';
import IntroTalk from './IntroTalk';
import styledIntro from './styledIntro.css';

const rabbitSaying = [
  {
    id: 1,
    text: 'Direction isn’t the only thing you have lost.',
  },
  {
    id: 2,
    text:
      'You have lost your fashion sense. Remember how you dressed in the 2000s? So hip!',
  },
  {
    id: 3,
    text: 'Let me take you to our vintage shop located in the 2000s.',
  },
  {
    id: 4,
    text:
      'Let me take you to our vintage shop located in the 2000s. You can definitely rebuild your fashion sense!',
  },
  // {
  //   id: 5,
  //   text:
  //     'But please be aware, this time portal to the past will only stay open for 30 minutes.',
  // },
  // {
  //   id: 6,
  //   text:
  //     'You will forced to return back to reality whether you like it or not.',
  // },
];

function Intro() {
  const [interactionCase, setInteractionCase] = useState(1);
  const [enterOnToggle, setEnterOnToggle] = useState(false);
  const [nextOnToggle, setNextOnToggle] = useState(false);
  const [chatNo, setChatNo] = useState(1);

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
        </div>

        {/* 입장하기 버튼 */}
        {enterOnToggle === false ? (
          <div className="col-span-12 flex flex-col gap-20">
            <div className="col-span-12 flex justify-center">
              <button
                className="button-enter"
                onClick={() => {
                  setEnterOnToggle(true);
                }}
              >
                Enter
              </button>
            </div>
            {/* 상점 이미지 저작권 표시 */}
            <div className="col-span-12 flex flex-wrap justify-center">
              <p
                style={{
                  fontFamily: 'sb_pixel_7',
                  color: 'white',
                  fontSize: '13px',
                  marginBottom: '20px',
                }}
              >
                store image copyright.
                <a
                  href="https://pixelins.tumblr.com/"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  @pixelins.
                </a>
                All reserved
              </p>
            </div>
          </div>
        ) : (
          <div className="col-span-12 row-span-3 row-start-4 row-end-6 flex flex-row justify-start">
            <img
              src="/images/intro/rabbit01_clerk.png"
              id="intro-rabbit-img"
            ></img>
            <div className="col-span-12 row-span-3 row-start-4 row-end-7 flex justify-start">
              <div className="intro-rabbit-chatbox">
                <p className="whitespace-normal" id="intro-rabbit-chatbox-text">
                  Darling, it seems like you are quite lost right now.
                  <button
                    onClick={() => {
                      setNextOnToggle(true);
                    }}
                    style={{ marginLeft: '90%' }}
                  >
                    <i className="fas fa-forward"></i>
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Intro;
