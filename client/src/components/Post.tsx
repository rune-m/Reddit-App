import React from "react";
import { PostEntry } from "../types/types";

export const Post = (post: PostEntry) => {
  return (
    <div>
      <div className='card mt-3'>
        <div className='card-body'>
          <h3 className='card-title'>{post.title}</h3>
          <p className='card-text'>{post.content}</p>
          <button className='main-button btn'>Upvote</button>
        </div>
      </div>
    </div>
  );
};
