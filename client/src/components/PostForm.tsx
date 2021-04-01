import React, { useState } from "react";
import { useInput } from "../hooks/useInput";
import { usePosts } from "../state/PostContext";
import { IPost } from "../types/types";

export const PostForm = () => {
  const title = useInput("text", "Title...");
  const content = useInput("text", "Create post...");

  const { addPost } = usePosts();

  const handleAddPost = (e: React.FormEvent): void => {
    e.preventDefault();

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
    <div>
      <form onSubmit={handleAddPost}>
        <div>
          <input {...title} />
          <input {...content} />
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};
