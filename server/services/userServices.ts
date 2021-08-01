import { IPost, IUser } from "../types/types";
import User from "../db/models/userModel";
import Post from "../db/models/postModel";
import { getUserIdFromToken } from "../utils/tokenUtils";

export const assignPostToUser = async (userId: string, post: any) => {
  const user: any = await User.findById(userId);
  if (user) {
    user.posts.push(post);
    await User.findByIdAndUpdate(userId, user, { new: true });
  } else {
    throw `User with id ${userId} doesn't exist`;
  }
};

export const removePostFromUser = async (userId: string, postId: string) => {
  const user: any = await User.findById(userId);
  if (user) {
    console.log(user.posts);
    user.posts = user.posts.filter((post: string) => {
      console.log("Post", post, postId, typeof postId, typeof post);
      // TODO !==
      return post != postId;
    });
    console.log(user.posts);
    await User.findByIdAndUpdate(userId, user, { new: true });
  } else {
    throw `User with id ${userId} doesn't exist`;
  }
};

export const userOwnsPost = async (postId, token): Promise<boolean> => {
  const post: any = await Post.findById(postId);
  console.log("post", post);
  if (post) {
    console.log("ASDASD", post.user, getUserIdFromToken(token));
    if (post.user == getUserIdFromToken(token)) return true;
  }
  return false;
};
