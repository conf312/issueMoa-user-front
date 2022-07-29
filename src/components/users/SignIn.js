import { Form, Button, FloatingLabel, Row, Col }  from 'react-bootstrap';
import { personGreen, naverIcon, googleIcon, kakaoIcon } from '../../images';
import { Cookies } from "react-cookie";
import React, { useState } from 'react';
import * as AxiosUtil from '../../lib/js/AxiosUtil';

function SignIn() {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (form.checkValidity()) {
      AxiosUtil.send("POST", "/issuemoa/users/login", formData, "", (e) => {
        console.log(e);
          if (e.code === "LGN") {
              const cookies = new Cookies();
              /*
              path (string): cookie path, use / as the path if you want your cookie to be accessible on all pages
              expires (Date): absolute expiration date for the cookie
              maxAge (number): relative max age of the cookie from when the client receives it in seconds
              domain (string): domain for the cookie (sub.domain.com or .allsubdomains.com)
              secure (boolean): Is only accessible through HTTPS?
              httpOnly (boolean): Can only the server access the cookie? Note: You cannot get or set httpOnly cookies from the browser, only the server.
              sameSite (boolean|none|lax|strict): Strict or Lax enforcement
              */
              cookies.set("accessToken", e.accessToken, {
                  path: "/"
              });

              cookies.set("authFlag", true, {
                path: "/",
                maxAge: e.accessTokenExpires
              });

              window.location.href = "/";
          }
      });
    }
  };

  return (
    <Form className="container mt-5" noValidate validated={validated} onSubmit={handleSubmit} style={{width:"350px", height:"850px"}}>
      <div className="text-center">
        <img src={personGreen} alt="person" height={"200px"}/>
      </div>
      <Row className="mt-4">
        <Col md>
          <FloatingLabel label="Email">
            <Form.Control type="email" name="email" placeholder="name@example.com" maxLength={100} required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel className="mt-3" label="Password">
        <Form.Control type="password" name="password" placeholder="Password" maxLength={100} required />
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

export default SignIn;