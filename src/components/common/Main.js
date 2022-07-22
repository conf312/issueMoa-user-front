import '../../App.css';
import { Topic, News } from '../index';
import { Tab, Tabs, Carousel } from 'react-bootstrap';

function Main() {
  return (
    <div className="Issuemoa-main">
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://1.bp.blogspot.com/-ACs0W9CKqgk/XP29557DNRI/AAAAAAAAB3s/oDuo8NPJVjAVyPWrLC5D0fF3FUPpTx82QCLcBGAs/s1600/44.gif"
              alt="First slide"
              height={"700px;"}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://1.bp.blogspot.com/-h_b7Xv7HAsk/XP298EENDEI/AAAAAAAAB4A/jYLTzHkmfyo4ztMzXrz-mwHOuvCCWFj_QCLcBGAs/s1600/99.gif"
              alt="Second slide"
              height={"700px;"}
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://1.bp.blogspot.com/-X8UxmMg0Ueg/XP297HtYR2I/AAAAAAAAB34/FMyx1f4cg3sk5U4aaIERMLsCzX6Da7OagCLcBGAs/s1600/77.gif"
              alt="Second slide"
              height={"700px;"}
            />
            <Carousel.Caption>
              <h3>Three slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="m-5">
        <Tabs
            defaultActiveKey="topic"
            id="uncontrolled-tab-example"
            className="h4 mt-5 fw-bold"
            >
          <Tab eventKey="topic" title="Topic">
            <Topic/>
          </Tab>
          <Tab eventKey="news" title="News">
            <News/>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default Main;