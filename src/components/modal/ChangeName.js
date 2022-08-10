import { Button, Modal, Form, FloatingLabel }  from 'react-bootstrap';
import React, { useRef, useState, useEffect } from 'react';

function ChangeName(props) {
  const [validated, setValidated] = useState(false);
  const lastName = useRef(null);
  const firstName = useRef(null);

  useEffect(() => {
    lastName.value = "";
    firstName.value = "";
  });

  const handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      props.changeName(lastName.current.value, firstName.current.value);
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
          <Modal.Title id="contained-modal-title-vcenter">Change Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <FloatingLabel className="mt-3" label="Last name">
              <Form.Control placeholder="Last name" name="lastName" ref={lastName} maxLength={10} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Last name.
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel className="mt-3" label="First name">
              <Form.Control placeholder="First name" name="firstName" ref={firstName} minLength={3} maxLength={25} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid First name. (Lenth 3~25)
              </Form.Control.Feedback>
            </FloatingLabel>
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

export default ChangeName;