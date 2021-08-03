import { useState } from "react";
import { useEffect } from "react";
import { useService } from "../../hooks/useService";
import { useUser } from "../../state/UserContext";
import { IPost } from "../../types/types";
import { PostList } from "../Post/PostList";
import { LoginForm } from "./LoginForm";

interface Props {
  userId: string;
}

export const UserProfile = ({ userId }: Props) => {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState<IPost[]>([]);

  const userService = useService("/api/users/posts");

  useEffect(() => {
    const fetch = async () => {
      console.log(user?.token);
      const fetchedUserPosts: IPost[] = await userService.get(userId);

      setUserPosts(fetchedUserPosts);
    };
    if (user) fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, user]);

  const userName = () => {
    if (user) {
      return `Posts | name`;
    }
    return "Your posts";
  };

  return (
    <>
      {user !== null ? (
        <PostList
          posts={userPosts}
          title={userName()}
          createNewButton={false}
        />
      ) : (
        <LoginForm />
      )}
    </>
  );
};
