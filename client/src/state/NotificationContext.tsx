import React, { useContext, useState } from "react";
import { ContextProps, NotificationContextState } from "../types/types";

const contextDefaultValues: NotificationContextState = {
  notification: "",
  newNotification: () => {},
};

const NotificationState =
  React.createContext<NotificationContextState>(contextDefaultValues);

export function useNotification() {
  return useContext(NotificationState);
}

export const NotificationContext = ({ children }: ContextProps) => {
  const [notification, setNotification] = useState<string>("");

  const newNotification = (msg: string) => {
    const noMessage = notification === "";
    setNotification(msg);
    if (noMessage) setTimeout(() => setNotification(""), 5000);
  };

  return (
    <NotificationState.Provider
      value={{
        notification,
        newNotification,
      }}
    >
      {children}
    </NotificationState.Provider>
  );
};
