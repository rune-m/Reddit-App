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
import { useNotification } from "./NotificationContext";

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

  const { newNotification } = useNotification();

  useEffect(() => {
    console.log("fetching localStorage...");
    const activeUserJSON = window.localStorage.getItem("activeUser");
    console.log("Active user", activeUserJSON);
    if (activeUserJSON) {
      const user = JSON.parse(activeUserJSON);
      setUser(user);
    }
  }, []);

  const updateUser = (user: any) => {
    setUser(user);
  };

  const login = async (credentials: IUserLogin) => {
    try {
      const activeUser = await userService.create(credentials, "/login");
      // Update localStorage
      window.localStorage.setItem("activeUser", JSON.stringify(activeUser));
      console.log("set token", activeUser.token);
      // Update state
      setUser(activeUser);
      newNotification("");
    } catch (error) {
      console.log("Invalid login credentials", error.response.data);
      newNotification(error.response.data.errorMsg);
    }
  };

  const register = async (user: IUserNew) => {
    try {
      const newUser = await userService.create(user, "/register");
      if (newUser) {
        // Update localStorage
        window.localStorage.setItem("activeUser", JSON.stringify(newUser));
        // Update state
        setUser(newUser);
      }
    } catch (error) {
      console.log("error creating new user:", error.response.data);
      newNotification(error.response.data.errorMsg);
    }
  };

  const logout = async () => {
    window.localStorage.removeItem("activeUser");
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
