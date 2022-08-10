import { Form, Button, FloatingLabel }  from 'react-bootstrap';
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
              cookies.set("accessToken", e.accessToken, {
                  path: "/"
              });
              cookies.set("authFlag", true, {
                path: "/",
                maxAge: e.accessTokenExpires
              });

              window.location.href = "/";
          } else if (e.code === "IV_LGN") {
            alert("No matching member information found.");
          }
      });
    }
  };

  return (
    <Form className="container mt-5" noValidate validated={validated} onSubmit={handleSubmit} style={{width:"350px", height:"850px"}}>
      <div className="text-center">
        <img src={personGreen} alt="person" height={"200px"}/>
      </div>
      <FloatingLabel label="Email" className="mt-4">
        <Form.Control type="email" style={{color:"gray"}} name="email" placeholder="name@example.com" maxLength={100} required />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email.
        </Form.Control.Feedback>
      </FloatingLabel>
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