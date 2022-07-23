import { Form, Button, InputGroup, FloatingLabel, Row, Col } from 'react-bootstrap';
import { person } from '../../images';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as AxiosUtil from '../../lib/js/AxiosUtil';

function SignUp() {
  // Address popup
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
  // const [inputs, setInputs] = useState({
  //   addrPostNo: "",
  //   addr: ""
  // });
  // const { 
  //   addrPostNo,
  //   addr } = inputs;
  // setInputs({
  //   addrPostNo: data.zonecode,
  //   addr: fullAddress
  // });

  // recaptchaRef, form validated
  const recaptchaRef = React.createRef();
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
          formData.append("recaptchaValue", recaptchaRef.current.getValue());
          AxiosUtil.send("POST", "/issuemoa/users/save", formData, "", (e) => {
            if (e.data !== "") {
              window.location.replace("/SignUpComplete");
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
      <div className="text-center">
        <img src={person} alt="person" height={"200px"}/>
      </div>
      
      <Row className="mt-3 g-2">
        <Col md>
          <FloatingLabel label="Last name">
            <Form.Control placeholder="Last name" name="lastName" maxLength={5} required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Last name.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel label="First name">
            <Form.Control placeholder="First name" name="firstName" maxLength={25} required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid First name.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      
      <hr></hr>

      <Row className="mt-3">
        <Col md>
          <FloatingLabel label="Email address (Use ID.)">
            <Form.Control type="email" placeholder="name@example.com" name="email" minLength={8} maxLength={100} required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email. (Size 8~50)
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      
      <FloatingLabel className="mt-3" label="Password">
        <Form.Control type="password" placeholder="Password" name="password" maxLength={100} required />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password.
        </Form.Control.Feedback>
      </FloatingLabel>
      
      <FloatingLabel className="mt-3" label="Password Confirm">
        <Form.Control type="password" placeholder="Password Confirm" name="passwordConfirm" maxLength={100} required />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password confirm.
        </Form.Control.Feedback>
      </FloatingLabel>
      
      <InputGroup className="mt-3">
        <Form.Control placeholder="Search for the address." name="addrPostNo" ref={addrPostNo} required />
        <Button className="btn-success" type="button" onClick={serachAddress}>Search Address</Button>
      </InputGroup>

      <Form.Control className="mt-2" placeholder="Detail address" name="addr" ref={addr} required />
      <Form.Control.Feedback type="invalid">
        Please provide a valid Detail address.
      </Form.Control.Feedback>

      <ReCAPTCHA
        className="mt-3"
        ref={recaptchaRef}
        sitekey="6Ldd5hkUAAAAAGJxXLbCFgFzl6Eagrh9jyPf9iQS"
      />

      <Button className="mt-3" type="submit" style={{width:"100%", height:"50px"}}>Submit</Button>
    </Form>
  );
}

export default SignUp;