import React, { useState } from "react";
import { useInput } from "../hooks/useInput";
import { usePosts } from "../state/PostContext";
import { Modal } from "react-bootstrap";
import { IPost } from "../types/types";

export const NewPostModal = () => {
  // Modal
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Input fields
  const title = useInput("text", "Title...");
  const content = useInput("text", "Enter post...");

  const { addPost } = usePosts();

  const handleAddPost = (e: React.FormEvent): void => {
    e.preventDefault();

    handleClose();

    const id = Math.floor(Math.random() * 100);

    const post: IPost = {
      id,
      title: title.value,
      content: content.value,
      author: "Kari",
      date: new Date().toISOString(),
      upvotes: 0,
    };

    addPost(post);

    // Clear fields
    title.onSubmit();
    content.onSubmit();
  };

  return (
    <>
      <button className='btn main-button' onClick={handleShow}>
        New Post
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        dialogClassName={"custom-modal"}
      >
        <Modal.Header>
          <Modal.Title className='text-warning'>Create new post</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleAddPost}>
          <Modal.Body>
            <div className='row mx-auto'>
              <input {...title} className='col-12' required maxLength={30} />
            </div>
            <div className='row mx-auto'>
              <textarea
                {...content}
                className='col-12'
                rows={6}
                maxLength={500}
                required
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button className='btn btn-secondary' onClick={handleClose}>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
