import React, { useContext, useEffect, useState } from "react";
import { useService } from "../hooks/useService";
import { IPost, PostContextState, ContextProps } from "../types/types";
import { sortByDateDesc } from "../utils/Sort";

const contextDefaultValues: PostContextState = {
  posts: [],
  addPost: () => {},
  deletePost: () => {},
  updatePost: () => {},
};

const PostState = React.createContext<PostContextState>(contextDefaultValues);

export function usePosts() {
  return useContext(PostState);
}

export const PostContext = ({ children }: ContextProps) => {
  const [posts, setPosts] = useState<IPost[]>(dummyPosts);
  const [clock, setClock] = useState<number>(0);

  const postService = useService("/api/posts");

  useEffect(() => {
    const fetch = async () => {
      try {
        const fetchedPosts: IPost[] = await postService.getAll();
        setPosts(fetchedPosts);
      } catch (err) {
        console.log("Error fetching data");
      }
    };

    fetch();

    setTimeout(() => {
      setClock(clock % 2 === 0 ? clock + 1 : clock - 1);
      console.log("Fetching data");
    }, 1000 * 10);
  }, [clock]);

  // TODO Add try-catch for error-handling
  const addPost = async (post: IPost) => {
    const savedPost = await postService.create(post);

    const unsortedPosts: IPost[] = posts.concat(savedPost);
    setPosts(sortByDateDesc(unsortedPosts));
  };

  const deletePost = async (id: number) => {
    try {
      await postService.remove(id);
      setPosts(posts.filter((el) => el.id !== id));
    } catch (err) {
      setPosts(posts.filter((el) => el.id !== id));
      console.log("Removed from server");
    }
  };

  const updatePost = (post: IPost) => {
    const unsortedPosts: IPost[] = posts.map((el) =>
      el.id === post.id ? post : el
    );
    setPosts(sortByDateDesc(unsortedPosts));
  };

  return (
    <PostState.Provider value={{ posts, addPost, deletePost, updatePost }}>
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
    date: new Date().toUTCString(),
    upvotes: 2,
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is my second post",
    author: "Ola",
    date: new Date().toUTCString(),
    upvotes: 2,
  },
];
