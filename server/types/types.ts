export interface IPost {
  id?: number;
  title: string;
  content: string;
  author: string;
  date: string;
  upvotes: number;
}

export interface IUser {
  id?: number;
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface PostContextState {
  posts: IPost[];
  addPost: (post: IPost) => void;
  deletePost: (id: number) => void;
  updatePost: (post: IPost) => void;
}
