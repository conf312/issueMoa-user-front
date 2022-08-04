import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import * as AxiosUtil from '../../lib/js/AxiosUtil';
import { heart, heartFill, chatBox } from '../../images';
import Carousel from 'react-multi-carousel';

function MainContents() {
  const [topicList, setTopicList] = useState([]);
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
    <div className="mt-3">
        <div className="text-slider-wrapper">
          <Carousel 
            arrows={true}
            responsive={responsive}
            minimumTouchDrag={130}
          >
            {topicList.map((data, idx) => (
              <Card style={{ backgroundColor:"black"}}>
                <Card.Img style={{cursor: 'pointer'}} draggable={false} variant="top" src="https://s.pstatic.net/static/newsstand/2022/0720/article_img/new_main/9193/141955_001.jpg" />
                <Card.Body>
                  {/* <Card.Title className="text-light">{removeTag(data.title)}</Card.Title> */}
                  <p>{removeTag(data.title)}</p>
                </Card.Body>
              </Card>
            ))}
          </Carousel>
        </div>
    </div>
  );
}

export default MainContents;
