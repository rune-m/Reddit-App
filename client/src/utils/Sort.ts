import { IPost } from "../types/types";

export const sortByDateDesc = (posts: IPost[]): IPost[] => {
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};
