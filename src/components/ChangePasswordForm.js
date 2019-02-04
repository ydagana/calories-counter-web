import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, Input, Card, CardHeader, CardBody, CardFooter } from "reactstrap";

import FormValidator from "../services/formValidator.js";
import { submitUpdatePassword } from "../actionCreators/user.actions";
import { createStructuredSelector } from "reselect";
import { selectPasswordUpdatingState } from "../selectors/user.selectors";

class ChangePasswordForm extends Component {
  static propTypes = {
    updatingPassword: PropTypes.bool,
    submitUpdate: PropTypes.func
  };

  state = {
    passwordForm: {
      oldPassword: "",
      newPassword: "",
      newPassword2: ""
    }
  };

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
      this.props.submitUpdate(this.state.passwordForm);
    }

    e.preventDefault();
  };

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
      <form onSubmit={this.onSubmit} name="passwordForm">
        {/* START card */}
        <Card className="card-default">
          <CardHeader>
            <div className="card-title">Change your password</div>
          </CardHeader>
          <CardBody>
            <fieldset>
              <div className="form-group row align-items-center">
                <label className="col-md-2 col-form-label">
                  Current Password
                </label>
                <Col md={6}>
                  <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Current Password"
                    invalid={this.hasError(
                      "passwordForm",
                      "oldPassword",
                      "required"
                    )}
                    onChange={this.validateOnChange}
                    data-validate='["required"]'
                    value={this.state.passwordForm.password}
                  />
                  <span className="invalid-feedback">Field is required</span>
                </Col>
                <Col md={4} />
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group row align-items-center">
                <label className="col-md-2 col-form-label">New Password</label>
                <div className="col-sm-3">
                  <Input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="New Password"
                    value={this.state.passwordForm.newPassword}
                    invalid={
                      this.hasError(
                        "passwordForm",
                        "newPassword",
                        "required"
                      ) || this.hasError("passwordForm", "newPassword", "len")
                    }
                    onChange={this.validateOnChange}
                    data-validate='["required","len"]'
                    data-param="[6, 50]"
                  />
                  <span className="invalid-feedback">Field is required</span>
                </div>
                <div className="col-sm-3">
                  <Input
                    type="password"
                    name="newPassword2"
                    placeholder="Retype New Password"
                    invalid={this.hasError(
                      "passwordForm",
                      "newPassword2",
                      "equalto"
                    )}
                    onChange={this.validateOnChange}
                    data-validate='["equalto"]'
                    value={this.state.passwordForm.newPassword2}
                    data-param="newPassword"
                  />
                  <span className="invalid-feedback">
                    Field must be equal to previous
                  </span>
                </div>
                <Col md={4} />
              </div>
            </fieldset>
          </CardBody>
          <CardFooter className="text-right">
            <button type="submit" className="btn btn-primary">
              {this.props.updatingPassword ? (
                <div className="ball-pulse h-20">
                  <div className="bg-white" />
                  <div className="bg-white" />
                  <div className="bg-white" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </CardFooter>
        </Card>
        {/* END card */}
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  updatingPassword: selectPasswordUpdatingState()
});

const mapDispatchToProps = dispatch => {
  return {
    submitUpdate: values => dispatch(submitUpdatePassword(values))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordForm);
