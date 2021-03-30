import React from "react";
import { IPost } from "../types/types";

export const Post = (post: IPost) => {
  return (
    <div>
      <div className='card mt-3'>
        <div className='card-body'>
          <h3 className='card-title m-0 text-secondary'>{post.title}</h3>
          <h6 className='card-subtitle'>
            by {post.author}, {post.date.substring(0, 10)}
          </h6>
          <p className='card-text'>{post.content}</p>
          <button className='main-button btn'>Upvote</button>
        </div>
      </div>
    </div>
  );
};
