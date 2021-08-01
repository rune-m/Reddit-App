import { IPost } from "../../types/types";
import User from "../models/userModel";

export const assignPostToUserId = async (userId: string, post: any) => {
  const user: any = await User.findById(userId);
  if (user) {
    user.posts.push(post);
    await User.findByIdAndUpdate(userId, user, { new: true });
  }
};
