import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Input } from "reactstrap";

import FormValidator from "../services/formValidator";
import { submitRegister } from "../actionCreators/user.actions";

class RegisterForm extends Component {
  static propTypes = {
    submitLogin: PropTypes.func
  };

  state = {
    formRegister: {
      username: "",
      email: "",
      password: "",
      password2: ""
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
    const value = input.value;

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
      this.props.submitRegister(this.state.formRegister);
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
      <form className="mb-3" name="formRegister" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label className="text-muted" htmlFor="signupInputUsername">
            Username
          </label>
          <div className="input-group with-focus">
            <Input
              type="text"
              name="username"
              className="border-right-0"
              placeholder="Enter your username"
              invalid={this.hasError("formRegister", "username", "required")}
              onChange={this.validateOnChange}
              data-validate='["required"]'
              value={this.state.formRegister.username}
            />
            <div className="input-group-append">
              <span className="input-group-text text-muted bg-transparent border-left-0">
                <em className="fa fa-user-tie" />
              </span>
            </div>
            {this.hasError("formRegister", "username", "required") && (
              <span className="invalid-feedback">Field is required</span>
            )}
          </div>
        </div>
        <div className="form-group">
          <label className="text-muted" htmlFor="signupInputEmail1">
            Email address
          </label>
          <div className="input-group with-focus">
            <Input
              type="email"
              name="email"
              className="border-right-0"
              placeholder="Enter email"
              invalid={
                this.hasError("formRegister", "email", "required") ||
                this.hasError("formRegister", "email", "email")
              }
              onChange={this.validateOnChange}
              data-validate='["required", "email"]'
              value={this.state.formRegister.email}
            />
            <div className="input-group-append">
              <span className="input-group-text text-muted bg-transparent border-left-0">
                <em className="fa fa-envelope" />
              </span>
            </div>
            {this.hasError("formRegister", "email", "required") && (
              <span className="invalid-feedback">Field is required</span>
            )}
            {this.hasError("formRegister", "email", "email") && (
              <span className="invalid-feedback">
                Field must be valid email
              </span>
            )}
          </div>
        </div>
        <div className="form-group">
          <label className="text-muted" htmlFor="signupInputPassword1">
            Password
          </label>
          <div className="input-group with-focus">
            <Input
              type="password"
              id="id-password"
              name="password"
              className="border-right-0"
              placeholder="Password"
              invalid={
                this.hasError("formRegister", "password", "required") ||
                this.hasError("formRegister", "password", "len")
              }
              onChange={this.validateOnChange}
              data-validate='["required","len"]'
              data-param="[6, 50]"
              value={this.state.formRegister.password}
            />
            <div className="input-group-append">
              <span className="input-group-text text-muted bg-transparent border-left-0">
                <em className="fa fa-lock" />
              </span>
            </div>
            <span className="invalid-feedback">
              Password should be between 6 and 50 characters
            </span>
          </div>
        </div>
        <div className="form-group">
          <label className="text-muted" htmlFor="signupInputRePassword1">
            Retype Password
          </label>
          <div className="input-group with-focus">
            <Input
              type="password"
              name="password2"
              className="border-right-0"
              placeholder="Retype assword"
              invalid={this.hasError("formRegister", "password2", "equalto")}
              onChange={this.validateOnChange}
              data-validate='["equalto"]'
              value={this.state.formRegister.password2}
              data-param="id-password"
            />
            <div className="input-group-append">
              <span className="input-group-text text-muted bg-transparent border-left-0">
                <em className="fa fa-lock" />
              </span>
            </div>
            <span className="invalid-feedback">
              Field must be equal to previous
            </span>
          </div>
        </div>
        <button className="btn btn-block btn-primary mt-3" type="submit">
          Create account
        </button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitRegister: values => dispatch(submitRegister(values))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);
