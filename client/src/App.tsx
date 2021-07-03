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
import { Notification } from "./components/Notification";
import { MyAccount } from "./components/User/MyAccount";

export const App = () => {
  const { user } = useUser();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => fetchLocalStorageForUser(), []);

  return (
    <div className='container'>
      <NavbarTop />
      <Router>
        <Switch>
          <Route exact path='/'>
            {user === null ? <Redirect to='/login' /> : <PostList />}
          </Route>
          <Route path='/register'>
            {user === null ? <RegisterForm /> : <Redirect to='/' />}
          </Route>
          <Route path='/login'>
            {user === null ? <LoginForm /> : <Redirect to='/' />}
          </Route>
          <Route path='/account'>
            {/* {console.log("account", user)} */}
            {/* {console.log("null?", user !== null)} */}
            {/* {user === null ? <Redirect to='/login' /> : <MyAccount />} */}
            <MyAccount />
          </Route>
        </Switch>
      </Router>
      <Notification />
    </div>
  );
};
