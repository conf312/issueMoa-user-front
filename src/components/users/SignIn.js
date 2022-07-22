import { Form, Button, FloatingLabel, Row, Col }  from 'react-bootstrap';
import { personGreen, naverIcon, googleIcon, kakaoIcon } from '../../images';
import React, { useState } from 'react';

function SignUp() {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      alert("success")
    }
    setValidated(true);
  };

  return (
    <Form className="container mt-5" noValidate validated={validated} onSubmit={handleSubmit} style={{width:"350px", height:"850px"}}>
      <div className="text-center">
        <img src={personGreen} alt="person" height={"200px"}/>
      </div>
      <Row className="mt-3">
        <Col md>
          <FloatingLabel label="Email address">
            <Form.Control type="email" placeholder="name@example.com" maxLength={100} required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel className="mt-3" label="Password">
        <Form.Control type="password" placeholder="Password" maxLength={100} required />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password.
        </Form.Control.Feedback>
      </FloatingLabel>
      <Button className="mt-3 fw-bold" type="submit" style={{width:"326px", height:"50px"}}>Login</Button>
      <div className="text-center mt-3">
        <img src={naverIcon} className="m-3" alt="naverIcon" height={"70px"} style={{cursor:"pointer"}} />
        <img src={googleIcon} className="m-3" alt="googleIcon" height={"70px"} style={{cursor:"pointer"}} />
        <img src={kakaoIcon} className="m-3" alt="googleIcon" height={"70px"}style={{cursor:"pointer"}} />
      </div>
    </Form>
  );
}

export default SignUp;