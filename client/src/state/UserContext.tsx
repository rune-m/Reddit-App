import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useService } from "../hooks/useService";
import {
  ContextProps,
  IUserNew,
  UserContextState,
  IUserLogin,
  IUserToken,
} from "../types/types";

const contextDefaultValues: UserContextState = {
  user: null,
  login: () => {},
  register: () => {},
  updateUser: () => {},
  logout: () => {},
};

const UserState = React.createContext<UserContextState>(contextDefaultValues);

export function useUser() {
  return useContext(UserState);
}

export const UserContext = ({ children }: ContextProps) => {
  const [user, setUser] = useState<IUserToken | null>(null);

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
      console.log("set token", activeUser.token);
      // Update state
      setUser(activeUser);
    } catch (err) {
      console.log("Invalid login credentials", err.response.data);
    }
  };

  const register = async (user: IUserNew) => {
    try {
      const newUser = await userService.create(user, "/register");
      if (newUser) {
        // Update localStorage
        window.localStorage.setItem("activeUser", JSON.stringify(newUser));
        // Update token
        userService.updateToken(newUser.token);
        // Update state
        setUser(newUser);
      }
    } catch (err) {
      console.log("Error creating new user:", err.response.data);
    }
  };

  const logout = async () => {
    window.localStorage.removeItem("activeUser");
    userService.updateToken("");
    setUser(null);
  };

  return (
    <UserState.Provider
      value={{
        user,
        login,
        register,
        updateUser,
        logout,
      }}
    >
      {children}
    </UserState.Provider>
  );
};
