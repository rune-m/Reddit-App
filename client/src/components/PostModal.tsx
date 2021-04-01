import React from "react";
import { Modal, Button } from "react-bootstrap";

interface Props {
  title: string;
  show: boolean;
  handleClose: (e: React.FormEvent) => void;
  handleShow: () => void;
  postForm: () => JSX.Element;
  handleAddPost: () => void;
}

export const PostModal = ({
  title,
  show,
  handleClose,
  postForm,
  handleAddPost,
}: Props) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        dialogClassName={"custom-modal"}
      >
        <Modal.Header>
          <Modal.Title className='text-warning'>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{postForm()}</Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleAddPost}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
