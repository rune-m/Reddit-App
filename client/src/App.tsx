import { LoginForm } from "./components/User/LoginForm";
import { RegisterForm } from "./components/User/RegisterForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavbarTop } from "./components/NavbarTop";
import { PostList } from "./components/Post/PostList";

export const App = () => {
  return (
    <div className='container'>
      <NavbarTop />
      <Router>
        <Switch>
          <Route exact path='/' component={PostList} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
        </Switch>
      </Router>
    </div>
  );
};
