import React from "react";
import { usePosts } from "../../state/PostContext";
import { NewPostModal } from "../Modal/NewPostModal";
import { Post } from "./Post";

export const PostList = () => {
  const { posts } = usePosts();

  return (
    <div className='d-flex justify-content-center pb-4'>
      <ul className='post-list col-12 col-sm-12 col-md-10 col-lg-8 p-0'>
        <h2 className='p-0 mt-4 mb-3'>Posts</h2>
        <NewPostModal />
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
