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
import { useNotification } from "./NotificationContext";
import { useUser } from "./UserContext";

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

  const { user } = useUser();
  const { newNotification } = useNotification();

  useEffect(() => {
    let repeat: NodeJS.Timeout;

    const fetch = async () => {
      if (user) {
        try {
          console.log("Fetching posts...");
          const fetchedPosts: IPost[] = await (
            await axios.get(baseUrl, {
              headers: { Authorization: `bearer ${user.token}` },
            })
          ).data;
          setPosts(sortByDateDesc(fetchedPosts));
        } catch (error) {
          console.log("Error fetching posts", error.response.data);
          newNotification("An error occured while fetching posts");
        }
      }
      repeat = setTimeout(fetch, 10000);
    };

    fetch();

    return () => {
      if (repeat) {
        clearTimeout(repeat);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // TODO Add try-catch for error-handling
  const addPost = async (post: IPostNew) => {
    try {
      const savedPost = await postService.create(post);
      const unsortedPosts: IPost[] = posts.concat(savedPost);
      setPosts(sortByDateDesc(unsortedPosts));
    } catch (error) {
      console.log("Error adding new post", error.response.data);
      newNotification(error.response.data.errorMsg);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await postService.remove(id);
    } catch (error) {
      console.log("Removed from server");
      newNotification(error.response.data.errorMsg);
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
    } catch (error) {
      console.log("Removed from server");
      setPosts(posts.filter((el) => el.id !== post.id));
      newNotification(error.response.data.errorMsg);
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
    } catch (error) {
      console.log("Removed from server");
      newNotification(error.response.data.errorMsg);
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
    } catch (error) {
      console.log("Removed from server");
      newNotification(error.response.data.errorMsg);
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
