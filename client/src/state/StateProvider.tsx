import * as React from "react";
import { ContextProps } from "../types/types";
import { PostContext } from "./PostContext";
import { UserContext } from "./UserContext";

const State = React.createContext(null);

export const StateProvider = ({ children }: ContextProps) => {
  return (
    <State.Provider value={null}>
      <UserContext>
        <PostContext>{children}</PostContext>
      </UserContext>
    </State.Provider>
  );
};
