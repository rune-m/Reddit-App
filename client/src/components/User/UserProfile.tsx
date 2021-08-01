import { usePosts } from "../../state/PostContext";
import { useUser } from "../../state/UserContext";
import { PostList } from "../Post/PostList";

export const UserProfile = () => {
  const { user } = useUser();
  const { posts } = usePosts();

  const userPosts = () => {
    return posts.filter((post) => post.user === user?.id);
  };

  const userName = () => {
    if (user) {
      return `Posts | ${user.name}`;
    }
    return "Your posts";
  };

  return (
    <PostList posts={userPosts()} title={userName()} createNewButton={false} />
  );
};
