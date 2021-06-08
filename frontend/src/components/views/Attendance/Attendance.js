import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import { Link } from 'react-router-dom';
import Wallet from '../GNB/Wallet';
import './Attendance.css';
import baseUrl from '../../../url/http';

export default function Attendance() {
  const [attendanceInfo, setAttendanceInfo] = useState([]);
  const [infoUrl, setInfoUrl] = useState([
    `http://127.0.0.1:8000/api/attendance/`,
  ]);
  const [prevUrlLink, setPrevUrlLink] = useState([]);
  const [nextUrlLink, setNextUrlLink] = useState([]);
  const [token, setToken] = useState([]);

  async function getAttendanceInfo() {
    try {
      const response = await axios.get(infoUrl, {
        headers: {
          Authorization:
            'jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFiY0BleGFtcGxlLmNvbSIsImV4cCI6MTYyMzY5NjI5MSwiZW1haWwiOiJhYmNAZXhhbXBsZS5jb20iLCJvcmlnX2lhdCI6MTYyMzA5MTQ5MX0.iK-MTpxX1mqkk1gKBdaWr2Ns8UsPUueqn2H9GYqCuJE',
        },
      });
      console.log(response.data.results);
      if (response.status === 200) {
        setAttendanceInfo(response.data.results);
        setPrevUrlLink(response.data.previous);
        setNextUrlLink(response.data.next);
      } else if (response.status === 404) {
        console.log('404 진입' + response);
        alert('Fail to load the data');
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAttendanceInfo();
  }, [infoUrl]);

  function nextPageHandler() {
    return setInfoUrl(nextUrlLink);
  }

  function prevPageHandler() {
    return setInfoUrl(prevUrlLink);
  }

  async function checkinHandler() {
    await axios
      .post(`http://127.0.0.1:8000/api/attendance/`, null, {
        headers: {
          Authorization:
            'jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFiY0BleGFtcGxlLmNvbSIsImV4cCI6MTYyMzY5NjI5MSwiZW1haWwiOiJhYmNAZXhhbXBsZS5jb20iLCJvcmlnX2lhdCI6MTYyMzA5MTQ5MX0.iK-MTpxX1mqkk1gKBdaWr2Ns8UsPUueqn2H9GYqCuJE',
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setInfoUrl(`http://127.0.0.1:8000/api/attendance/`);
          alert('You have been rewarded $300 in return!');
        }
      })
      .catch((response) => alert('You have already checked-in for the day!'));
  }

  return (
    <>
      <GNB />
      <h4
        className="mb-3 fw-normal text-center"
        style={{
          fontFamily: 'neodgm',
        }}
      >
        Attendance Check
      </h4>
      {attendanceInfo.map((record, idx) => (
        <div key={idx} className="card shadow-sm mx-auto w-80 mb-1">
          <div className="row no-gutters align-items-center">
            <div className="col-2">
              <img
                className="m-2"
                src="https://images-na.ssl-images-amazon.com/images/I/41Rtah4DGHL.jpg"
              ></img>
            </div>
            <div className="col-10 text-right">
              <p
                className="m-2"
                style={{
                  fontFamily: 'neodgm',
                }}
              >
                {record.attendance_date}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <button
          className="btn btn-link"
          style={{
            fontFamily: 'neodgm',
          }}
          disabled={prevUrlLink === null}
          onClick={prevPageHandler}
        >
          Prev
        </button>
        <button
          className="btn btn-link"
          style={{
            fontFamily: 'neodgm',
          }}
          disabled={nextUrlLink === null}
          onClick={nextPageHandler}
        >
          Next
        </button>
      </div>
      <div className="col-span-2 p-3 flex justify-center">
        <button
          type="button"
          className="bg-purple-700 hover:bg-purple-800 text-xl text-white font-semibold rounded-lg"
          style={{
            fontFamily: 'neodgm',
            width: '322px',
            height: '35px',
          }}
          onClick={checkinHandler}
        >
          Check in
        </button>
      </div>
      <Toolbar />
    </>
  );
}
