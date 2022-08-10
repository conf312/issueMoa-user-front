import { Form, Card, Row, Col, Toast }  from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import * as AxiosUtil from '../../lib/js/AxiosUtil';
import { personGreen, heartFill, plusGreen, editFull } from '../../images';
import Carousel from 'react-multi-carousel';
import ChangePassword from '../modal/ChangePassword';
import ChangeName from '../modal/ChangeName';
import ChangeAddress from '../modal/ChangeAddress';

function MyPage() {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddr, setUserAddr] = useState("");
  const [visit, setVisit] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const [modalChgPwdShow, setModalChgPwdShow] = useState(false);
  const [modalChgNameShow, setModalChgNameShow] = useState(false);
  const [modalChgAddrShow, setModalChgAddrShow] = useState(false);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const btnEdit = {        
    cursor: 'pointer', marginLeft:"5px", height:"30px", width:"25%"  
  };

  function changePassword(pwd) {
    const formData = new FormData();
    formData.append("id", userId);
    formData.append("password", pwd);
    AxiosUtil.send("POST", "/issuemoa/users/my-page/update-password", formData, "", (e) => {
      if (e.data > 0) {
        alert("This has been changed.");
      } else {
        alert("An error has occurred. Please try in a moment.");
      }
      setModalChgPwdShow(false);
    });
  }

  function changeName(lastName, firstName) {
    const formData = new FormData();
    formData.append("id", userId);
    formData.append("lastName", lastName);
    formData.append("firstName", firstName);
    AxiosUtil.send("POST", "/issuemoa/users/my-page/update-name", formData, "", (e) => {
      if (e.data > 0) {
        setUserName(firstName + lastName);
        alert("This has been changed.");
      } else {
        alert("An error has occurred. Please try in a moment.");
      }
      setModalChgNameShow(false);
    });
  }

  function changeAddress(addrPostNo, addr) {
    const formData = new FormData();
    formData.append("id", userId);
    formData.append("addr", addr);
    formData.append("addrPostNo", addrPostNo);
    AxiosUtil.send("POST", "/issuemoa/users/my-page/update-address", formData, "", (e) => {
      if (e.data > 0) {
        alert("This has been changed.");
        setUserAddr(addrPostNo + " " + addr);
      } else {
        alert("An error has occurred. Please try in a moment.");
      }
      setModalChgAddrShow(false);
    });
  }

  function deleteBookmark(id) {
    const formData = new FormData();
    formData.append("id", id);
    AxiosUtil.send("POST", "/issuemoa/support/bookmark/deleteById", formData, "", (e) => {
      setToastShow(true);
      setBookmarkList(current =>
        current.filter(bookmarkList => {
          return bookmarkList.id !== id;
        }),
      );
    });
  }

  useEffect(() => {
    AxiosUtil.send("POST", "/issuemoa/users/my-page/index", new FormData(), "", (e) => {
      const data = e.data;
      if (data !== undefined) {
        const userInfo = data.userInfo;
        if (userInfo !== undefined) {
          setUserId(userInfo.id);
          setUserName(userInfo.firstName + userInfo.lastName);
          setUserEmail(userInfo.email);
          setUserAddr(userInfo.addrPostNo + " " + userInfo.addr);
          setVisit(userInfo.visitCnt);
        }

        const bookmarkList = data.bookmarkList.data.content;
        if (bookmarkList !== undefined) {
          console.log(bookmarkList)
          setBookmarkList(bookmarkList);
        }
      }
    });
  }, []);

  return (
    <Form id="frm" className="m-5 Issuemoa-main" style={{ height:"850px" }}>
      <h3 className="fw-bold">My Profile</h3>
      <div className="text-left float-start mt-3" style={{width:"15%"}}>
        <img src={personGreen} alt="personGreen" height={"100px"}/>
        <Row className="mt-4">
            <h5 className="fw-bold" style={{width:"50%"}}>Email</h5>
            <h6 className="mt-1" style={{width:"77%"}}>{userEmail}</h6>
        </Row>
        <Row className="mt-4">
            <h5 className="fw-bold" style={{width:"50%"}}>Password</h5>
            <img src={editFull} alt="editFull" onClick={() => setModalChgPwdShow(true)} style={btnEdit} />
        </Row>
        <hr width="50%"></hr>
        <Row className="mt-4">
            <h5 className="fw-bold" style={{width:"50%"}}>Name</h5>
            <img src={editFull} alt="editFull" onClick={() => setModalChgNameShow(true)} style={btnEdit} />
            <h6 className="mt-1" style={{width:"77%"}}>{userName}</h6>
        </Row>
        <Row className="mt-3">
            <h5 className="fw-bold" style={{width:"50%"}}>Address</h5>
            <img src={editFull} alt="editFull" onClick={() => setModalChgAddrShow(true)} style={btnEdit} />
            <h6 className="mt-1" style={{width:"77%"}}>{userAddr}</h6>
        </Row>
      </div>
      <div className="mt-5">
        <Row>
          <Col>
            <h3 className="fw-bold">Visit</h3>
            <h4>{visit}</h4>
          </Col>
          <Col>
            <h3 className="fw-bold">Writing</h3>
            <h4>0</h4>
          </Col>
          <Col>
            <h3 className="fw-bold">Writing comments</h3>
            <h4>12</h4>
          </Col>
        </Row>
      </div>
      <div className="mt-5">
        <Row>
          <div>
            <h3 className="fw-bold float-start">Bookmark</h3>
            <img src={plusGreen} alt="heartFill" height="35px;" style={{cursor: 'pointer', marginLeft:"5px"}}/>
          </div>
          <div className="text-slider-wrapper m-1">
            <Carousel 
              arrows={true}
              responsive={responsive}
              itemClass="react-multi-carousel-item-mypage"
            >
            {bookmarkList.map((data, idx) => (
              <Card className="mt-1" key={data.id} style={{ backgroundColor:"black"}}>
                <Card.Img style={{cursor: 'pointer'}} draggable={false} src="https://s.pstatic.net/static/newsstand/2022/0720/article_img/new_main/9022/143236_001.jpg" />
                <div className="m-2">
                  <img src={heartFill} alt="heartFill" onClick={() => deleteBookmark(data.id)} height="30px;" width="30px;" style={{cursor: 'pointer', float:"left"}}/>
                  <Card.Title>{data.title}</Card.Title>
                </div>
              </Card>
            ))}
            </Carousel>
            <Toast onClose={() => setToastShow(false)} show={toastShow} delay={3000} autohide>
              <Toast.Header>
                <strong className="me-auto">Deleted successfully!</strong>
                <small>just a moment ago</small>
              </Toast.Header>
            </Toast>
          </div>
        </Row>
      </div>
      <ChangePassword 
        show={modalChgPwdShow}
        onHide={() => setModalChgPwdShow(false)}
        changePassword={changePassword}
      />
      <ChangeName 
        show={modalChgNameShow}
        onHide={() => setModalChgNameShow(false)}
        changeName={changeName}
      />
      <ChangeAddress 
        show={modalChgAddrShow}
        onHide={() => setModalChgAddrShow(false)}
        changeAddress={changeAddress}
      />
    </Form>
  );
}

export default MyPage;