import { Button, Modal, Form, InputGroup }  from 'react-bootstrap';
import React, { useRef, useState, useEffect } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

function ChangeAddress(props) {
  const [validated, setValidated] = useState(false);
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

  useEffect(() => {
    addrPostNo.value = "";
    addr.value = "";
  });

  const handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setValidated(true);
    
    const form = event.currentTarget;

    if (form.checkValidity()) {
      props.changeAddress(addrPostNo.current.value, addr.current.value);
    }
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Change Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup className="mt-3">
              <Form.Control placeholder="Search for the address." name="addrPostNo" ref={addrPostNo} required />
              <Button className="btn-success" type="button" onClick={serachAddress}>Search Address</Button>
            </InputGroup>
            <Form.Control className="mt-2" placeholder="Detail address" name="addr" ref={addr} minLength={10} maxLength={100} required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Detail address. (Lenth 10~100)
            </Form.Control.Feedback>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ChangeAddress;