import { Form, Button, InputGroup, FloatingLabel, Row, Col } from 'react-bootstrap';
import { person } from '../../images';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import React, { useRef, useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as AxiosUtil from '../../lib/js/AxiosUtil';
import { useParams } from "react-router-dom";

function SignUp() {
  const params = useParams();
  useEffect(() => {
    if (params.email != null && params.name != null) {
      email.current.value = params.email;
      firstName.current.value = params.name;
    }
  }, []);

  const email = useRef(null);
  const firstName = useRef(null);
  const password = useRef(null);
  const passwordConfirm = useRef(null);
  const addrPostNo = useRef(null);
  const addr = useRef(null);
  const serachAddressOpen = useDaumPostcodePopup("https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  const serachAddressComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    addrPostNo.current.value = data.zonecode;
    addr.current.value = fullAddress;
  };
  const serachAddress = () => {
    serachAddressOpen({ onComplete: serachAddressComplete });
  };

  const [recaptchaValue, setRecaptchaValue] = useState(false);
  const onChangeRecaptcha = (value) => {
    setRecaptchaValue(value);
  }

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (form.checkValidity()) {
      AxiosUtil.send("POST", "/issuemoa/users/count-by/email", formData, "", (e) => {
        if (e.data > 0) {
          alert("Email in use. Please use another email.");
        } else {
          if (password.current.value !== passwordConfirm.current.value) {
            alert("Passwords do not match.");
            password.current.value = "";
            passwordConfirm.current.value = "";
            return false;
          }

          if (!recaptchaValue) {
            alert("Please check recaptcha.");
            return false;
          }
          
          formData.append("recaptchaValue", recaptchaValue);
          AxiosUtil.send("POST", "/issuemoa/users/save", formData, "", (e) => {
            if (e.data > 0) {
              window.location.replace("/sign-up/complete");
            } else {
              alert("Please try again later.");
            }
          });
        }
      });
    }
  };

  return (
    <Form id="frm" className="container" noValidate validated={validated} onSubmit={handleSubmit} style={{width:"330px", height:"1000px"}}>
      <input type="hidden" name="type" value="HOME"/>
      <div className="text-center">
        <img src={person} alt="person" height={"200px"}/>
      </div>
      <Row className="mt-3 g-2">
        <Col md>
          <FloatingLabel label="Last name">
            <Form.Control placeholder="Last name" name="lastName" maxLength={10} required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Last name.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel label="First name">
            <Form.Control placeholder="First name" name="firstName" ref={firstName} minLength={3} maxLength={25} required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid First name. (Lenth 3~25)
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <hr></hr>
      <Row className="mt-3">
        <Col md>
          <FloatingLabel label="Email address (Use ID.)">
            <Form.Control type="email" placeholder="name@example.com" name="email" ref={email} minLength={8} maxLength={100} required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email. (Lenth 8~100)
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel className="mt-3" label="Password">
        <Form.Control type="password" placeholder="Password" name="password" ref={password} minLength={8} maxLength={100} required />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password. (Lenth 8~100)
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel className="mt-3" label="Password Confirm">
        <Form.Control type="password" placeholder="Password Confirm" name="passwordConfirm" ref={passwordConfirm} minLength={8} maxLength={100} required />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password confirm. (Lenth 8~50)
        </Form.Control.Feedback>
      </FloatingLabel>
      <InputGroup className="mt-3">
        <Form.Control placeholder="Search for the address." name="addrPostNo" ref={addrPostNo} readOnly required />
        <Button className="btn-success" type="button" onClick={serachAddress}>Search Address</Button>
      </InputGroup>
      <Form.Control className="mt-2" placeholder="Detail address" name="addr" ref={addr} minLength={10} maxLength={100} required />
      <Form.Control.Feedback type="invalid">
        Please provide a valid Detail address. (Lenth 10~100)
      </Form.Control.Feedback>
      <ReCAPTCHA
        className="mt-3"
        onChange={onChangeRecaptcha}
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
      />
      <Button className="mt-3" type="submit" style={{width:"100%", height:"50px"}}>Submit</Button>
    </Form>
  );
}

export default SignUp;