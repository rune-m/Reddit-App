import * as React from "react";
import { FormComponent } from "./FormComponent";
import { useInput } from "../../hooks/useInput";
import { useUser } from "../../state/UserContext";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const email = useInput("email", "Email");
  const password = useInput("password", "Password");

  const { login, user } = useUser();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const credentials = {
      email: email.value,
      password: password.value,
    };
    login(credentials);
    if (user) {
      console.log("succsessful login", user);
      email.onSubmit();
      password.onSubmit();

      <Link to='/' />;
    }
  };

  const formBody = () => {
    return (
      <div>
        <h2>Login</h2>
        <div className='card-text'>
          <div className='form-floating custom-form mb-3'>
            {/* <div className='row mx-auto'> */}
            <input
              {...email}
              className='col-12 form-control'
              required
              maxLength={30}
              id='usernameEmail'
            />
            <label htmlFor='usernameEmail'>Username or email</label>{" "}
          </div>
          <div className='form-floating custom-form'>
            <input
              {...password}
              className='col-12 form-control'
              required
              maxLength={30}
              id='password'
            />
            <label htmlFor='password'>Password</label>{" "}
          </div>
        </div>
        <div className='card-footer mt-3'>
          <button type='submit' className='btn btn-primary main-button'>
            Log in
          </button>
          <br />
          <button className='text-button mt-3'>
            <a href='/register' style={{ color: "white" }}>
              Register a new account here
            </a>
          </button>
        </div>
      </div>
    );
  };

  return <FormComponent body={formBody} onSubmit={handleLogin} />;
};
