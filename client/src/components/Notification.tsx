import React, { useState } from "react";
import { Toast } from "react-bootstrap";

export const Notification = () => {
  const [notification, setNotification] = useState(
    "Post is deleted from server"
  );

  return (
    <>
      <footer className='fixed-bottom'>
        {notification && (
          <div
            className='alert alert-primary fade show custom-alert col-xs-12 col-sm-5 col-md-4 col-lg-3 col-xl-3'
            role='alert'
          >
            {notification}
          </div>
        )}
      </footer>
      {/* <div
        aria-live='polite'
        aria-atomic='true'
        style={{
          position: "relative",
          minHeight: "100px",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            margin: "1em",
          }}
        >
          <Toast
          // style={{
          //   position: "absolute",
          //   bottom: 0,
          //   right: 0,
          //   margin: "1em",
          // }}
          >
            <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
          </Toast>
          <Toast
          // style={{
          //   position: "absolute",
          //   bottom: 0,
          //   right: 0,
          //   margin: "1em",
          // }}
          >
            <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
          </Toast>
        </div>
      </div> */}
    </>
  );
};
