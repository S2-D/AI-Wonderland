import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../url/http';

export default function Info() {
  const [Nickname, setNickName] = useState('');
  const [Money, setMoney] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [userId, setId] = useState('');
  const [Email, setEmail] = useState('');

  const MyPageInfoUrl = `localhost:3000/mypage`;

  useEffect(() => {
    async function getUserAuth() {
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await axios.get(`${baseUrl}/member/auth/`, {
          headers: { Authorization: `jwt ${access_token}` },
        });
        if (response.data.status === 'success') {
          // console.log(response.data);
          setId(response.data.user.id);
          setAccessToken(access_token);
          setNickName(response.data.user.nickname);
          setMoney(response.data.user.money);
          setEmail(response.data.user.email);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserAuth();
  }, [MyPageInfoUrl]);

  //추후 API 수정되면 코드 다시 짜기.
  // useEffect(() => {
  //   async function getmyPageInfo() {
  //     try {
  //       const response = await axios.get(`${baseUrl}/member/${userId}`, {
  //         headers: {
  //           Authorization: `jwt ${accessToken}`,
  //         },
  //       });
  //       if (response.data.status === 'success') {
  //         console.log(response.data);
  //         setNickName(response.data.nickname);
  //         console.log(nickName);
  //         setMoney(response.data.money);
  //         console.log(money);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // });

  return (
    <div
      className="grid grid-rows-1 grid-flow-col p-4 w-full justify-center font-mono"
      style={{
        backgroundColor: '#fdcb6e',
      }}
    >
      <div
        className="userInfo"
        style={{
          marginTop: '0px',
        }}
      >
        <div className="col-span-1 w-40 h-40 p-4 mx-20">
          <img
            src="./images/icon_img/anonymous.png"
            style={{
              borderRadius: '50%',
              backgroundColor: 'pink',
            }}
          />
        </div>
        <div
          className="col-span-1 font"
          style={{
            textAlign: 'center',
          }}
        >
          <span>{Nickname}</span>
        </div>
        <div
          className="col-span-1"
          style={{
            textAlign: 'center',
          }}
        >
          <span>{Email}</span>
        </div>
        <div
          className="col-span-1"
          style={{
            textAlign: 'center',
          }}
        >
          <span>{Money}</span>
        </div>
      </div>
    </div>
  );
}
