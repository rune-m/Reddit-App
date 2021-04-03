import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { IPost } from "../types/types";

interface Props {
  handleSubmit: (e: React.FormEvent) => void;
  modalBtn: {
    className: string;
    text: string;
    title: string | undefined;
  };
  modalBody: JSX.Element;
  modalTitle: string;
  modalConfirm: string;
  post?: IPost;
}

export const ModalForm = ({
  handleSubmit,
  modalBtn,
  modalBody,
  modalTitle,
  modalConfirm,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button {...modalBtn} onClick={handleShow}>
        {modalBtn.text}
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        dialogClassName={"custom-modal"}
      >
        <Modal.Header>
          <Modal.Title className='text-warning'>{modalTitle}</Modal.Title>
        </Modal.Header>

        <form
          onSubmit={(e) => {
            console.log("SUBMIT");
            handleSubmit(e);
            handleClose();
          }}
        >
          <Modal.Body>{modalBody}</Modal.Body>

          <Modal.Footer>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              {modalConfirm}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
