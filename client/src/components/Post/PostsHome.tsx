import * as React from "react";
import { usePosts } from "../../state/PostContext";

import { PostList } from "./PostList";

export const PostsHome = () => {
  const { posts } = usePosts();
  return (
    <>
      {/* <h2 className='p-0 mt-4 mb-3'>Posts</h2>
      <NewPostModal /> */}
      <PostList posts={posts} title='Posts' />
    </>
  );
  // return <PostList posts={posts} />;
};
