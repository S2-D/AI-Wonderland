import React, { useState, useEffect } from 'react';
import logo from './Logo_example.jpeg';

const talkData = {
  rabbitSaying: [
    {
      id: 1,
      text: 'Hello, You got lost again.',
      show: false,
    },
    {
      id: 2,
      text: "Let me see... The way isn't the only thing you've lost.",
      show: false,
    },
    {
      id: 3,
      text: "You've lost yourself too. The tea party in 2003, remember?",
      show: false,
    },
    {
      id: 4,
      text:
        "I'll take you to the vintage shop of the past. Go and find yourself.",
      show: false,
    },
    {
      id: 5,
      text: 'But you know, you can only stay for a half hour in that era.',
      show: false,
    },
  ],
  userSaying: [
    {
      id: 1,
      text: "Yes, I'm here to find the past again.",
      show: false,
    },
    {
      id: 2,
      text: 'What do you mean? I got lost again?',
      show: false,
    },
  ],
};

function Intro(talkData) {
  // 화면 3가지로 나누기 : 1) 첫 진입 시(로그인/비로그인 나누어야 함), 2) 시작하기 버튼 클릭 시(토끼의 2가지 대사) 3) 선택 후 토끼의 대사

  const [view, setView] = useState(-1);
  const [rabbitTalk, setRabbitTalk] = useState(false);
  const [userTalk, setUserTalk] = useState(false);

  function firstView() {
    // if (!user) - 차후 백엔드에서 유저 상태값 가져와서 관리?
    return (
      <>
        <body>
          <div className="container">
            <div className="logo">
              <img src={logo} />
            </div>
            <button className="btn" onClick={(e) => setView(0)}>
              Click to Start
            </button>
          </div>
        </body>
      </>
    );
  }

  function secondView() {
    return (
      <>
        <h1>질문지(예)</h1>
      </>
    );
  }

  if (index < 0) {
    return (
      <>
        <callFirstView />
      </>
    );
  }
}

export default Intro;
