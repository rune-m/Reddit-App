import React, { useContext, useState } from "react";
import { useService } from "../hooks/useService";
import { IPost, PostContextState, ContextProps } from "../types/types";
import { sortByDateDesc } from "../utils/Sort";

const contextDefaultValues: PostContextState = {
  posts: [],
  addPost: () => {},
  deletePost: () => {},
};

const PostState = React.createContext<PostContextState>(contextDefaultValues);

export function usePosts() {
  return useContext(PostState);
}

export const PostContext = ({ children }: ContextProps) => {
  const [posts, setPosts] = useState<IPost[]>(dummyPosts);

  const postService = useService("/api/posts");

  const addPost = (post: IPost) => {
    const unsortedPosts: IPost[] = posts.concat(post);
    setPosts(sortByDateDesc(unsortedPosts));
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter((el) => el.id !== id));
  };

  return (
    <PostState.Provider value={{ posts, addPost, deletePost }}>
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
