import IntroTalk from './IntroTalk';
import logo from './logoExamp.png';

function Intro() {
  return (
    // if (!user) - 차후 백엔드에서 유저 상태값 가져와서 관리?
    // 첫 진입 시(로그인/비로그인 나누어야 함) - key를 받아와야 하고, 새로고침을 해도 유지가 되는 storage에서 받아와야 - mock 서버 만들어서 확인
    // JWT - 예를 들어 크롬 브라우저에 있는 local Storage에 토큰이 있냐 없냐를 보고 판단하면 됨. 사실 백엔드에서도 로컬 스토리지의 토큰을 보고 판단을 함.
    // mock-server 는 필요 없을 것. 슬기님께서 이미 세팅 중이심. 어떻게 확인하면 되는지는 어차피 오늘 내일 중으로 나올 예정임.

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
