import { PostList } from "./components/PostList";
import { NewPostModal } from "./components/NewPostModal";
import { Notification } from "./components/Notification";

export const App = () => {
  return (
    <div className='container'>
      <h1 className='p-0 mt-4 mb-3'>Posts</h1>
      <NewPostModal />
      <PostList />
      {/* <Notification /> */}
    </div>
  );
};
