import React from "react";
import { usePosts } from "../state/PostContext";
import { IPost } from "../types/types";

export const Post = (post: IPost) => {
  const { deletePost } = usePosts();

  const handleDelete = () => {
    const ok = window.confirm(
      `Are you sure you want to delete the post '${post.title}? This cannot be undone.`
    );
    if (ok) deletePost(post.id);
  };

  return (
    <div>
      <div className='card mt-3'>
        <div className='card-body'>
          <h3 className='card-title m-0 text-warning'>{post.title}</h3>
          <h6 className='card-subtitle'>
            by {post.author}, {post.date.substring(0, 10)}
          </h6>
          <p className='card-text'>{post.content}</p>
          <button className='main-button btn'>Upvote</button>
          <div className='card-footer'>
            <button className='text-button' title='Edit post'>
              Edit
            </button>
            &nbsp;
            <button
              className='text-button'
              title='Delete post'
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
