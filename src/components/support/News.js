import React, { useEffect, useState, useCallback } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useInView } from "react-intersection-observer"
import Carousel from 'react-multi-carousel';
import * as AxiosUtil from '../../lib/js/AxiosUtil';
import { plusGreen } from '../../images';

function News(props) {
  
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

  function removeTag(str) {
    return str.replace(/(<([^>]+)>)/ig, "");
  }

  function getNewsList() {
    window.location.href = "/news";
  }

  const SliderNews = () => {
    const [newsList, setNewsList] = useState([])
    useEffect(() => {
      AxiosUtil.send("GET", "/issuemoa/support/news/list", new FormData(), "", (e) => {
        setNewsList(e.data.list);
      });
    }, []);
    return (
      <>
        <h3 className="fw-bold mt-5">News <img className="Cursor-pointer" src={plusGreen} alt="plus" width="35px" onClick={() => getNewsList()}/></h3>
        <div className="mt-3">
            <div className="text-slider-wrapper">
              <Carousel 
                arrows={true}
                responsive={responsive}
                minimumTouchDrag={130}
              >
                {newsList.map((data, idx) => (
                  <Card key={idx} style={{ backgroundColor:"black"}}>
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

  const MoreNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ref, inView] = useInView();

    const getNewsList = useCallback(async () => {
      setLoading(true)
      AxiosUtil.asyncSend("GET", `/issuemoa/support/news/list?page=${page}&pageSize=24`, new FormData(), "", (e) => {
        const data = e.data;
        if (data !== undefined) {
          setNewsList(prevState => [...prevState, ...data.list]);
        }
      });
      setLoading(false)
    }, [page])
  
    useEffect(() => {
      getNewsList();
    }, [getNewsList])
  
    useEffect(() => {
      if (inView && !loading) {
        setPage(prevState => prevState + 24)
      }
    }, [inView, loading])

    return (
      <>
        <div className="Issuemoa-main m-5">
          <h2 className="fw-bold mt-5">News</h2>
          <hr></hr>
          <div className="mt-3">
            <Row xs={1} md={4} className="g-5">
              {newsList.map((data, idx) => (
                newsList.length - 1 === idx ? (
                  <Col key={idx} ref={ref} id="last">
                    <Card style={{ backgroundColor:"black"}}>
                      <Card.Body>
                        <Card.Title style={{width:"60%", float:"left"}}>{data.title}</Card.Title>
                        <Card.Img style={{width:"35%", cursor: 'pointer', marginLeft:"5px"}} src={data.videoUrl} onClick={() => window.open(data.contents, '_blank')} />
                      </Card.Body>
                    </Card>
                  </Col>
                ) : (
                  <Col key={idx}>
                    <Card style={{ backgroundColor:"black"}}>
                      <Card.Body>
                        <Card.Title style={{width:"60%", float:"left"}}>{data.title}</Card.Title>
                        <Card.Img style={{width:"35%", cursor: 'pointer', marginLeft:"5px"}} src={data.videoUrl} onClick={() => window.open(data.contents, '_blank')} />
                      </Card.Body>
                    </Card>
                  </Col>
                )
              ))}
            </Row>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      { props.type === "slider" && <SliderNews /> }
      { props.type === "more" && <MoreNews /> }
    </>
  );
}

export default News;
