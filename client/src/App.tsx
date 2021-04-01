import { PostList } from "./components/PostList";

import { NewPostModal } from "./components/NewPostModal";

export const App = () => {
  return (
    <div className='container'>
      <div className='mt-4'>
        <NewPostModal modalTitle='Create new post' />
        <PostList />
      </div>
    </div>
  );
};
