import React, { useEffect, useState } from 'react';
import { Tab, Tabs, Row, Col } from 'react-bootstrap';
import * as AxiosUtil from '../../lib/js/AxiosUtil';

function Stock() {
  const [kospiList, setKospiList] = useState([]);
  const [kosdaqList, setKosdaqList] = useState([]);

  useEffect(() => {
    const STOCK_KEY = process.env.REACT_APP_STOCK_KEY;
    AxiosUtil.send("GET", "/krxStock?serviceKey=" + STOCK_KEY + "&numOfRows=10&resultType=json&mrktCls=KOSPI&beginMrktTotAmt=35000000000000"
      , "", "", (e) => {
      setKospiList(e.response.body.items.item);
    });
    AxiosUtil.send("GET", "/krxStock?serviceKey=" + STOCK_KEY + "&numOfRows=10&resultType=json&mrktCls=KOSDAQ&beginMrktTotAmt=2500000000000"
      , "", "", (e) => {
      setKosdaqList(e.response.body.items.item);
    });
  }, []);

  function numberFormat(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  function stockFormat(type, vs, data) {
    if (vs > 0) {
      data = type === "vs" ? "▲ " + numberFormat(vs) : type === "fltRt" ? "+" + data + "%" : numberFormat(data);
      return <h5 className="text-break text-danger">{data}</h5>
    } else if (vs < 0) {
      data = type === "vs" ? "▼ " + numberFormat(vs) : type === "fltRt" ? data + "%" : numberFormat(data);
      return <h5 className="text-break text-primary">{data}</h5>
    } else {
      data = type === "vs" ? "-" : type === "fltRt" ? "0.00%" : numberFormat(data);
      return <h5 className="text-break">{data}</h5>
    }
  }

  return (
    <>
      <h3 className="fw-bold mt-5">Stock</h3>
      <Tabs
        defaultActiveKey="kospi"
        className="m-2 mt-4 fw-bold"
      >
        <Tab eventKey="kospi" title="KOSPI">
          <Row className="m-1 mt-4">
            <Col>
              <h5 className="text-break fw-bold">종목명</h5>
            </Col>
            <Col>
              <h5 className="text-break fw-bold">가격</h5>
            </Col>
            <Col>
              <h5 className="text-break fw-bold">전일비</h5>
            </Col>
            <Col>
              <h5 className="text-break fw-bold">등락률</h5>
            </Col>
          </Row>
          <hr></hr>
          {kospiList.map((data, idx) => (
            <Row className="m-2">
              <Col>
                <h5 className="text-break">{data.itmsNm}</h5>
              </Col>
              <Col>
                { stockFormat("", data.vs, data.clpr) }
              </Col>
              <Col>
                { stockFormat("vs", data.vs , "") }
              </Col>
              <Col>
                { stockFormat("fltRt", data.vs, data.fltRt) }
              </Col>
            </Row>
          ))}
        </Tab>
        <Tab eventKey="kosdaq" title="KOSDAQ">
          <Row className="m-1 mt-4">
            <Col>
              <h5 className="text-break fw-bold">종목명</h5>
            </Col>
            <Col>
              <h5 className="text-break fw-bold">가격</h5>
            </Col>
            <Col>
              <h5 className="text-break fw-bold">전일비</h5>
            </Col>
            <Col>
              <h5 className="text-break fw-bold">등락률</h5>
            </Col>
          </Row>
          <hr></hr>
          {kosdaqList.map((data, idx) => (
            <Row className="m-2">
              <Col>
                <h5 className="text-break">{data.itmsNm}</h5>
              </Col>
              <Col>
                { stockFormat("", data.vs, data.clpr) }
              </Col>
              <Col>
                { stockFormat("vs", data.vs , "") }
              </Col>
              <Col>
                { stockFormat("fltRt", data.vs, data.fltRt) }
              </Col>
            </Row>
          ))}
        </Tab>
      </Tabs>
    </>
  );
}

export default Stock;
