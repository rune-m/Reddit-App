import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useService } from "../hooks/useService";
import {
  IPost,
  PostContextState,
  ContextProps,
  IPostNew,
} from "../types/types";
import { sortByDateDesc } from "../utils/Sort";

const contextDefaultValues: PostContextState = {
  posts: [],
  addPost: () => {},
  deletePost: () => {},
  updatePost: () => {},
  upvotePost: () => {},
  downvotePost: () => {},
};

const PostState = React.createContext<PostContextState>(contextDefaultValues);

export function usePosts() {
  return useContext(PostState);
}

export const PostContext = ({ children }: ContextProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const baseUrl = "/api/posts";
  const postService = useService(baseUrl);

  useEffect(() => {
    let repeat: NodeJS.Timeout;

    const fetch = async () => {
      try {
        const fetchedPosts: IPost[] = await (await axios.get(baseUrl)).data;
        setPosts(sortByDateDesc(fetchedPosts));
        console.log("Fetching posts...");
        repeat = setTimeout(fetch, 10000);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };

    fetch();

    return () => {
      if (repeat) {
        clearTimeout(repeat);
      }
    };
  }, []);

  // TODO Add try-catch for error-handling
  const addPost = async (post: IPostNew) => {
    try {
      const savedPost = await postService.create(post);
      const unsortedPosts: IPost[] = posts.concat(savedPost);
      setPosts(sortByDateDesc(unsortedPosts));
    } catch (err) {
      console.log("Error adding new post");
    }
  };

  const deletePost = async (id: number) => {
    try {
      await postService.remove(id);
    } catch (err) {
      console.log("Removed from server");
    } finally {
      setPosts(posts.filter((el) => el.id !== id));
    }
  };

  const updatePost = async (post: IPost) => {
    try {
      const updatedPost = await postService.update(post.id, post);
      const unsortedPosts = posts.map((el) =>
        el.id === post.id ? updatedPost : el
      );
      setPosts(sortByDateDesc(unsortedPosts));
    } catch (err) {
      console.log("Removed from server");
      setPosts(posts.filter((el) => el.id !== post.id));
    }
  };

  const upvotePost = async (post: IPost) => {
    try {
      const upvotedPost = await postService.update(
        post.id,
        post,
        "/api/posts/upvote"
      );
      setPosts(posts.map((el) => (el.id === post.id ? upvotedPost : el)));
    } catch (err) {
      console.log("Removed from server");
    }
  };

  const downvotePost = async (post: IPost) => {
    try {
      const downvotedPost = await postService.update(
        post.id,
        post,
        "/api/posts/downvote"
      );
      setPosts(posts.map((el) => (el.id === post.id ? downvotedPost : el)));
    } catch (err) {
      console.log("Removed from server");
    }
  };

  return (
    <PostState.Provider
      value={{
        posts,
        addPost,
        deletePost,
        updatePost,
        upvotePost,
        downvotePost,
      }}
    >
      {children}
    </PostState.Provider>
  );
};
