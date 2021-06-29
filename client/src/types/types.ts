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
  newNotification: (msg: string) => void;
  notification: string;
}

export type IUserNew = Omit<IUser, "id">;

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IUserToken {
  token: string;
  name: string;
  id: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface UserContextState {
  user: IUserToken | null;
  login: (credentials: IUserLogin) => void;
  register: (user: IUserNew) => void;
  updateUser: (user: any) => void;
  logout: () => void;
}

export interface ContextProps {
  children: React.ReactNode;
}
