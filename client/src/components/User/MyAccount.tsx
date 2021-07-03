import * as React from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import { useUser } from "../../state/UserContext";
import { FormComponent } from "./FormComponent";
import { StdFormInput } from "./StdFormInput";

export const MyAccount = () => {
  const { user } = useUser();

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

    // const newUser: IUserNew = {
    //   email: email.value,
    //   password: password.value,
    //   name: name.value,
    // };

    // register(newUser);

    console.log(user);

    if (user) {
      email.onSubmit();
      name.onSubmit();
      oldPassword.onSubmit();
      newPassword.onSubmit();
    }
  };

  const formBody = () => {
    return (
      <div>
        <h2>My Account</h2>
        <div className='card-text'>
          <StdFormInput inputField={email} label='Email' id='email' />
          <StdFormInput inputField={name} label='Name' id='name' />
          <StdFormInput
            inputField={oldPassword}
            label='Current password'
            id='oldPassword'
          />
          <StdFormInput
            inputField={newPassword}
            label='New password'
            id='newPassword'
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
