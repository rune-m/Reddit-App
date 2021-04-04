export interface IPost {
  id?: number;
  title: string;
  content: string;
  author: string;
  date: string;
  upvotes: number;
}

export interface PostContextState {
  posts: IPost[];
  addPost: (post: IPost) => void;
  deletePost: (id: number) => void;
  updatePost: (post: IPost) => void;
}
