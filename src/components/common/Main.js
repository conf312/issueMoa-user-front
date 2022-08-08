import '../../App.css';
import { News, Youtube, Stock, Notice, FAQ } from '../index';
import { Carousel, Row, Form, Col } from 'react-bootstrap';
import { main01, main02, main03 } from '../../images';

function Main() {
  return (
    <div className="Issuemoa-main">
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={main01}
              alt="main01 slide"
              height={"450px;"}
            />
            <Carousel.Caption>
              <h3>Watcher's Eye</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={main02}
              alt="main02 slide"
              height={"450px;"}
            />
            <Carousel.Caption>
              <h3>Forbidden Flame</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={main03}
              alt="main03 slide"
              height={"450px;"}
            />
            <Carousel.Caption>
              <h3>Dying Sun</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="m-3">
        <News />
        <Youtube />
        <img src="https://image.tving.com/upload/fe/highlight/2022/0729/20220729172440banner_image_url_u.jpg/dims/resize/F_webp,-1" className="mt-5" width="100%" height="150px;"></img>
        <Stock />
        <Row className="m-2 mt-5">
          <Form.Group as={Col} controlId="formGridEmail">
            <Notice />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <FAQ />
          </Form.Group>
        </Row>
      </div>
    </div>
  )
}

export default Main;