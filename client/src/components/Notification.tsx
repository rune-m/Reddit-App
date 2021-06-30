import React from "react";
import { useNotification } from "../state/NotificationContext";

export const Notification = () => {
  const { notification } = useNotification();

  return (
    <>
      <footer className='fixed-bottom m-2'>
        {notification && (
          <div
            className='alert alert-primary fade show custom-alert col-xs-12 col-sm-5 col-md-4 col-lg-3 col-xl-3'
            role='alert'
          >
            {notification}
          </div>
        )}
      </footer>
    </>
  );
};
