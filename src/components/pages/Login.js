import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo from "../Logo";
import FooterContent from "../FooterContent";
import LoginForm from "../LoginForm";

class Login extends Component {
  render() {
    return (
      <div className="block-center mt-4 wd-xl">
        <div className="card card-flat">
          <div className="card-header text-center bg-dark">
            <Logo />
          </div>
          <div className="card-body">
            <p className="text-center py-2">SIGN IN TO CONTINUE.</p>
            <LoginForm />
            <p className="pt-3 text-center">Need to Signup?</p>
            <Link to="register" className="btn btn-block btn-secondary">
              Register Now
            </Link>
          </div>
        </div>
        <FooterContent />
      </div>
    );
  }
}

export default Login;
