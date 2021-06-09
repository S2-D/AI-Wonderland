import React, { useState } from 'react';

// CSS 버튼으로 완전 예쁜 거 발견! 쓰면 좋을 듯!
// https://freefrontend.com/css-buttons/
function IntroTalk() {
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
      text:
        'Let me take you to our vintage shop located in the 2000s. You can definitely rebuild your fashion sense!',
    },
    {
      id: 4,
      text:
        'But please be aware, this time portal to the past will only stay open for 30 minutes. You will forced to return back to reality whether you like it or not.',
    },
  ];

  const [index, setIndex] = useState(0);
  // 1) 유저가 1번을 선택 > popup 노출 > 로그인
  // 2) 유저가 2번을 선택 > 토끼 대화 > popup 노출 > 메인

  function toLoginHandler() {
    window.alert("Welocme to 2000's");
    window.location.href = 'login/';
  }

  // function toMainHandler() {
  //   window.alert(" ! Opening Time Portal...");
  //   window.alert(" ! Traveling to AI Wonderland – the Vintage Shop for the 2000s Look.");
  //   window.alert("Welocme to 2000's");
  //   window.location.href = 'Main/';
  // }

  function CallUserTalk() {
    return (
      <>
        <button onClick={() => toLoginHandler()}>
          Not even! I am on a journey to the past.
        </button>

        <button onClick={() => setIndex(3)}>I am?</button>
      </>
    );
  }

  function CallRabbitTalk() {
    return (
      <>
        {rabbitSaying.map((data, idx) => (
          <button key={idx}>{data.text.split('* ')}</button>
        ))}
      </>
    );
  }

  if (index === 0) {
    return <button onClick={() => setIndex(1)}>Click to start</button>;
  } else if (index === 1) {
    return (
      <button onClick={() => setIndex(2)}>Hello, You got lost again.</button>
    );
  } else if (index === 2) {
    return <CallUserTalk />;
  } else if (index === 3) {
    return <CallRabbitTalk />;
  }
}

export default IntroTalk;
