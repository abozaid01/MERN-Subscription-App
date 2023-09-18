import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

interface ModalProps {
  text: string;
  variant: string;
  isSignupFlow: Boolean;
}

const ErrorMessage = styled.p`
  color: red;
`;

export default function ModalComponent({
  text,
  variant,
  isSignupFlow,
}: ModalProps) {
  const [isShown, setIsShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = async () => {
    let data;

    // POST Request to /auth/signup
    if (isSignupFlow) {
      const { data: signupData } = await axios.post(
        "http://localhost:8000/auth/signup",
        {
          email,
          password,
        }
      );

      data = signupData;
    }
    // POST Request to /auth/signup
    else {
      const { data: loginData } = await axios.post(
        "http://localhost:8000/auth/login",
        {
          email,
          password,
        }
      );

      data = loginData;
    }

    // Render Error Msg if any
    if (data.errors.length) {
      return setErrorMsg(data.errors[0].msg);
    }

    // save the token
    localStorage.setItem("token", data.data.token);
  };

  return (
    <>
      <Button
        size="lg"
        style={{ marginRight: "1rem", padding: ".5rem 3rem" }}
        variant={variant}
        onClick={() => setIsShown(true)}
      >
        {text}
      </Button>

      <Modal show={isShown} onHide={() => setIsShown(false)}>
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setIsShown(false)}>
            Close
          </Button>
          <Button variant={variant} onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
