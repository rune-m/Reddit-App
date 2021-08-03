import { LoginForm } from "./components/User/LoginForm";
import { RegisterForm } from "./components/User/RegisterForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { NavbarTop } from "./components/NavbarTop";
import { PostsHome } from "./components/Post/PostsHome";
import { useUser } from "./state/UserContext";
import { Notification } from "./components/Notification";
import { MyAccount } from "./components/User/MyAccount";
import { UserProfile } from "./components/User/UserProfile";
import { useEffect } from "react";
// import { userIdPath } from "./utils/StringUtils";

export const App = () => {
  const { user, fetchLocalStorageForUser } = useUser();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => fetchLocalStorageForUser(), []);

  useEffect(() => {
    console.log("App.tsx rerender");
    fetchLocalStorageForUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let match: any = useRouteMatch("/user/:id");

  return (
    <div className='container'>
      <NavbarTop />

      <Switch>
        <Route path='/user/:id'>
          <UserProfile userId={match?.params.id} />
        </Route>
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
          <MyAccount />
        </Route>
      </Switch>
      <Notification />
    </div>
  );
};
