import * as React from "react";
import { FormComponent } from "./FormComponent";
import { useInput } from "../../hooks/useInput";
import { useUser } from "../../state/UserContext";
import { Link } from "react-router-dom";
import { StdFormInput } from "./StdFormInput";

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
          <StdFormInput inputField={email} label='Email' id='email' />
          <StdFormInput inputField={password} label='Password' id='password' />
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
