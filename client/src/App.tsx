import { LoginForm } from "./components/LoginForm";
import { PostsHome } from "./components/PostsHome";
import { RegisterForm } from "./components/RegisterForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const App = () => {
  return (
    <div className='container'>
      <Router>
        <Switch>
          <Route exact path='/' component={PostsHome} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
        </Switch>
      </Router>
    </div>
  );
};
