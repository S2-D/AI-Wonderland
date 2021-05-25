import IntroTalk from './IntroTalk';
import logo from './Logo_example.jpeg';

function Intro() {
  return (
    // if (!user) - 차후 백엔드에서 유저 상태값 가져와서 관리?
    // 첫 진입 시(로그인/비로그인 나누어야 함) - key를 받아와야 하고, 새로고침을 해도 유지가 되는 storage에서 받아와야 - mock 서버 만들어서 확인
    <>
      <div className="container">
        <div className="logo">
          <img src={logo} />
        </div>
        <IntroTalk />
      </div>
    </>
  );
}

export default Intro;
