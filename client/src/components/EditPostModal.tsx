import React from "react";
import { useInput } from "../hooks/useInput";
import { usePosts } from "../state/PostContext";
import { IPost } from "../types/types";
import { ModalForm } from "./ModalForm";
import { useModalBtn } from "../hooks/useModalBtn";

interface Props {
  post: IPost;
}

export const EditPostModal = ({ post }: Props) => {
  const title = useInput("text", "Title...", post.title);
  const content = useInput("text", "Enter post...", post.content);

  const { updatePost } = usePosts();

  const handleEditPost = (e: React.FormEvent): void => {
    e.preventDefault();

    const updatedPost: IPost = {
      ...post,
      title: title.value,
      content: content.value,
      date: new Date().toISOString(),
    };

    updatePost(updatedPost);
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
        handleSubmit={handleEditPost}
        modalBtn={useModalBtn("text-button", "Edit", "Edit post")}
        modalBody={modalBody()}
        modalTitle='Edit post'
        modalConfirm='Update'
        post={post}
      />
    </>
  );
};
