import * as React from "react";
import { NewPostModal } from "../Modal/NewPostModal";
import { PostList } from "./PostList";

export const PostsHome = () => {
  return (
    <>
      <h2 className='p-0 mt-4 mb-3'>Posts</h2>
      <NewPostModal />
      <PostList />
    </>
  );
};
