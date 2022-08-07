import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import * as AxiosUtil from '../../lib/js/AxiosUtil';
import { heart, heartFill, chatBox } from '../../images';

function Topic() {
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    AxiosUtil.send("GET", "/issuemoa/support/news/list", new FormData(), "", (e) => {
      console.log(e);
      const data = e.data;
      if (data !== undefined) {
        setTopicList(data.list);
      }
    });
  }, []);

  function removeTag(str) {
    return str.replace(/(<([^>]+)>)/ig, "");
  }
  
  return (
    <>
      <h3 className="fw-bold mt-5">Stock</h3>
      <Row xs={1} md={4} className="m-1">
        {topicList.map((data, idx) => (
          <Col className="mt-3">
            <Card style={{ width: '27em', backgroundColor:"black" }}>
              <Card.Img style={{cursor: 'pointer'}} variant="top" src="https://s.pstatic.net/static/newsstand/2022/0720/article_img/new_main/9193/141955_001.jpg" />
              <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Text>
                    {
                      removeTag(data.contents).length < 50 ? 
                      removeTag(data.contents) : removeTag(data.contents).slice(0, 50) + '...'
                    }
                  </Card.Text>
                  <img src={heart} alt="heart" height="30px;"/>
                  <text style={{color:"gray", marginLeft:5}}>23</text>
                  <img src={chatBox} alt="chatbox" height="30px;" style={{marginLeft:20}}/>
                  <text style={{color:"gray", marginLeft:5}}>17</text>
                  <p className="text-end text-secondary">{data.registerTime.substring(0,10)}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Topic;
