import React from "react";
import { IPost } from "../../types/types";
import { NewPostModal } from "../Modal/NewPostModal";
import { Post } from "./Post";

interface Props {
  posts: IPost[];
  title: string;
  createNewButton?: boolean;
}

export const PostList = ({ posts, title, createNewButton = true }: Props) => {
  return (
    <div className='d-flex justify-content-center pb-4'>
      <ul className='post-list col-12 col-sm-12 col-md-10 col-lg-7 p-0'>
        <div className='row ms-auto me-auto'>
          <h2 className='col-8 p-0 mt-4 mb-1'>{title}</h2>
          {createNewButton && (
            <div className='col-4 p-0 mt-4 mb-1'>
              <NewPostModal />
            </div>
          )}
        </div>
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <Post {...post} />
            </li>
          ))}
      </ul>
    </div>
  );
};
