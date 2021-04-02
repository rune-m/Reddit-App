import { PostList } from "./components/PostList";
import { NewPostModal } from "./components/NewPostModal";

export const App = () => {
  return (
    <div className='container'>
      <h1 className='p-0 mt-4 mb-4'>Posts</h1>
      {/* <NewPostModal /> */}
      <NewPostModal />
      <PostList />
    </div>
  );
};
