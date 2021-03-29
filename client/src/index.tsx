import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { PostEntry } from "./types/types";

import "./scss/index.scss";

let dummyPosts: Array<PostEntry> = [
  {
    id: 1,
    title: "Post 1",
    content: "This is my first post",
    author: "Ola",
    date: Date.now().toString(),
    upvotes: 2,
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is my second post",
    author: "Ola",
    date: Date.now().toString(),
    upvotes: 2,
  },
];

ReactDOM.render(
  <React.StrictMode>
    {console.log(dummyPosts)}
    <App dummyPosts={dummyPosts}></App>
  </React.StrictMode>,
  document.getElementById("root")
);
