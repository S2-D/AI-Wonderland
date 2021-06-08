// 1) 레이아웃 잡기 - ** 중요! 저작권 표시해주기 (3시까지). 그리드에서 row도 써주면, 문제가 해결될 것
// 2) 진입 시 로그인, 비로그인 구별 - memberauth로 하면 될 듯
// 3) 토끼 랜덤 넣어서 대화창 보여주기
// 4) Let's play some music

import IntroTalk from './IntroTalk';

function Intro() {
  return (
    <div className="flex my-3 justify-center">
      <div
        className="grid grid-cols-1  gap-10 rounded-md"
        style={{
          maxWidth: '310px',
          height: 'auto',
          backgroundImage: 'URL("images/intro/intro_background.png")',
          backgroundSize: '310px auto',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#187FD9',
          gridTemplateRows: '1fr 1fr 2fr 1fr',
        }}
      >
        <div
          className="col-span-1 flex justify-end m-1"
          style={{ fontFamily: 'neodgm' }}
        >
          Sound effect
        </div>
        <div className="col-span-1 flex flex-wrap justify-center items-center text-white">
          <p
            style={{
              fontFamily: 'BACKTO1982',
              fontSize: '17px',
              // fontFamily: 'small_bold_pixel-7',
              // fontFamily: 'light_pixel-7',
              // height: '30px',
            }}
          >
            AI WONDERLAND
          </p>
          {/* <p>Welcome to the time store</p> */}
        </div>
        <div className="col-span-1 flex justify-center items-end">
          <button
            className="nes-btn"
            style={{
              fontFamily: 'BACKTO1982',
              fontSize: '10px',
              borderColor: 'blue',
            }}
          >
            Click to start
          </button>
        </div>
        <div
          className="col-span-1 flex flex-wrap justify-center items-end mb-0"
          style={{ fontFamily: 'neodgm' }}
        >
          <p classNmae="p-0 mb-0">Image copyright. All reserved.</p>
          <p classNmae="p-0 mb-0">https://pixelins.tumblr.com/</p>
        </div>
      </div>
    </div>

    //   <div className="container">
    //     <div className="logo">
    //       <img src="images/intro/intro_background.png" />
    //     </div>
    //     <IntroTalk />
    //   </div>
  );
}

export default Intro;
