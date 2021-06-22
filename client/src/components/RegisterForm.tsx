import * as React from "react";
import { useInput } from "../hooks/useInput";
import { FormComponent } from "./FormComponent";

export const RegisterForm = () => {
  const emailUsername = useInput("text", "Username or email");
  const password = useInput("password", "Password");

  const formBody = () => {
    return (
      <div>
        <div className='card-text'>
          <div className='form-floating custom-form mb-3'>
            {/* <div className='row mx-auto'> */}
            <input
              {...emailUsername}
              className='col-12 form-control'
              required
              maxLength={30}
              id='emailUsername'
            />
            <label htmlFor='emailUsername'>Username or email</label>{" "}
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
            Register
          </button>
        </div>
      </div>
    );
  };

  return <FormComponent body={formBody} title="Register" />;
};
