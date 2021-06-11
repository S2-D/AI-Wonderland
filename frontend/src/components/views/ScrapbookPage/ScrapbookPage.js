/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../url/http';
import { Container, Form, Card, FormControl, Tabs, Tab, Image, Modal, Button } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";

import GNB from '../GNB/GNB';
import "./Scrapbook.css"

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

import SwiperCore, {
  Pagination
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination]);


function ScrapbookPage() {
  // 2. data state 저장
  const [itemlist, setItemlist] = useState([])
  const [topList, setTopList] = useState([])
  const [bottomList, setBottomList] = useState([])
  const [shoesList, setShoesList] = useState([])
  const [etcList, setEtcList] = useState([])

  const [totalPrice, setTotalPrice] = useState(0)
  const [cardIdx, setCardIdx] = useState(0)
  const [tmp, setTmp] = useState({})
  const [myCardList, setMyCardList] = useState([])

  const [modalShow, setModalShow] = useState(false);
  const [timegramModalShow, setTimegramModalShow] = useState(false);

  const access_token = localStorage.getItem('access_token');
  const url = 'http://127.0.0.1:8000'

  // 1. 내 스크랩북 리스트 가져오기
  useEffect(() => {
    
    axios.get(url + '/api/scrapbook/scrapbooklist/', {
      headers: {
        Authorization: `jwt ${access_token}`,
      },
    }).then((res) => {
      console.log(res.data);
      setItemlist(res.data.data)
    })
    // .catch((error) => {
    //   setError(error);
    // });
  }, []);

  useEffect(() => {
    
    for (let i = 0; i < itemlist.length; i++) {
      
      if (itemlist[i].p_no.pcategory_code == 1) {
        setTopList(topList => [...topList, itemlist[i]])
      } else if (itemlist[i].p_no.pcategory_code == 2) {
        setBottomList(bottomList => [...bottomList, itemlist[i]])
      } else if (itemlist[i].p_no.pcategory_code == 3) {
        setShoesList(shoesList => [...shoesList, itemlist[i]])
      } else {
        setEtcList(etcList => [...etcList, itemlist[i]])
      }
    }

  }, [itemlist])

  // 6. 캐러셀 누르면 모달 열기
  const onClickModalHandler = (e) => {
    e.preventDefault();
    setModalShow(true)
    setTmp({ 'name' : e.target.dataset.name, 'price' : e.target.dataset.price, 'src' : e.currentTarget.src, 'p_no' : e.target.dataset.no})
  }

  // 7. 모달에서 ADD 누르면카드에 들어가게 만들기
  const onAddHandler = (e) => {
    setModalShow(false)
    if (cardIdx < 6) {
      setCardIdx(cardIdx + 1)
      setMyCardList(myCardList.concat({ 'name' : tmp['name'], 'price' : tmp['price'], 'src' : tmp['src'], 'p_no' : tmp['p_no']}))
      setTotalPrice(totalPrice + parseInt(tmp['price']))
    } else {
      return alert("더이상 추가할 수 없다")
    }

  }
  
  // 8. 카드 한번 더 누르면 삭제할지 물어보고 삭제한다고 하면 삭제하기 (+전체금액 마이너스 해야함)
  const onClickDeleteHandler = (e) => {
    
    e.preventDefault();
    const idx = parseInt(e.target.dataset.idx)
    try {
      if (confirm("삭제할거니?")){
      
        setTotalPrice(totalPrice - parseInt(myCardList[idx]['price']))
        myCardList.splice(idx, 1)
        setMyCardList(myCardList);

        setCardIdx(cardIdx - 1)
        alert("삭제했어")
      }
    } catch (error) {
      alert("삭제할 수 있는 아이템이 없어")
    } finally {
      console.log(totalPrice)
    }

    
  }

  // 9. Post on Timegram 버튼 누르면 모달 열기
  const onClickTimegramModalHandler = (e) => {
    if (myCardList.length < 1) {
      return alert("1개 이상의 아이템만 timegram posting 할 수 있어")
    }
    setTimegramModalShow(true)
 }

  // 10. api 연결
  const onAddTimegramHandler = (e) => {
    if (e.target.dataset.title.length < 2 || e.target.dataset.title == "" || e.target.dataset.title == undefined) {
      return alert("제목 2글자 이상")
    }

    const p_no = []
    for (let i = 0; i < myCardList.length; i++) {
      p_no.push(myCardList[i]["p_no"])
    }

    const body = {
      title: e.target.dataset.title,
      p_no : p_no,
      total_price: totalPrice,
      mem: 3 // todo : api 수정되면 뺄 것.
  }
    console.log("post 값 ", body)
    // axios.post(url + '/api/timegram/timegramCreate/', body, {
    //   headers: {
    //       Authorization: `jwt ${access_token}`
    //   }
    // }).then((res) => {
    //   console.log(res.data)
      
      setTotalPrice(0)
      setTmp([])

      alert("등록했다")
      setTimegramModalShow(false)
      // window.location = "/timegram"
    // }).catch((error) => {
    //     console.log(error.response)
    //     console.log(error.request)
    //     // console.log(error.response.message)
    // })
  }

  // 11. 삭제버튼 누르면 스크랩북 리스트에서 삭제
  const onClickDeleteItemHandler = (e) => {
    e.preventDefault();
    console.log(e.target.dataset.id)

    if (confirm("니 스크랩북에서 삭제할거니?")){
      alert("스크랩북에서 삭제")
      
      axios.delete(url + `/api/scrapbook/scrapbooklist/${e.target.dataset.id}`, {
        headers: {
            Authorization: `jwt ${access_token}`
        }
      }).then((res) => {
        console.log(res.data)
        // Todo
        // as-is : page reload (list reload 하면 useEffect 때문에 itemlist 에 추가됨)
        // to-be : list reload
        window.location.reload();
      })
    }

  }
  
  const onClickResetHandler = (e) => {
    setMyCardList([])
    setCardIdx(0)
    setTotalPrice(0)
  }

  function AddListModal() {
    return (
      <Modal size="lg" show={modalShow} centered onHide={() => setModalShow(false)}>
        <Modal.Header className="modal-header-custom">
            <h2 onClick={() => setModalShow(false)}>x</h2>
        </Modal.Header>
        <Modal.Body>
          <h2>Adding this item</h2>
          <h2>to your look?</h2>
          <div style={{ width: "30vw", textAlign: 'center', display: 'contents'}}>
            <Image src={tmp['src']} style={{ height: '200px', width: 'auto'}}/>
          </div>
            <p>{tmp['name']}</p>
            <p>${tmp['price']}</p>
          <button
              type="button"
              className="bg-purple-700 hover:bg-purple-800 text-lg text-white font-semibold rounded-lg"
              style={{
                fontFamily: 'neodgm',
                width: '80px',
                height: '35px',
              }}
              onClick={onAddHandler}
            >ADD</button>
        </Modal.Body>
      </Modal>
    );
  }

  function AddTimegramModal() {
    const [timegramTitle, setTimegramTitle] = useState("")

    const onChangeTitleHandler = (e) => {
      e.preventDefault();
      setTimegramTitle(e.target.value)
    }

    return (
      <Modal size="lg" show={timegramModalShow} centered onHide={() => setTimegramModalShow(false)} >
        <Modal.Header className="modal-header-custom">
          <h2 onClick={() => setTimegramModalShow(false)}>x</h2>
        </Modal.Header>
        <Modal.Body>
          {/* Todo : text-align check */}
          <div style={{textAlign: "center"}}>
            <h2>How would you like to</h2>
            <h2>name this look?</h2>
            {/* Todo : input bgc check background-color: rgba( 255, 255, 255, 0)} */}
            <div style={{marginTop: '2rem', marginBottom: '2rem', textAlign: "center", display: 'block'}}>
              <FormControl style={{margin: '1rem auto', textAlign: "center", width: "50%"}} type="text" placeholder="Enter Timegram Title" onChange={onChangeTitleHandler} />
            </div>
            <h4>Look Cost : ${totalPrice}</h4>
            <h4>Available Balance : $</h4>
          </div>
          <button
              type="button"
              className="bg-purple-700 hover:bg-purple-800 text-lg text-white font-semibold rounded-lg"
              style={{
                fontFamily: 'neodgm',
                width: '80px',
                height: '35px',
              }}
              data-title={timegramTitle}
              onClick={onAddTimegramHandler}
            >POST</button>
        </Modal.Body>
      </Modal>
    );
  }

  // 3. list 화면에 뿌리기
  const myTopList = topList.map((item, idx) => {
    return ([
      <SwiperSlide key={idx} >
        <div style={{textAlign: "center"}}>
          <Image src={item.p_no.p_image} onClick={onClickModalHandler} data-no={item.p_no.p_no} data-name={item.p_no.p_name} data-price={item.p_no.p_price} style={{ width: '30vw'}}/>
          <p>${item.p_no.p_price}</p>
          <button
              type="button"
              className="bg-purple-700 hover:bg-purple-800 text-lg text-white font-semibold rounded-lg"
              data-id={item.id}
              style={{
                fontFamily: 'neodgm',
                width: '30px',
                height: '25px',
              }}
              onClick={onClickDeleteItemHandler}
            >x</button>
        </div>
      </SwiperSlide>
    ]);
  });
  const myShoesList = shoesList.map((item, idx) => {
    return ([
      <SwiperSlide key={idx}>
        <div style={{textAlign: "center"}}>
          <Image src={item.p_no.p_image} onClick={onClickModalHandler} data-name={item.p_no.p_name} data-price={item.p_no.p_price} style={{ width: '30vw'}}/>
          <p>${item.p_no.p_price}</p>
        </div>
      </SwiperSlide>
    ]);
  });
  
  const myBottomList = bottomList.map((item, idx) => {
    return ([
      <SwiperSlide key={idx}>
        <div style={{textAlign: "center"}}>
          <Image src={item.p_no.p_image} onClick={onClickModalHandler} data-no={item.p_no.p_no} data-name={item.p_no.p_name} data-price={item.p_no.p_price} style={{ width: '30vw'}}/>
          <p>${item.p_no.p_price}</p>
        </div>
      </SwiperSlide>
    ]);
  });

  const myEtcList = etcList.map((item, idx) => {
    return ([
      <SwiperSlide key={idx}>
        <div style={{textAlign: "center"}}>
          <Image src={item.p_no.p_image} onClick={onClickModalHandler} data-no={item.p_no.p_no} data-name={item.p_no.p_name} data-price={item.p_no.p_price} style={{ width: '30vw'}}/>
          <p>${item.p_no.p_price}</p>
        </div>
      </SwiperSlide>
    ]);
  });

  return (
    <>
    {/* <GNB /> */}
    <Container className="main_container">
      <img src="https://drive.google.com/uc?export=download&id=1R1jZGiCoehKJpT65QSOKAW_jarwRkmpX"></img>
        <div className="md_row">
          <div className="card">
            <Card.Img variant="top" src={myCardList.length > 0 ? (myCardList[0]['src']) : ("")} data-idx={0} onClick={onClickDeleteHandler}/>
          </div>
          <div className="card">
            <Card.Img variant="top" src={myCardList.length > 1 ? (myCardList[1]['src']) : ("")} data-idx={1} onClick={onClickDeleteHandler}/>
          </div>
          <div className="card">
            <Card.Img variant="top" src={myCardList.length > 2 ? (myCardList[2]['src']) : ("")} data-idx={2} onClick={onClickDeleteHandler}/>
          </div>
        </div>
        <div className="md_row">
          <div className="card">
            <Card.Img variant="top" src={myCardList.length > 3 ? (myCardList[3]['src']) : ("")} data-idx={3} onClick={onClickDeleteHandler}/>
          </div>
          <div className="card">
            <Card.Img variant="top" src={myCardList.length > 4 ? (myCardList[4]['src']) : ("")} data-idx={4} onClick={onClickDeleteHandler}/>
          </div>
          <div className="card">
            <Card.Img variant="top" src={myCardList.length > 5 ? (myCardList[5]['src']) : ("")} data-idx={5} onClick={onClickDeleteHandler}/>
          </div>
        </div>
        <AddListModal onHide={() => setModalShow(false)} />
        <AddTimegramModal onHide={() => setTimegramModalShow(false)} />
        <div className="price_row">
          <h3>${totalPrice}</h3>
          <button
              type="button"
              className="bg-purple-700 hover:bg-purple-800 text-lg text-white font-semibold rounded-lg"
              style={{
                fontFamily: 'neodgm',
                width: '80px',
                height: '35px',
              }}
              onClick={onClickResetHandler}
            >Reset</button>
        </div>
        
        <div className="tab_row"> {/* 4. tab 4개로 분리 */}
              <Tabs defaultActiveKey="toplist" justify="true" >
                <Tab eventKey="toplist" title="Tops" >
                  <div className="tab-border">
                    <Swiper slidesPerView={2} spaceBetween={15} autoHeight={true} pagination={{ "dynamicBullets": true, "clickable": true}} observer = {true} observeParents={true} className="tops">
                      {myTopList}
                    </Swiper>
                  </div>
                </Tab>
                <Tab eventKey="bottomlist" title="Bottoms" >
                  <div className="tab-border">
                    <Swiper slidesPerView={2} spaceBetween={15} autoHeight={true} pagination={{ "dynamicBullets": true, "clickable": true}} observer = {true} observeParents={true} className="bottom">
                      {myBottomList}
                    </Swiper>
                  </div>
                </Tab>
                <Tab eventKey="shoeslist" title="Shoes" >
                  <div className="tab-border">
                    <Swiper slidesPerView={2} spaceBetween={15} autoHeight={true} pagination={{ "dynamicBullets": true, "clickable": true}} observer = {true} observeParents={true} className="shoes">
                      {myShoesList}
                    </Swiper>
                  </div>
                </Tab>
                <Tab eventKey="etclist" title="Etc" >
                  <div className="tab-border">
                    <Swiper slidesPerView={2} spaceBetween={15} autoHeight={true} pagination={{ "dynamicBullets": true, "clickable": true}} observer = {true} observeParents={true} className="etc">
                    </Swiper>
                  </div>
                </Tab>
              </Tabs>
        </div>
        <div className="md_row" >
          <button
              type="button"
              className="bg-purple-700 hover:bg-purple-800 text-lg text-white font-semibold rounded-lg"
              style={{
                fontFamily: 'neodgm',
                width: '270px',
                height: '35px',
                marginBottom: '1rem'
              }}
              onClick={onClickTimegramModalHandler}
            >Post on Timegram</button>
        </div>
    </Container>
    </>
    );
}
export default ScrapbookPage;
