import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import './Attendance.css';
import baseUrl from '../../../url/http';
import Avatar from 'boring-avatars';
import avatarName from './AvatarName';

export default function Attendance() {
  const [attendanceInfo, setAttendanceInfo] = useState([]);
  const [infoUrl, setInfoUrl] = useState([baseUrl + '/attendance/']);
  const [prevUrlLink, setPrevUrlLink] = useState([]);
  const [nextUrlLink, setNextUrlLink] = useState([]);
  const access_token = localStorage.getItem('access_token');

  async function getAttendanceInfo() {
    try {
      const response = await axios.get(infoUrl, {
        headers: { Authorization: `jwt ${access_token}` },
      });
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
      .post(baseUrl + '/attendance/', null, {
        headers: { Authorization: `jwt ${access_token}` },
      })
      .then((response) => {
        if (response.status === 201) {
          setInfoUrl(baseUrl + '/attendance/');
          alert('You have been rewarded $300 in return!');
        }
      })
      .catch((response) => alert('You have already checked-in for the day!'));
  }

  return (
    <>
      <div>
        <GNB />
        <br></br>
        <div className="container">
          <div className="body-container " style={{ paddingBottom: '65px' }}>
            <div className="title-container">
              <h4
                className="title mb-3 mt-3 text-center"
                style={{
                  fontFamily: 'light_p',
                }}
              >
                Attendance Check
              </h4>
            </div>
            <div className="date-container">
              {attendanceInfo.map((record, idx) => (
                <div key={idx} className="card mx-auto w-80 mb-2">
                  <div className="row align-items-center">
                    <div className="col-2">
                      <div className="m-2">
                        <Avatar
                          size={50}
                          name={avatarName.avatarName[record.avatar_num]}
                          variant="beam"
                          colors={[
                            '#187FD9',
                            '#14A1D9',
                            '#14C5D9',
                            '#16F2DC',
                            '#13F2C9',
                          ]}
                        />
                      </div>
                    </div>
                    <div className="col-10 text-right">
                      <p
                        className="dates m-2"
                        style={{
                          fontFamily: 'sb_pixel',
                        }}
                      >
                        {record.attendance_date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="button-container">
              <div className="flex justify-center">
                <button
                  className="btn-lg btn-link"
                  style={{
                    fontFamily: 'sb_pixel',
                  }}
                  disabled={prevUrlLink === null}
                  onClick={prevPageHandler}
                >
                  Prev
                </button>
                <button
                  className="btn-lg btn-link"
                  style={{
                    fontFamily: 'sb_pixel',
                  }}
                  disabled={nextUrlLink === null}
                  onClick={nextPageHandler}
                >
                  Next
                </button>
              </div>
              <div className="p-3 flex justify-center">
                <button
                  type="button"
                  className="checkin"
                  style={{
                    fontFamily: 'sb_pixel',
                    width: '322px',
                    height: '35px',
                  }}
                  onClick={checkinHandler}
                >
                  Check in
                </button>
              </div>
            </div>
          </div>
        </div>
        <Toolbar />
      </div>
    </>
  );
}
