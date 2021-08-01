import { LoginForm } from "./components/User/LoginForm";
import { RegisterForm } from "./components/User/RegisterForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { NavbarTop } from "./components/NavbarTop";
import { PostsHome } from "./components/Post/PostsHome";
import { useUser } from "./state/UserContext";
import { Notification } from "./components/Notification";
import { MyAccount } from "./components/User/MyAccount";
import { UserProfile } from "./components/User/UserProfile";
// import { userIdPath } from "./utils/StringUtils";

export const App = () => {
  const { user } = useUser();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => fetchLocalStorageForUser(), []);

  const userIdPath = (): string => {
    if (user !== null) {
      return `/${user.id}`;
    }
    return "";
  };

  return (
    <div className='container'>
      <NavbarTop />
      <Router>
        <Switch>
          <Route exact path='/'>
            {user === null ? <Redirect to='/login' /> : <PostsHome />}
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
          <Route path={userIdPath()}>
            <UserProfile />
            {/* {user === null ? <Redirect to='/login' /> : <UserProfile />} */}
          </Route>
        </Switch>
      </Router>
      <Notification />
    </div>
  );
};
