import React, { useState } from "react";
import { useInput } from "../hooks/useInput";
import { usePosts } from "../state/PostContext";
import { Modal } from "react-bootstrap";
import { IPost } from "../types/types";

interface Props {
  post: IPost;
}

export const EditPostModal = ({ post }: Props) => {
  // Modal
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Input fields
  const title = useInput("text", "Title...", post.title);
  const content = useInput("text", "Enter post...", post.content);

  const { updatePost } = usePosts();

  const handleEditPost = (e: React.FormEvent): void => {
    e.preventDefault();

    handleClose();

    const updatedPost: IPost = {
      ...post,
      title: title.value,
      content: content.value,
      date: new Date().toISOString(),
    };

    updatePost(updatedPost);
  };

  return (
    <>
      <button className='text-button' title='Edit post' onClick={handleShow}>
        Edit
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        dialogClassName={"custom-modal"}
      >
        <Modal.Header>
          <Modal.Title className='text-warning'>Edit post</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleEditPost}>
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
              Confirm changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
