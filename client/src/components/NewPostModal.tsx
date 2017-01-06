import React from "react";
import { useInput } from "../hooks/useInput";
import { usePosts } from "../state/PostContext";
import { IPostNew } from "../types/types";
import { ModalForm } from "./ModalForm";
import { useModalBtn } from "../hooks/useModalBtn";

export const NewPostModal = () => {
  // Input fields
  const title = useInput("text", "Title...");
  const content = useInput("text", "Enter post...");

  const { addPost } = usePosts();

  const handleAddPost = (e: React.FormEvent): void => {
    e.preventDefault();

    const post: IPostNew = {
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

  const modalBody = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <>
      <ModalForm
        handleSubmit={handleAddPost}
        modalBtn={useModalBtn(
          "btn main-button",
          "New Post",
          "Create a new post"
        )}
        modalBody={modalBody()}
        modalTitle='Create new post'
        modalConfirm='Submit'
      />
    </>
  );
};
