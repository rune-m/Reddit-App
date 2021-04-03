import { usePosts } from "../state/PostContext";
import { IPost } from "../types/types";
import { ModalForm } from "./ModalForm";
import { useModalBtn } from "../hooks/useModalBtn";
import React from "react";

interface Props {
  post: IPost;
}

export const DeletePostModal = ({ post }: Props) => {
  const { deletePost } = usePosts();

  const handleDeletePost = (e: React.FormEvent) => {
    e.preventDefault();
    deletePost(post.id);
  };

  const modalBody = () => {
    return (
      <p className='text-light'>{`Are you sure you want to delete '${post.title}'? This cannot be undone.`}</p>
    );
  };

  return (
    <ModalForm
      handleSubmit={handleDeletePost}
      modalBtn={useModalBtn("text-button", "Delete", "Delete post")}
      modalBody={modalBody()}
      modalTitle='Delete post'
      modalConfirm='Delete'
    />
  );
};
