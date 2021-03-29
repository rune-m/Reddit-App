import * as React from "react";
import { PostEntry } from "../types/types";
import { Post } from "./Post";

interface Props {
  posts: PostEntry[];
}

export const PostList = ({ posts }: Props) => {
  return (
    <div className='d-flex justify-content-center'>
      <ul className='post-list col-12 col-sm-12 col-md-10 col-lg-8 p-0'>
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <Post {...post} />
            </li>
          ))}
      </ul>
    </div>
  );
};
