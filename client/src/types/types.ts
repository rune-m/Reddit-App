import React from "react";

export type IPostNew = Omit<IPost, "id">;
export interface IPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  upvotes: number;
}

export interface PostContextState {
  posts: IPost[];
  addPost: (post: IPostNew) => void;
  deletePost: (id: number) => void;
  updatePost: (post: IPost) => void;
  upvotePost: (post: IPost) => void;
  downvotePost: (post: IPost) => void;
}

export interface ContextProps {
  children: React.ReactNode;
}
