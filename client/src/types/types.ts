import React from "react";

export type IPostNew = Omit<IPost, "id">;
export interface IPost {
  id: string;
  title: string;
  content: string;
  author?: string;
  date: string;
  upvotes: number;
  user: string;
}

export interface PostContextState {
  posts: IPost[];
  addPost: (post: IPostNew) => void;
  deletePost: (id: string) => void;
  updatePost: (post: IPost) => void;
  upvotePost: (post: IPost) => void;
  downvotePost: (post: IPost) => void;
}

export type IUserNew = Omit<IUser, "id" | "posts">;

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  posts: string[];
}

export interface IUserToken {
  token: string;
  name: string;
  email: string;
  id: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export type IUserUpdate = Partial<IUser>;

export interface UserContextState {
  user: IUserToken | null;
  login: (credentials: IUserLogin) => void;
  register: (user: IUserNew) => void;
  updateUser: (user: any) => void;
  logout: () => void;
  fetchLocalStorageForUser: () => void;
  updateUserDetails: (user: IUserUpdate) => void;
}

export interface NotificationContextState {
  notification: string;
  newNotification: (msg: string) => void;
}

export interface ContextProps {
  children: React.ReactNode;
}
