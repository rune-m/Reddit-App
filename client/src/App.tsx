import { PostList } from "./components/PostList";
import { PostForm } from "./components/PostForm";
import { NewPostModal } from "./components/NewPostModal";

export const App = () => {
  return (
    <div className='container'>
      <div className='mt-4'>
        {/* <h1 className='m-0'>Posts</h1> */}
        <NewPostModal />
        {/* <PostForm /> */}
        <PostList />
      </div>
    </div>
  );
};
