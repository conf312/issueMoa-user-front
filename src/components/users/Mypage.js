import { Form, Button, Card, Row, Col, Toast }  from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import * as AxiosUtil from '../../lib/js/AxiosUtil';
import { personGreen, heartFill, plusGreen, writing, messageCloud, exit } from '../../images';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function MyPage() {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddr, setUserAddr] = useState("");
  const [visit, setVisit] = useState("");
  const [show, setShow] = useState(false);
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

  function getProfileModify(id) {
    alert("getProfileModify : " + id);
  }

  function deleteBookmark(id) {
    const formData = new FormData();
    formData.append("id", id);
    AxiosUtil.send("POST", "/issuemoa/support/bookmark/deleteById", formData, "", (e) => {
      setShow(true);
      setBookmarkList(current =>
        current.filter(bookmarkList => {
          return bookmarkList.id !== id;
        }),
      );
    });
  }

  useEffect(() => {
    AxiosUtil.send("POST", "/issuemoa/users/my-page/index", new FormData(), "", (e) => {
      console.log(e);
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
    <Form id="frm" className="m-5" style={{ height:"850px" }}>
      <h3 className="fw-bold">My profile</h3>
      <div className="text-left float-start mt-3">
        <img src={personGreen} alt="personGreen" height={"100px"}/>
        <Row className="mt-3">
            <h5 className="fw-bold">Name</h5>
            <h6>{userName}</h6>
        </Row>
        <Row className="mt-3">
            <h5 className="fw-bold">Email</h5>
            <h6>{userEmail}</h6>
        </Row>
        <Row className="mt-3">
            <h5 className="fw-bold">Address</h5>
            <h6>{userAddr}</h6>
        </Row>
        <Button className="mt-3 fw-bold" onClick={()=>getProfileModify(userId)}>Modify</Button>
      </div>
      <div className="mt-5">
        <Row>
          <Col>
            <img src={exit} alt="exit" height={"30px"} className="float-start"/>
            <h3 className="fw-bold">Visit</h3>
            <h4>{visit}</h4>
          </Col>
          <Col>
            <img src={writing} alt="exit" height={"30px"} className="float-start"/>
            <h3 className="fw-bold">Writing</h3>
            <h4>0</h4>
          </Col>
          <Col>
            <img src={messageCloud} alt="exit" height={"30px"} className="float-start"/>
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
          <div className="text-slider-wrapper">
            <Carousel 
              arrows={true}
              responsive={responsive}
            >
              {bookmarkList.map((data, idx) => (
                <Card className="m-1" key={data.id} draggable={false}>
                  <Card.Img style={{cursor: 'pointer'}} variant="top" draggable={false} src="https://s.pstatic.net/static/newsstand/2022/0720/article_img/new_main/9022/143236_001.jpg" />
                  <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    {/* <Card.Text>
                      Some quick example text to build on the card title and make up the
                    </Card.Text> */}
                    <img src={heartFill} alt="heartFill" onClick={() => deleteBookmark(data.id)} height="30px;" style={{cursor: 'pointer'}}/>
                    <span className="float-end text-secondary">{data.registerTime}</span>
                  </Card.Body>
                </Card>
              ))}
            </Carousel>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
              <Toast.Header>
                <strong className="me-auto">Deleted successfully!</strong>
                <small>just a moment ago</small>
              </Toast.Header>
              {/* <Toast.Body>Deleted successfully.</Toast.Body> */}
            </Toast>
          </div>
        </Row>
      </div>
    </Form>
  );
}

export default MyPage;