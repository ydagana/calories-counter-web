import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo from "../Logo";
import FooterContent from "../FooterContent";
import RegisterForm from "../RegisterForm";

class Register extends Component {
  render() {
    return (
      <div className="block-center mt-4 wd-xl">
        <div className="card card-flat">
          <div className="card-header text-center bg-dark">
            <Logo />
          </div>
          <div className="card-body">
            <p className="text-center py-2">SIGNUP TO GET INSTANT ACCESS.</p>
            <RegisterForm />
            <p className="pt-3 text-center">Have an account?</p>
            <Link to="login" className="btn btn-block btn-secondary">
              Signup
            </Link>
          </div>
        </div>
        <FooterContent />
      </div>
    );
  }
}

export default Register;
