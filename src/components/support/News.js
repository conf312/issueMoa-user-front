import { Row, Col, Card } from 'react-bootstrap';
import { heart, heartFill, chatBox } from '../../images';
import React, { useEffect, useState } from 'react';
import * as AxiosUtil from '../../lib/js/AxiosUtil';

function News() {
  useEffect(() => {
    AxiosUtil.send("GET", "/issuemoa/support/news/list", new FormData(), "", (e) => {
      console.log(e);
      // const data = e.data;
      // if (data !== undefined) {
      //   const bookmarkList = data.bookmarkList.data.content;
      //   if (bookmarkList !== undefined) {
      //     console.log(bookmarkList)
      //     setBookmarkList(bookmarkList);
      //   }
      // }
    });
  }, []);

  return (
    <Row xs={1} md={4} className="">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Col className="mt-3">
          <Card style={{ width: '27em'}}>
            <Card.Img style={{cursor: 'pointer'}} variant="top" src="https://s.pstatic.net/static/newsstand/2022/0720/article_img/new_main/9022/143236_001.jpg" />
            <Card.Body>
                <Card.Title>Card Topic</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content. https://s.pstatic.net build on the card title
                </Card.Text>
                <img src={heart} alt="heart" height="30px;"/>
                <text style={{color:"gray", marginLeft:5}}>23</text>
                <img src={chatBox} alt="chatBox" height="30px;" style={{marginLeft:20}}/>
                <text style={{color:"gray", marginLeft:5}}>17</text>
                <p className="text-end text-secondary">2022. 07. 20</p>
            </Card.Body>
        </Card>
        </Col>
      ))}
    </Row>
  );
}

export default News;
