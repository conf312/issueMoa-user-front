import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import * as AxiosUtil from '../../lib/js/AxiosUtil';
import { heart, heartFill, chatBox } from '../../images';

// info interface
interface Iinfo {
  name: string;
  phone: string;
  age: number;
  title: string;
  contents: string;
  registerTime: string;
}

const MockScroll = () => {

  function removeTag(str) {
    return str.replace(/(<([^>]+)>)/ig, "");
  }

  // state
  const [infoArray, setInfoArray] = React.useState<Iinfo[]>([]);

  // ref
  const observerRef = React.useRef<IntersectionObserver>();
  const boxRef = React.useRef<HTMLDivElement>(null);

  // useEffect
  React.useEffect(() => {
      getInfo();
  }, [])

  React.useEffect(() => {
      observerRef.current = new IntersectionObserver(intersectionObserver); // IntersectionObserver
      boxRef.current && observerRef.current.observe(boxRef.current);
  }, [infoArray])

  const getInfo = async () => {
      console.log('info data add...');
      AxiosUtil.send("GET", "/issuemoa/support/news/list", new FormData(), "", (e: any) => {
        console.log(e);
        setInfoArray((curInfoArray) => [...curInfoArray, ...e.data.list]);
      });
  }

  // IntersectionObserver 설정
  const intersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
      entries.forEach((entry) => {
          if(entry.isIntersecting) { // 관찰하고 있는 entry가 화면에 보여지는 경우
              io.unobserve(entry.target); // entry 관찰 해제
              getInfo(); // 데이터 가져오기
          }
      })
  }

  // style
  const Wrapper = {
      width: '800px',
      margin: '0 auto'
  }

  const Box = {
      border: '1px solid olive',
      borderRadius: '8px',
      boxShadow: '1px 1px 2px olive',
      margin: '18px 0'
  }

  const BoxTable = {
      borderSpacing: '15px'
  }

  const Title = {
    fontWeight: 700
  }

  return (
    <Row xs={1} md={4}>
      {infoArray.map((info, index) => {
        console.log(index)
        if(infoArray.length-5 === index) {
          // 관찰되는 요소가 있는 html, 아래에서 5번째에 해당하는 박스를 관찰
        return (
            <div style={Box} ref={boxRef} key={index}>
              <table style={BoxTable}>
                <tbody>
                  <tr>
                    <td style={Title}>{info.title}2222</td>
                    <td>{info.name}</td>
                  </tr>
                  <tr>
                    <td style={Title}>전화번호</td>
                    <td>{info.phone}</td>
                  </tr>
                  <tr>
                    <td style={Title}>나이</td>
                    <td>{info.age}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        } else {
          // 관찰되는 요소가 없는 html
          return (
            <Col className="mt-3">
            <Card style={{ width: '27em'}}>
              <Card.Img style={{cursor: 'pointer'}} variant="top" src="https://s.pstatic.net/static/newsstand/2022/0720/article_img/new_main/9193/141955_001.jpg" />
              <Card.Body>
                <Card.Title>{info.title}</Card.Title>
                <Card.Text>
                  {
                    removeTag(info.contents).length < 50 ? 
                    removeTag(info.contents) : removeTag(info.contents).slice(0, 50) + '...'
                  }
                </Card.Text>
                <img src={heart} alt="heart" height="30px;"/>
                <text style={{color:"gray", marginLeft:5}}>23</text>
                <img src={chatBox} alt="chatbox" height="30px;" style={{marginLeft:20}}/>
                <text style={{color:"gray", marginLeft:5}}>17</text>
                <p className="text-end text-secondary">{info.registerTime.substring(0,10)}</p>
              </Card.Body>
            </Card>
          </Col>
          )
        }
      })}
    </Row>
  )
}

export default MockScroll;