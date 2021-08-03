import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useService } from "../hooks/useService";
import {
  ContextProps,
  IUserNew,
  UserContextState,
  IUserLogin,
  IUserToken,
  IUserUpdate,
} from "../types/types";
import { useNotification } from "./NotificationContext";

const contextDefaultValues: UserContextState = {
  user: null,
  login: () => {},
  register: () => {},
  updateUser: () => {},
  logout: () => {},
  fetchLocalStorageForUser: () => {},
  updateUserDetails: () => {},
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
    console.log(user);
    if (user === null) fetchLocalStorageForUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUser = (user: any) => {
    setLocalStorageForUser(user);
    setUser(user);
  };

  const login = async (credentials: IUserLogin) => {
    try {
      const activeUser = await userService.create(credentials, "/login");
      // Update localStorage
      setLocalStorageForUser(activeUser);
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
        setLocalStorageForUser(newUser);
        // Update state
        setUser(newUser);
      }
    } catch (error) {
      console.log("error creating new user:", error.response.data);
      newNotification(error.response.data.errorMsg);
    }
  };

  const updateUserDetails = async (userToUpdate: IUserUpdate) => {
    try {
      let updatedUser;
      if (user && user.id) {
        console.log(typeof user.id);
        updatedUser = await userService.update(user.id, userToUpdate);
        updateUser({
          ...user,
          name: updatedUser.name,
          email: updatedUser.email,
        });
      }
      console.log("Updated user", updatedUser);
      // Update token?
    } catch (error) {
      console.log("Error updating user details", error.response.data);
      newNotification(error.response.data.errorMsg);
    }
  };

  const logout = async () => {
    window.localStorage.removeItem("activeUser");
    setUser(null);
  };

  const fetchLocalStorageForUser = async () => {
    console.log("UserTOKEN", user);
    console.log("fetching localStorage...");
    const activeUserJSON = window.localStorage.getItem("activeUser");
    console.log("Active user", activeUserJSON);
    if (activeUserJSON) {
      const user = JSON.parse(activeUserJSON);

      setUser(user);

      // const fetchedUser = await userService.get(user.id);
      // console.log(fetchedUser);
      // updateUser({
      //   ...user,
      //   name: fetchedUser.name,
      //   email: fetchedUser.email,
      // });
    }
  };

  const setLocalStorageForUser = (activeUser: any) => {
    window.localStorage.setItem("activeUser", JSON.stringify(activeUser));
    console.log("set token", activeUser.token);
  };

  return (
    <UserState.Provider
      value={{
        user,
        login,
        register,
        updateUser,
        logout,
        fetchLocalStorageForUser,
        updateUserDetails,
      }}
    >
      {children}
    </UserState.Provider>
  );
};
