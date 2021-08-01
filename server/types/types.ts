export interface IPost {
  id?: number;
  title: string;
  content: string;
  author?: string;
  date: string;
  upvotes: number;
  user: IUser;
}

export interface IUser {
  id?: number;
  name: string;
  email: string;
  posts: IPost[];
}

export interface IUserPass extends IUser {
  password: string;
}

export interface IUserOldPass extends IUserPass {
  oldPassword: string;
}

export interface IUserHash extends IUser {
  passwordHash: string;
}

export type IUserLogin = Omit<IUserPass, "id" | "name">;

export interface PostContextState {
  posts: IPost[];
  addPost: (post: IPost) => void;
  deletePost: (id: number) => void;
  updatePost: (post: IPost) => void;
}
