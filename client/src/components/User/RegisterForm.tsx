import * as React from "react";
import { Link } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import { useUser } from "../../state/UserContext";
import { IUserNew } from "../../types/types";
import { FormComponent } from "./FormComponent";
import { StdFormInput } from "./StdFormInput";

export const RegisterForm = () => {
  const email = useInput("email", "Email");
  const password = useInput("password", "Password");
  const name = useInput("text", "Name");

  const { register, user } = useUser();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: IUserNew = {
      email: email.value,
      password: password.value,
      name: name.value,
    };

    register(newUser);

    console.log(user);

    if (user) {
      console.log("succsessful register", user);
      email.onSubmit();
      password.onSubmit();
      name.onSubmit();

      <Link to='/' />;
    }
  };

  const formBody = () => {
    return (
      <div>
        <h2>Register</h2>
        <div className='card-text'>
          <StdFormInput inputField={email} label='Email' id='email' />
          <StdFormInput inputField={name} label='Name' id='name' />
          <StdFormInput inputField={password} label='Password' id='password' />
        </div>
        <div className='card-footer mt-3'>
          <button type='submit' className='btn btn-primary main-button'>
            Register
          </button>
          <br />
          <button className='text-button mt-3'>
            <a href='/login' style={{ color: "white" }}>
              Already have an account? Log in here
            </a>
          </button>
        </div>
      </div>
    );
  };

  return <FormComponent body={formBody} onSubmit={handleRegister} />;
};
