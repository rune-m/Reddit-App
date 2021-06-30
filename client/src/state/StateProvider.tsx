import * as React from "react";
import { ContextProps } from "../types/types";
import { PostContext } from "./PostContext";
import { UserContext } from "./UserContext";
import { NotificationContext } from "./NotificationContext";

const State = React.createContext(null);

export const StateProvider = ({ children }: ContextProps) => {
  return (
    <State.Provider value={null}>
      <NotificationContext>
        <UserContext>
          <PostContext>{children}</PostContext>
        </UserContext>
      </NotificationContext>
    </State.Provider>
  );
};
