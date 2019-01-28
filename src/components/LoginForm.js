import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import FormValidator from "../services/formValidator";
import { submitLogin } from "../actionCreators/user.actions";

class LoginForm extends Component {
  static propTypes = {
    submitLogin: PropTypes.func
  };

  state = {
    formLogin: {
      email: "ydagana@email.com",
      password: "password"
    }
  };

  /**
   * Validate input using onChange event
   * @param  {String} formName The name of the form in the state object
   * @return {Function} a function used for the event
   */
  validateOnChange = event => {
    const input = event.target;
    const form = input.form;
    const value = input.type === "checkbox" ? input.checked : input.value;

    const result = FormValidator.validate(input);

    this.setState({
      [form.name]: {
        ...this.state[form.name],
        [input.name]: value,
        errors: {
          ...this.state[form.name].errors,
          [input.name]: result
        }
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter(i =>
      ["INPUT", "SELECT"].includes(i.nodeName)
    );

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    this.setState({
      [form.name]: {
        ...this.state[form.name],
        errors
      }
    });

    if (!hasError) {
      this.props.submitLogin(this.state.formLogin);
    }
  };

  /* Simplify error check */
  hasError = (formName, inputName, method) => {
    return (
      this.state[formName] &&
      this.state[formName].errors &&
      this.state[formName].errors[inputName] &&
      this.state[formName].errors[inputName][method]
    );
  };

  render() {
    return (
      <form className="mb-3" name="formLogin" onSubmit={this.onSubmit}>
        <div className="form-group">
          <div className="input-group with-focus">
            <Input
              type="email"
              name="email"
              className="border-right-0"
              placeholder="Enter email"
              invalid={
                this.hasError("formLogin", "email", "required") ||
                this.hasError("formLogin", "email", "email")
              }
              onChange={this.validateOnChange}
              data-validate='["required", "email"]'
              value={this.state.formLogin.email}
            />
            <div className="input-group-append">
              <span className="input-group-text text-muted bg-transparent border-left-0">
                <em className="fa fa-envelope" />
              </span>
            </div>
            {this.hasError("formLogin", "email", "required") && (
              <span className="invalid-feedback">Field is required</span>
            )}
            {this.hasError("formLogin", "email", "email") && (
              <span className="invalid-feedback">
                Field must be valid email
              </span>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="input-group with-focus">
            <Input
              type="password"
              id="id-password"
              name="password"
              className="border-right-0"
              placeholder="Password"
              invalid={this.hasError("formLogin", "password", "required")}
              onChange={this.validateOnChange}
              data-validate='["required"]'
              value={this.state.formLogin.password}
            />
            <div className="input-group-append">
              <span className="input-group-text text-muted bg-transparent border-left-0">
                <em className="fa fa-lock" />
              </span>
            </div>
            <span className="invalid-feedback">Field is required</span>
          </div>
        </div>
        <div className="clearfix">
          <div className="checkbox c-checkbox float-left mt-0">
            <label>
              <input type="checkbox" value="" name="remember" />
              <span className="fa fa-check" />
              Remember Me
            </label>
          </div>
          <div className="float-right">
            <Link to="recover" className="text-muted">
              Forgot your password?
            </Link>
          </div>
        </div>
        <button className="btn btn-block btn-primary mt-3" type="submit">
          Login
        </button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitLogin: values => dispatch(submitLogin(values))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
