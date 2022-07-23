import { Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap';
import { celebrate } from '../../images';

function getSignInPage() {
  window.location.href = "/SignIn";
}

function SignUpComplete() {
  return (
    <Form className="container mt-5" style={{width:"350px", height:"850px"}}>
      <div className="text-center">
        <img src={celebrate} alt="person" height={"200px"}/>
      </div>
      <Row className="mt-3">
        <Col md>
          <h3>Welcome to IssueMoa!</h3>
        </Col>
      </Row>
      <Button className="mt-3 fw-bold" type="submit" onClick={getSignInPage} style={{width:"326px", height:"50px"}}>Login</Button>
    </Form>
  );
}

export default SignUpComplete;