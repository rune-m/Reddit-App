import { PostList } from "./components/PostList";

export const App = () => {
  return (
    <div className='container'>
      <h1 className='mt-4'>Posts</h1>
      <PostList />
    </div>
  );
};
