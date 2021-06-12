/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../url/http';
import {
  Container,
  Card,
  FormControl,
  Tabs,
  Tab,
  Image,
  Modal,
} from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';

import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import '../../../css/Scrapbook.css';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

import SwiperCore, { Pagination } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination]);

function ScrapbookPage() {
  // 2. data state 저장
  const [itemlist, setItemlist] = useState([]);
  const [topList, setTopList] = useState([]);
  const [bottomList, setBottomList] = useState([]);
  const [shoesList, setShoesList] = useState([]);
  const [etcList, setEtcList] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const [tmp, setTmp] = useState({});
  const [myCardList, setMyCardList] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [timegramModalShow, setTimegramModalShow] = useState(false);

  const access_token = localStorage.getItem('access_token');
  // 1. 내 스크랩북 리스트 가져오기
  useEffect(() => {
    axios
      .get(baseUrl + '/scrapbook/scrapbooklist/', {
        headers: {
          Authorization: `jwt ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setItemlist(res.data.data);
      });
    // .catch((error) => {
    //   setError(error);
    // });
  }, []);

  useEffect(() => {
    for (let i = 0; i < itemlist.length; i++) {
      if (itemlist[i].p_no.pcategory_code == 1) {
        setTopList((topList) => [...topList, itemlist[i]]);
      } else if (itemlist[i].p_no.pcategory_code == 2) {
        setBottomList((bottomList) => [...bottomList, itemlist[i]]);
      } else if (itemlist[i].p_no.pcategory_code == 3) {
        setShoesList((shoesList) => [...shoesList, itemlist[i]]);
      } else {
        setEtcList((etcList) => [...etcList, itemlist[i]]);
      }
    }
  }, [itemlist]);

  // 6. 캐러셀 누르면 모달 열기
  const onClickModalHandler = (e) => {
    e.preventDefault();
    setModalShow(true);
    setTmp({
      name: e.target.dataset.name,
      price: e.target.dataset.price,
      src: e.currentTarget.src,
      p_no: e.target.dataset.no,
    });
  };

  // 7. 모달에서 ADD 누르면카드에 들어가게 만들기
  const onAddHandler = (e) => {
    setModalShow(false);
    if (cardIdx < 6) {
      setCardIdx(cardIdx + 1);
      setMyCardList(
        myCardList.concat({
          name: tmp['name'],
          price: tmp['price'],
          src: tmp['src'],
          p_no: tmp['p_no'],
        })
      );
      setTotalPrice(totalPrice + parseInt(tmp['price']));
    } else {
      return alert('Please remove an item to continue.');
    }
  };

  // 8. 카드 한번 더 누르면 삭제할지 물어보고 삭제한다고 하면 삭제하기 (+전체금액 마이너스 해야함)
  const onClickDeleteHandler = (e) => {
    e.preventDefault();
    const idx = parseInt(e.target.dataset.idx);

    try {
      if (confirm('Would you like to remove this item from your look?')) {
        setTotalPrice(totalPrice - parseInt(myCardList[idx]['price']));
        myCardList.splice(idx, 1);
        setMyCardList(myCardList);

        setCardIdx(cardIdx - 1);
        alert('Item removed.');
      }
    } catch (error) {
      alert('The box is empty.');
    } finally {
      console.log(totalPrice);
    }
  };

  // 9. Post on Timegram 버튼 누르면 모달 열기
  const onClickTimegramModalHandler = (e) => {
    if (myCardList.length < 1) {
      return alert('Posting a look requires at least an item.');
    }
    setTimegramModalShow(true);
  };

  // 10. api 연결
  const onAddTimegramHandler = (e) => {
    if (
      e.target.dataset.title.length < 2 ||
      e.target.dataset.title == '' ||
      e.target.dataset.title == undefined
    ) {
      return alert('Your look title must be longer than two characters.');
    }

    const p_no = [];
    for (let i = 0; i < myCardList.length; i++) {
      p_no.push(myCardList[i]['p_no']);
    }

    const body = {
      title: e.target.dataset.title,
      p_list: p_no,
      total_price: totalPrice,
    };
    axios
      .post(baseUrl + '/timegram/TimegramCreate/', body, {
        headers: {
          Authorization: `jwt ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setTotalPrice(0);
        setTmp([]);

        alert('Posting complete!');
        setTimegramModalShow(false);
        window.location = '/timegram';
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.request);
      });
  };

  // 11. 삭제버튼 누르면 스크랩북 리스트에서 삭제
  const onClickDeleteItemHandler = (e) => {
    e.preventDefault();

    if (confirm('Would you like to remove this item from your scrapbook?')) {
      alert('Item removed.');

      axios
        .delete(baseUrl + `/scrapbook/scrapbooklist/${e.target.dataset.id}`, {
          headers: {
            Authorization: `jwt ${access_token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          // Todo
          // as-is : page reload (list reload 하면 useEffect 때문에 itemlist 에 추가됨)
          // to-be : list reload
          window.location.reload();
        });
    }
  };

  const onClickResetHandler = (e) => {
    setMyCardList([]);
    setCardIdx(0);
    setTotalPrice(0);
  };

  function AddListModal() {
    return (
      <Modal
        size="lg"
        show={modalShow}
        centered
        onHide={() => setModalShow(false)}
      >
        <Modal.Header className="modal-header-custom">
          <h2 onClick={() => setModalShow(false)}>
            <i className="fas fa-times pointer"></i>
          </h2>
        </Modal.Header>
        <Modal.Body>
          <h2>Adding this item</h2>
          <h2>to your look?</h2>
          <div
            style={{ width: '30vw', textAlign: 'center', display: 'contents' }}
          >
            <Image
              src={tmp['src']}
              style={{ height: '80vw', width: 'auto', margin: '2rem 0.5rem' }}
            />
          </div>
          <p>{tmp['name']}</p>
          <p>${tmp['price']}</p>
          <button
            type="button"
            className="scrap_btn"
            style={{ fontSize: '1rem' }}
            onClick={onAddHandler}
          >
            ADD
          </button>
        </Modal.Body>
      </Modal>
    );
  }

  function AddTimegramModal() {
    const [timegramTitle, setTimegramTitle] = useState('');

    const onChangeTitleHandler = (e) => {
      e.preventDefault();
      setTimegramTitle(e.target.value);
    };

    return (
      <Modal
        size="lg"
        show={timegramModalShow}
        centered
        onHide={() => setTimegramModalShow(false)}
      >
        <Modal.Header className="modal-header-custom">
          <h2 onClick={() => setTimegramModalShow(false)}>
            <i className="fas fa-times pointer"></i>
          </h2>
        </Modal.Header>
        <Modal.Body>
          {/* Todo : text-align check */}
          <div style={{ textAlign: 'center' }}>
            <h2>How would you like to</h2>
            <h2>name this look?</h2>
            {/* Todo : input bgc check background-color: rgba( 255, 255, 255, 0)} */}
            <div
              style={{
                marginTop: '2rem',
                marginBottom: '2rem',
                textAlign: 'center',
                display: 'block',
              }}
            >
              <FormControl
                style={{
                  margin: '1rem auto',
                  textAlign: 'center',
                  width: '75%',
                }}
                type="text"
                placeholder="Enter Timegram Title"
                onChange={onChangeTitleHandler}
              />
            </div>
            <p>Look Cost : ${totalPrice}</p>
          </div>
          <button
            type="button"
            className="scrap_btn"
            style={{ fontSize: '1rem' }}
            data-title={timegramTitle}
            onClick={onAddTimegramHandler}
          >
            POST
          </button>
        </Modal.Body>
      </Modal>
    );
  }

  // 3. list 화면에 뿌리기
  const myTopList = topList.map((item, idx) => {
    return [
      <SwiperSlide key={idx}>
        <div className="scrap_slider">
          <Image
            src={item.p_no.p_image}
            onClick={onClickModalHandler}
            data-no={item.p_no.p_no}
            data-name={item.p_no.p_name}
            data-price={item.p_no.p_price}
            style={{
              width: '30vw !important',
              height: '55vw',
              cursor: 'pointer',
            }}
          />
          <p>
            ${item.p_no.p_price}&nbsp;
            <i
              className="far fa-xs fa-trash-alt pointer"
              onClick={onClickDeleteItemHandler}
            ></i>
          </p>
        </div>
      </SwiperSlide>,
    ];
  });
  const myShoesList = shoesList.map((item, idx) => {
    return [
      <SwiperSlide key={idx}>
        <div className="scrap_slider">
          <Image
            src={item.p_no.p_image}
            onClick={onClickModalHandler}
            data-no={item.p_no.p_no}
            data-name={item.p_no.p_name}
            data-price={item.p_no.p_price}
            style={{
              width: '30vw !important',
              height: '55vw',
              cursor: 'pointer',
            }}
          />
          <p>
            ${item.p_no.p_price}&nbsp;
            <i
              className="far fa-xs fa-trash-alt pointer"
              onClick={onClickDeleteItemHandler}
            ></i>
          </p>
        </div>
      </SwiperSlide>,
    ];
  });

  const myBottomList = bottomList.map((item, idx) => {
    return [
      <SwiperSlide key={idx}>
        <div className="scrap_slider">
          <Image
            src={item.p_no.p_image}
            onClick={onClickModalHandler}
            data-no={item.p_no.p_no}
            data-name={item.p_no.p_name}
            data-price={item.p_no.p_price}
            style={{
              width: '30vw !important',
              height: '55vw',
              cursor: 'pointer',
            }}
          />
          <p>
            ${item.p_no.p_price}&nbsp;
            <i
              className="far fa-xs fa-trash-alt pointer"
              onClick={onClickDeleteItemHandler}
            ></i>
          </p>
        </div>
      </SwiperSlide>,
    ];
  });

  const myEtcList = etcList.map((item, idx) => {
    return [
      <SwiperSlide key={idx}>
        <div className="scrap_slider">
          <Image
            src={item.p_no.p_image}
            onClick={onClickModalHandler}
            data-no={item.p_no.p_no}
            data-name={item.p_no.p_name}
            data-price={item.p_no.p_price}
            style={{
              width: '30vw !important',
              height: '55vw',
              cursor: 'pointer',
            }}
          />
          <p>
            ${item.p_no.p_price}&nbsp;
            <i
              className="far fa-xs fa-trash-alt pointer"
              onClick={onClickDeleteItemHandler}
            ></i>
          </p>
        </div>
      </SwiperSlide>,
    ];
  });

  const row_num = [0, 1, 2];
  const row_num2 = [3, 4, 5];
  const CardList = row_num.map((card, idx) => {
    return [
      <div className="scrap_card card pointer" key={idx}>
        <Card.Img
          variant="scrap"
          src={myCardList.length > card ? myCardList[card]['src'] : ''}
          data-idx={card}
          style={myCardList.length > card ? { height: '37.7vw' } : {}}
          onClick={onClickDeleteHandler}
        />
      </div>,
    ];
  });

  const CardList2 = row_num2.map((card, idx) => {
    return [
      <div className="scrap_card card pointer" key={idx}>
        <Card.Img
          variant="scrap"
          src={myCardList.length > card ? myCardList[card]['src'] : ''}
          data-idx={card}
          style={myCardList.length > card ? { height: '37.7vw' } : {}}
          onClick={onClickDeleteHandler}
        />
      </div>,
    ];
  });

  return (
    <>
      <GNB />
      <Container className="main_container">
        <div className="md_row">{CardList}</div>
        <div className="md_row">{CardList2}</div>
        <AddListModal onHide={() => setModalShow(false)} />
        <AddTimegramModal onHide={() => setTimegramModalShow(false)} />
        <div className="price_row">
          <p>${totalPrice}</p>
          <button
            type="button"
            className="scrap_btn"
            onClick={onClickResetHandler}
          >
            Reset
          </button>
        </div>

        <div className="tab_row">
          {' '}
          {/* 4. tab 4개로 분리 */}
          <Tabs defaultActiveKey="toplist" justify="true">
            <Tab eventKey="toplist" title="Tops">
              <div className="tab-border">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={15}
                  autoHeight={true}
                  pagination={{ dynamicBullets: true, clickable: true }}
                  observer={true}
                  observeParents={true}
                  className="tops"
                >
                  {myTopList}
                </Swiper>
              </div>
            </Tab>
            <Tab eventKey="bottomlist" title="Bottoms">
              <div className="tab-border">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={15}
                  autoHeight={true}
                  pagination={{ dynamicBullets: true, clickable: true }}
                  observer={true}
                  observeParents={true}
                  className="bottom"
                >
                  {myBottomList}
                </Swiper>
              </div>
            </Tab>
            <Tab eventKey="shoeslist" title="Shoes">
              <div className="tab-border">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={15}
                  autoHeight={true}
                  pagination={{ dynamicBullets: true, clickable: true }}
                  observer={true}
                  observeParents={true}
                  className="shoes"
                >
                  {myShoesList}
                </Swiper>
              </div>
            </Tab>
            <Tab eventKey="etclist" title="Etc">
              <div className="tab-border">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={15}
                  autoHeight={true}
                  pagination={{ dynamicBullets: true, clickable: true }}
                  observer={true}
                  observeParents={true}
                  className="etc"
                >
                  {myEtcList}
                </Swiper>
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="bottom_row">
          <button
            type="button"
            style={{ width: '80vw', backgroundColor: '#187fd9' }}
            className="scrap_btn"
            onClick={onClickTimegramModalHandler}
          >
            Post on Timegram
          </button>
        </div>
        <Toolbar />
      </Container>
    </>
  );
}
export default ScrapbookPage;
