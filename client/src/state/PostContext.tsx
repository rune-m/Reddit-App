import React, { useContext, useState } from "react";
import { IPost, PostContextState, ContextProps } from "../types/types";

const contextDefaultValues: PostContextState = {
  posts: [],
  addPost: () => {},
};

const PostState = React.createContext<PostContextState>(contextDefaultValues);

export function usePosts() {
  return useContext(PostState);
}

export const PostContext = ({ children }: ContextProps) => {
  const [posts, setPosts] = useState<IPost[]>(dummyPosts);

  const addPost = (post: IPost) => {
    setPosts(posts.concat(post));
  };

  return (
    <PostState.Provider value={{ posts, addPost }}>
      {children}
    </PostState.Provider>
  );
};

let dummyPosts: Array<IPost> = [
  {
    id: 1,
    title: "Post 1",
    content: "This is my first post",
    author: "Ola",
    date: new Date().toISOString(),
    upvotes: 2,
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is my second post",
    author: "Ola",
    date: new Date().toISOString(),
    upvotes: 2,
  },
];
