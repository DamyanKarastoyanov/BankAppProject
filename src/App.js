import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./browserRouter";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
