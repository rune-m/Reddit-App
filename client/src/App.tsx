import { LoginForm } from "./components/User/LoginForm";
import { RegisterForm } from "./components/User/RegisterForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { NavbarTop } from "./components/NavbarTop";
import { PostList } from "./components/Post/PostList";
import { useUser } from "./state/UserContext";

export const App = () => {
  const { user } = useUser();

  return (
    <div className='container'>
      <NavbarTop />
      <Router>
        <Switch>
          <Route exact path='/'>
            {user === null ? <Redirect to='/login' /> : <PostList />}
          </Route>
          <Route exact path='/login'>
            {user === null ? <LoginForm /> : <Redirect to='/' />}
          </Route>
          <Route path='/register' component={RegisterForm} />
        </Switch>
      </Router>
    </div>
  );
};
