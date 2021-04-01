import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { PostForm } from "./PostForm";

export const NewPostModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div>
        <h1 className='p-0'>Posts</h1>
        <button className='btn main-button' onClick={handleShow}>
          New post
        </button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        dialogClassName={"custom-modal"}
      >
        <div className='bg-dark border-dark'>
          <Modal.Header>
            <Modal.Title className='text-warning'>Create new post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PostForm />
          </Modal.Body>
          <div className='bg-dark'>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Cancel
              </Button>
              <Button variant='primary' onClick={handleClose}>
                Submit
              </Button>
            </Modal.Footer>
          </div>
        </div>
      </Modal>
    </div>
  );
};
