import React from "react";
import { ToastContainer } from "react-toastify";

const BasePage = props => (
  <div className="wrapper">
    <ToastContainer autoClose={3000} />
    {props.children}
  </div>
);

export default BasePage;
