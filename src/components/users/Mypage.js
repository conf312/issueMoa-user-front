import { Form, Button, Card, Row, Col }  from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import * as AxiosUtil from '../../lib/js/AxiosUtil';
import { personGreen, heartFill, plusGreen, writing, messageCloud, exit } from '../../images';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function MyPage() {
  useEffect(() => {
    AxiosUtil.send("POST", "/issuemoa/users/my-page/index", new FormData(), "", (e) => {
      console.log(e);
      const data = e.data;
      if (data !== undefined) {
        const userInfo = data.userInfo;
        if (userInfo !== undefined) {
          setUserName(userInfo.firstName + userInfo.lastName);
          setUserEmail(userInfo.email);
          setUserAddr(userInfo.addrPostNo + " " + userInfo.addr);
        }
      }
    });
  }, []);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddr, setUserAddr] = useState("");

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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
        <Button className="mt-3 fw-bold" type="submit">Modify</Button>
      </div>
      <div className="mt-5">
        <Row>
          <Col>
            <img src={exit} alt="exit" height={"30px"} className="float-start"/>
            <h3 className="fw-bold">Visit</h3>
            <h5>332</h5>
          </Col>
          <Col>
            <img src={writing} alt="exit" height={"30px"} className="float-start"/>
            <h3 className="fw-bold">Writing</h3>
            <h5>0</h5>
          </Col>
          <Col>
            <img src={messageCloud} alt="exit" height={"30px"} className="float-start"/>
            <h3 className="fw-bold">Writing comments</h3>
            <h5>12</h5>
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
              draggable={false}
              responsive={responsive}
            >
              {Array.from({ length: 5 }).map((_, idx) => (
                <Card className="m-1">
                  <Card.Img style={{cursor: 'pointer'}} variant="top" src="https://s.pstatic.net/static/newsstand/2022/0720/article_img/new_main/9022/143236_001.jpg" />
                  <Card.Body>
                    <Card.Title>Card Topic</Card.Title>
                    {/* <Card.Text>
                      Some quick example text to build on the card title and make up the
                    </Card.Text> */}
                    <img src={heartFill} alt="heartFill" height="30px;" style={{cursor: 'pointer'}}/>
                    <span className="float-end text-secondary">2022. 07. 20</span>
                  </Card.Body>
                </Card>
              ))}
            </Carousel>
          </div>
        </Row>
      </div>
    </Form>
  );
}

export default MyPage;