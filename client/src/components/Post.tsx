import React from "react";
import { IPost } from "../types/types";
import { DeletePostModal } from "./DeletePostModal";
import { EditPostModal } from "./EditPostModal";
import { formatDate } from "../utils/DateFormat";

export const Post = (post: IPost) => {
  return (
    <div>
      <div className='card mt-3'>
        <div className='card-body'>
          <h3 className='card-title m-0 text-warning'>{post.title}</h3>
          <h6 className='card-subtitle'>
            by {post.author}, {formatDate(post.date)}
          </h6>
          <p className='card-text'>{post.content}</p>
          <button className='main-button btn'>Upvote</button>
          <div className='card-footer'>
            <EditPostModal post={post} />
            &nbsp;
            <DeletePostModal post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};
