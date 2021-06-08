// 1) 진입 시 로그인, 비로그인 구별 - memberauth로 하면 될 듯
// 2) 토끼 랜덤 넣어서 대화창 보여주기
// 3) Let's play some music

import IntroTalk from './IntroTalk';
import styledIntro from './styledIntro.css';

function Intro() {
  return (
    <div className="flex m-2 justify-center">
      {/* 배경 및 전체 그리드 */}
      <div
        className="grid grid-cols-12 gap-1 rounded-md"
        style={{
          maxWidth: '375px',
          height: '670px',
          backgroundImage: 'URL("images/intro/background_sky.png")',
          backgroundSize: '375px auto',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#187FD9',
          gridTemplateRows: '1fr 2fr 5fr 2fr 1fr',
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
              // fontFamily: 'BACKTO1982',
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
        <div className="col-span-12 flex justify-center items-start">
          <button className="button-enter">Enter</button>
        </div>
        {/* 이미지 저작권 표시 */}
        <div className="col-span-12 flex flex-wrap justify-center items-end">
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
    </div>
  );
}

export default Intro;
