// 1. 진입 시 로그인, 비로그인 구별 - member auth로 하면 될 듯
// 2. 토끼 랜덤 넣어서 대화창 보여주기 - 일단 레이아웃부터 잡자
// - 토끼 이미지 보여줄 때, 배열 중에 아무거나 선택해서 보여주도록 해야 함
// 3. Let's play some music

import { useState } from 'react';
import IntroBasic from './IntroBasic';
import IntroRabbitTalk from './IntroRabbitTalk';
import IntroUserTalk from './IntroUserTalk';

export default function Intro() {
  const [interactionCase, setInteractionCase] = useState('basic');

  if (interactionCase === 'basic') {
    return (
      <IntroBasic
        handleInteraction={(interaction) => {
          setInteractionCase(interaction);
        }}
      />
    );
  } else if (interactionCase === 'rabbitTalkOn') {
    return <IntroRabbitTalk />;
  } else if (interactionCase === 'userTalkOn') {
    return <IntroUserTalk />;
  }
}
