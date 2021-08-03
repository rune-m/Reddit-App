import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import { useUser } from "../../state/UserContext";
import { IUserUpdate } from "../../types/types";
import { FormComponent } from "./FormComponent";
import { EditFormInput } from "./EditFormInput";
import { StdFormInput } from "./StdFormInput";
import { LoginForm } from "./LoginForm";

export const MyAccount = () => {
  const { user, updateUserDetails } = useUser();

  const oldPassword = useInput("password", "Password");
  const newPassword = useInput("password", "Password");

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    console.log("User MyAccount", user);
    user === null ? <Redirect to='/login' /> : <MyAccount />;
    <Redirect to='/login' />;
    console.log("asdasdda", user);
    if (user) {
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("name", name, "email", email);

    const newUser: IUserUpdate & { oldPassword: string } = {
      email,
      oldPassword: oldPassword.value,
      password: newPassword.value,
      name,
    };

    updateUserDetails(newUser);

    oldPassword.onSubmit();
    newPassword.onSubmit();
  };

  const formBody = () => {
    return (
      <>
        <div>
          {/* {user === null ? <Redirect to='/login' /> : <MyAccount />} */}
          <h2>My Account</h2>
          <div className='card-text'>
            <EditFormInput
              label='Email'
              id='email'
              requiredField={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <EditFormInput
              label='Name'
              id='name'
              requiredField={false}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label>Change password:</label>
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
      </>
    );
  };

  return (
    <>
      {user !== null ? (
        <FormComponent body={formBody} onSubmit={handleEdit} />
      ) : (
        <LoginForm />
      )}
      )
    </>
  );
};
