import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useService } from "../hooks/useService";
import {
  IUser,
  ContextProps,
  IUserNew,
  UserContextState,
  IUserLogin,
} from "../types/types";

const contextDefaultValues: UserContextState = {
  user: null,
  login: () => {},
  register: () => {},
  updateUser: () => {},
};

const UserState = React.createContext<UserContextState>(contextDefaultValues);

export function useUser() {
  return useContext(UserState);
}

export const UserContext = ({ children }: ContextProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  const baseUrl = "/api/users";
  const userService = useService(baseUrl);

  useEffect(() => {
    console.log("fetching localStorage...");
    const activeUserJSON = window.localStorage.getItem("activeUser");
    console.log("Active user", activeUserJSON);
    if (activeUserJSON) {
      const user = JSON.parse(activeUserJSON);
      setUser(user);
      console.log("User", user);
      userService.updateToken(user.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUser = (user: any) => {
    setUser(user);
    userService.updateToken(user.token);
  };

  const login = async (credentials: IUserLogin) => {
    try {
      const activeUser = await userService.create(credentials, "/login");
      // Update localStorage
      window.localStorage.setItem("activeUser", JSON.stringify(activeUser));
      // Update token
      userService.updateToken(activeUser.token);
      // Update state
      setUser(activeUser);
    } catch (err) {
      console.log("Invalid login credentials");
    }
  };

  const register = async (user: IUserNew) => {
    try {
      const newUser = await userService.create(user, "/register");
      if (newUser) {
        setUser(newUser);
      }
      return newUser;
    } catch (err) {
      console.log("Error creating new user");
      return null;
    }
  };

  return (
    <UserState.Provider
      value={{
        user,
        login,
        register,
        updateUser,
      }}
    >
      {children}
    </UserState.Provider>
  );
};
