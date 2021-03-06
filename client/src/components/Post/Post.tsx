import React from "react";
import { DeletePostModal } from "../Modal/DeletePostModal";
import { EditPostModal } from "../Modal/EditPostModal";
import { formatDate } from "../../utils/DateFormat";
import { usePosts } from "../../state/PostContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../state/UserContext";

export const Post = (post: any) => {
  const { upvotePost, downvotePost } = usePosts();
  const { user } = useUser();

  const userOwnsPost = () => {
    if (user) {
      return user.id === post.user;
    }
    return false;
  };

  return (
    <div>
      <div className='card mt-3'>
        <div className='card-body'>
          <h3 className='card-title m-0 text-warning'>{post.title}</h3>
          <h6 className='card-subtitle'>
            by{" "}
            <a
              href={`/user/${post.user.id}`}
              style={{ color: "#E9E9D1", textDecoration: "none" }}
            >
              {post.user.name}
            </a>{" "}
            | {formatDate(post.date)}
          </h6>
          <p className='card-text' style={{ whiteSpace: "pre-wrap" }}>
            {post.content}
          </p>
          <div className=''>
            <button
              className='upvote-button btn d-inline-block'
              onClick={() => upvotePost(post)}
              title='Upvote post'
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <button
              className='downvote-button btn d-inline-block'
              onClick={() => downvotePost(post)}
              title='Downvote post'
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <h5 className='m-1 d-inline-block'>
              <span className='badge bg-dark '>{post.upvotes}</span>
            </h5>
          </div>
          <div className='card-footer'>
            {userOwnsPost() && (
              <div>
                <EditPostModal post={post} />
                &nbsp;
                <DeletePostModal post={post} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
