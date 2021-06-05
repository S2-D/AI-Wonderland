import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../../url/http';

export default function Wallet() {
  const [money, setMoney] = useState('');

  const userLocation = location.href;

  useEffect(() => {
    async function getUserMoney() {
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await axios.get(`${baseUrl}/member/auth/`, {
          headers: { Authorization: `jwt ${access_token}` },
        });
        if (response.data.status === 'success') {
          console.log(response.data);
          setMoney(response.data.user.money);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserMoney();
  }, [userLocation]);
  return (
    <>
      <div>${money}</div>
    </>
  );
}
