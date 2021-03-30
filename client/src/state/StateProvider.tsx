import * as React from "react";
import { ContextProps } from "../types/types";
import { PostContext } from "./PostContext";

const State = React.createContext(null);

export const StateProvider = ({ children }: ContextProps) => {
  return (
    <State.Provider value={null}>
      <PostContext>{children}</PostContext>
    </State.Provider>
  );
};
