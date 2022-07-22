import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card } from 'react-bootstrap';
import { heart, heartFill, chatBox } from '../../images';

function Topic() {
  return (
    <Row xs={1} md={4} className="">
      {Array.from({ length: 7 }).map((_, idx) => (
        <Col className="mt-3">
          <Card style={{ width: '27em'}}>
            <Card.Img style={{cursor: 'pointer'}} variant="top" src="https://s.pstatic.net/static/newsstand/2022/0720/article_img/new_main/9193/141955_001.jpg" />
            <Card.Body>
                <Card.Title>Card Topic</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
                <img src={heart} alt="heart" height="30px;"/>
                <text style={{color:"gray", marginLeft:5}}>23</text>
                <img src={chatBox} alt="chatbox" height="30px;" style={{marginLeft:20}}/>
                <text style={{color:"gray", marginLeft:5}}>17</text>
                <p className="text-end text-secondary">2022. 07. 20</p>
            </Card.Body>
        </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Topic;
