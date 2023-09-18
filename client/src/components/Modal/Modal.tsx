import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";

interface ModalProps {
  text: string;
  variant: string;
}

export default function ModalComponent({ text, variant }: ModalProps) {
  const [isShown, setIsShown] = useState(false);

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
            <FormControl type="email" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl type="password" />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setIsShown(false)}>
            Close
          </Button>
          <Button variant={variant}>{text}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
