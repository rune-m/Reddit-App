import * as React from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import { useUser } from "../../state/UserContext";
import { IUserUpdate } from "../../types/types";
import { FormComponent } from "./FormComponent";
import { StdFormInput } from "./StdFormInput";

export const MyAccount = () => {
  const { user, updateUserDetails } = useUser();

  const email = useInput("email", "Email");
  const name = useInput("text", "Name");
  const oldPassword = useInput("password", "Password");
  const newPassword = useInput("password", "Password");

  useEffect(() => {
    user === null ? <Redirect to='/login' /> : <MyAccount />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: IUserUpdate = {
      email: email.value,
      password: newPassword.value,
      name: name.value,
    };

    updateUserDetails(newUser);

    email.onSubmit();
    name.onSubmit();
    oldPassword.onSubmit();
    newPassword.onSubmit();
  };

  const formBody = () => {
    return (
      <div>
        <h2>My Account</h2>
        <div className='card-text'>
          <StdFormInput
            inputField={email}
            label='Email'
            id='email'
            requiredField={false}
          />
          <StdFormInput
            inputField={name}
            label='Name'
            id='name'
            requiredField={false}
          />
          <StdFormInput
            inputField={oldPassword}
            label='Current password'
            id='oldPassword'
            requiredField={false}
          />
          <StdFormInput
            inputField={newPassword}
            label='New password'
            id='newPassword'
            requiredField={false}
          />
        </div>
        <div className='card-footer mt-3'>
          <button type='submit' className='btn btn-primary main-button'>
            Update details
          </button>
          <br />
        </div>
      </div>
    );
  };

  return <FormComponent body={formBody} onSubmit={handleRegister} />;
};
