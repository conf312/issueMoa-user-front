import { Button, Modal, Form, FloatingLabel }  from 'react-bootstrap';
import React, { useRef, useState, useEffect } from 'react';

function ChangePassword(props) {
  const [validated, setValidated] = useState(false);
  const password = useRef(null);
  const passwordConfirm = useRef(null);

  useEffect(() => {
    password.value = "";
    passwordConfirm.value = "";
  });

  const handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setValidated(true);
    
    const form = event.currentTarget;

    if (password.current.value !== passwordConfirm.current.value) {
      alert("Passwords do not match.");
      password.current.value = "";
      passwordConfirm.current.value = "";
      return false;
    }

    if (form.checkValidity()) {
      props.changePassword(password.current.value);
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
          <Modal.Title id="contained-modal-title-vcenter">Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

export default ChangePassword;