import React, { useState } from "react";
import { PostList } from "./components/PostList";
import { PostEntry } from "./types/types";

interface Props {
  dummyPosts: PostEntry[];
}

export const App = ({ dummyPosts }: Props) => {
  const [posts, setPosts] = useState(dummyPosts);

  return (
    <div className='container'>
      <h1 className='mt-4'>Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};
