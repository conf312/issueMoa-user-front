import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import * as AxiosUtil from '../../lib/js/AxiosUtil';
import Carousel from 'react-multi-carousel';

function News() {
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
    <>
      <h3 className="fw-bold mt-5">News</h3>
      <div className="mt-3">
          <div className="text-slider-wrapper">
            <Carousel 
              arrows={true}
              responsive={responsive}
              minimumTouchDrag={130}
            >
              {topicList.map((data, idx) => (
                <Card style={{ backgroundColor:"black"}}>
                  <Card.Img style={{cursor: 'pointer'}} draggable={false} variant="top" src={data.videoUrl} onClick={() => window.open(data.contents, '_blank')} />
                  <p className="mt-2">{removeTag(data.title).substring(0, 22)}</p>
                </Card>
              ))}
            </Carousel>
          </div>
      </div>
    </>
  );
}

export default News;
