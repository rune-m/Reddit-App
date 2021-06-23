import React from "react";
import { usePosts } from "../../state/PostContext";
import { NewPostModal } from "../Modal/NewPostModal";
import { Post } from "./Post";

export const PostList = () => {
  const { posts } = usePosts();

  return (
    <div className='d-flex justify-content-center pb-4'>
      <ul className='post-list col-12 col-sm-12 col-md-10 col-lg-8 p-0'>
        <div className='row ms-auto me-auto'>
          <h2 className='col-8 p-0 mt-4 mb-1'>Posts</h2>
          <div className='col-4 p-0 mt-4 mb-1'>
            <NewPostModal />
          </div>
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
