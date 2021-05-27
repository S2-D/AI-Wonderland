import React, { useState } from 'react';

function IntroTalk() {
  const rabbitSaying = [
    {
      id: 1,
      text: "Let me see... * Well, there is another thing you've lost.",
    },
    {
      id: 2,
      text: "You've lost yourself too. * The tea party in 2003, remember?",
    },
    {
      id: 3,
      text:
        "I'll take you to the vintage shop of the past. * Go and find yourself.",
    },
    {
      id: 4,
      text: 'But you know, you can only stay for a half hour in that era.',
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
  //   window.alert("Welocme to 2000's");
  //   window.alert("Welocme to 2000's");
  //   window.alert("Welocme to 2000's");
  //   window.alert("Welocme to 2000's");
  //   window.location.href = 'Main/';
  // }

  function CallUserTalk() {
    return (
      <>
        <button onClick={() => toLoginHandler()}>
          Yes, I'm here to find the past again.
        </button>

        <button onClick={() => setIndex(3)}>
          What do you mean? I got lost again?
        </button>
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
