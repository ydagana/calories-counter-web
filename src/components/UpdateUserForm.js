import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, Input, Card, CardHeader, CardBody, CardFooter } from "reactstrap";

import FormValidator from "../services/formValidator.js";
import { submitUpdateUser } from "../actionCreators/user.actions";
import { createStructuredSelector } from "reselect";
import {
  selectUserData,
  selectUserUpdatingState
} from "../selectors/user.selectors";

class UpdateUserForm extends Component {
  static propTypes = {
    userData: PropTypes.object,
    updatingUser: PropTypes.bool,
    submitUpdate: PropTypes.func
  };

  state = {
    profileForm: {
      username: "",
      email: "",
      caloriesGoal: ""
    }
  };

  componentDidMount() {
    this.initializeState(this.props.userData);
  }

  componentDidUpdate() {
    if (!this.state.profileForm.username) {
      this.initializeState(this.props.userData);
    }
  }

  initializeState = userData => {
    if (userData) {
      this.setState({
        profileForm: {
          username: userData.username || "",
          email: userData.email || "",
          caloriesGoal: userData.caloriesGoal || ""
        }
      });
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

    if (!hasError && this.props.userData.id) {
      this.props.submitUpdate({
        ...this.state.profileForm,
        id: this.props.userData.id
      });
    }

    e.preventDefault();
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
      <form onSubmit={this.onSubmit} name="profileForm">
        {/* START card */}
        <Card className="card-default">
          <CardHeader>
            <div className="card-title">Edit your Profile</div>
          </CardHeader>
          <CardBody>
            <fieldset>
              <div className="form-group row align-items-center">
                <label className="col-md-2 col-form-label">Username</label>
                <Col md={6}>
                  <Input
                    type="text"
                    name="username"
                    invalid={this.hasError(
                      "profileForm",
                      "username",
                      "required"
                    )}
                    onChange={this.validateOnChange}
                    data-validate='["required"]'
                    value={this.state.profileForm.username}
                  />
                  <span className="invalid-feedback">Field is required</span>
                </Col>
                <Col md={4} />
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group row align-items-center">
                <label className="col-md-2 col-form-label">Email</label>
                <Col md={6}>
                  <Input
                    type="email"
                    name="email"
                    invalid={
                      this.hasError("profileForm", "email", "required") ||
                      this.hasError("profileForm", "email", "email")
                    }
                    onChange={this.validateOnChange}
                    data-validate='["required", "email"]'
                    value={this.state.profileForm.email}
                  />
                  {this.hasError("profileForm", "email", "required") && (
                    <span className="invalid-feedback">Field is required</span>
                  )}
                  {this.hasError("profileForm", "email", "email") && (
                    <span className="invalid-feedback">
                      Field must be valid email
                    </span>
                  )}
                </Col>
                <Col md={4} />
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group row align-items-center">
                <label className="col-md-2 col-form-label">
                  Calories Daily Goal
                </label>
                <Col md={6}>
                  <Input
                    type="text"
                    name="caloriesGoal"
                    invalid={this.hasError(
                      "profileForm",
                      "caloriesGoal",
                      "number"
                    )}
                    onChange={this.validateOnChange}
                    data-validate='["integer"]'
                    value={this.state.profileForm.caloriesGoal}
                  />
                  <span className="invalid-feedback">
                    Field must be valid number
                  </span>
                </Col>
                <Col md={4} />
              </div>
            </fieldset>
          </CardBody>
          <CardFooter className="text-right">
            <button type="submit" className="btn btn-primary">
              {this.props.updatingUser ? (
                <div className="ball-pulse h-20">
                  <div className="bg-white" />
                  <div className="bg-white" />
                  <div className="bg-white" />
                </div>
              ) : (
                "Update"
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
  userData: selectUserData(),
  updatingUser: selectUserUpdatingState()
});

const mapDispatchToProps = dispatch => {
  return {
    submitUpdate: values => dispatch(submitUpdateUser(values))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserForm);
