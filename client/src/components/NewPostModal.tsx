import React, { useState } from "react";
import { useInput } from "../hooks/useInput";
import { usePosts } from "../state/PostContext";

import { PostModal } from "./PostModal";
import { IPost } from "../types/types";

interface Props {
  modalTitle: string;
}

export const NewPostModal = ({ modalTitle }: Props) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const title = useInput("text", "Title...");
  const content = useInput("text", "Create post...");

  const { addPost } = usePosts();

  const handleAddPost = (): void => {
    // e.preventDefault();

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

  const postForm = () => {
    return (
      <div>
        <form onSubmit={handleAddPost}>
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
          {/* <div className='row mx-auto'>
            <button className='col-3' type='submit'>
              Submit
            </button>
          </div> */}
        </form>
      </div>
    );
  };

  return (
    <div>
      <div>
        <h1 className='p-0'>Posts</h1>
        <button className='btn main-button' onClick={handleShow}>
          New Post
        </button>
      </div>

      <PostModal
        title={modalTitle}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        postForm={postForm}
        handleAddPost={handleAddPost}
      />
    </div>
  );
};
