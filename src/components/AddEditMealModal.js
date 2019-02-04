import React, { Component } from "react";
import Datetime from "react-datetime";
import moment from "moment";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Input
} from "reactstrap";
import "react-datetime/css/react-datetime.css";
import "loaders.css/loaders.css";

import FormValidator from "../services/formValidator";
import { submitAddMeal, submitEditMeal } from "../actionCreators/meal.actions";
import { selectMealForm } from "../selectors/meal.selectors";
import PropTypes from "prop-types";

class AddEditMealModal extends Component {
  static propTypes = {
    submitAddMeal: PropTypes.func,
    mealForm: PropTypes.object,
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    isEdit: PropTypes.bool,
    meal: PropTypes.object
  };

  state = {
    formAddMeal: {
      type: "snack",
      calories: "",
      description: "",
      time: moment().toISOString(),
      errors: null
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.mealForm.submitting && !this.props.mealForm.submitting) {
      this.props.toggleModal();
      if (!this.props.mealForm.error) {
        this.resetFormState();
      }
    }
    if (this.props.isEdit && this.props.meal && !prevProps.meal) {
      this.setState({
        formAddMeal: {
          type: this.props.meal.type,
          calories: this.props.meal.calories,
          description: this.props.meal.description,
          time: this.props.meal.time,
          errors: null
        }
      });
    }
    if (prevProps.isEdit && !this.props.isEdit) {
      this.resetFormState();
    }
  }

  resetFormState = () => {
    this.setState({
      formAddMeal: {
        type: "snack",
        calories: "",
        description: "",
        time: moment().toISOString(),
        errors: null
      }
    });
  };

  onTimeChange = e => {
    const time =
      e && e.toISOString ? e.toISOString() : this.state.formAddMeal.time;
    this.setState({
      formAddMeal: { ...this.state.formAddMeal, time }
    });
  };

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

  hasError = (formName, inputName, method) => {
    return (
      this.state[formName] &&
      this.state[formName].errors &&
      this.state[formName].errors[inputName] &&
      this.state[formName].errors[inputName][method]
    );
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
      const { errors, ...formValues } = this.state[form.name]; // eslint-disable-line
      if (this.props.isEdit && this.props.meal.id) {
        this.props.submitEditMeal({ id: this.props.meal.id, ...formValues });
      } else {
        this.props.submitAddMeal(formValues);
      }
      // fire submit form action, change submit to loading, listen to props to close the modal or show an error
    }
  };

  render() {
    const { isOpen, toggleModal, mealForm, isEdit } = this.props;
    return (
      <Modal className="modal-lg" isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <strong>{isEdit ? "Edit Meal" : "Add a New Meal"}</strong>
        </ModalHeader>
        <form
          className="form-horizontal"
          name="formAddMeal"
          onSubmit={this.onSubmit}
        >
          <ModalBody>
            <FormGroup row>
              <label className="col-xl-2 col-form-label">Type</label>
              <div className="col-xl-10">
                <div className="col-xl-6 pl-0">
                  <select
                    className="custom-select"
                    name="type"
                    data-validate='["required"]'
                    onChange={this.validateOnChange}
                    value={this.state.formAddMeal.type}
                  >
                    <option value="snack">Snack</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>
              </div>
            </FormGroup>
            <FormGroup row>
              <label className="col-xl-2 col-form-label">Calories</label>
              <div className="col-xl-10">
                <Input
                  type="number"
                  name="calories"
                  data-validate='["required", "interval"]'
                  data-param="[1, 10000]"
                  onChange={this.validateOnChange}
                  value={this.state.formAddMeal.calories}
                  placeholder="How many calories are in this meal?"
                  invalid={
                    this.hasError("formAddMeal", "calories", "required") ||
                    this.hasError("formAddMeal", "calories", "interval")
                  }
                />
              </div>
            </FormGroup>
            <FormGroup row>
              <label className="col-xl-2 col-form-label">Description</label>
              <div className="col-xl-10">
                <Input
                  type="text"
                  name="description"
                  data-validate='["maxlen"]'
                  data-param="500"
                  onChange={this.validateOnChange}
                  value={this.state.formAddMeal.description}
                  placeholder="Meal Description, ex: rice, fish, an orange and a banana"
                  invalid={this.hasError(
                    "formAddMeal",
                    "description",
                    "maxlen"
                  )}
                />
              </div>
            </FormGroup>
            <FormGroup row>
              <label className="col-xl-2 col-form-label">
                Meal date &amp; time
              </label>
              <div className="col-xl-10">
                <Datetime
                  inputProps={{
                    className: "form-control",
                    name: "time",
                    value: moment(this.state.formAddMeal.time).format(
                      "MM/DD/YYYY h:mm A"
                    )
                  }}
                  name="time"
                  viewMode="time"
                  onChange={this.onTimeChange}
                  defaultValue={moment(this.state.formAddMeal.time)}
                  value={moment(this.state.formAddMeal.time)}
                  isValidDate={c => c.isSameOrBefore(moment())} // we do not want to allow future meals
                />
              </div>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              className="btn-fw btn-fh btn-lg"
              disabled={mealForm.submitting}
            >
              {mealForm.submitting ? (
                <div className="ball-pulse h-20">
                  <div className="bg-white" />
                  <div className="bg-white" />
                  <div className="bg-white" />
                </div>
              ) : (
                "Submit"
              )}
            </Button>
            <Button
              color="secondary"
              className="btn-fw btn-fh btn-lg"
              onClick={toggleModal}
              disabled={mealForm.submitting}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  mealForm: selectMealForm()
});

function mapDispatchToProps(dispatch) {
  return {
    submitAddMeal: values => dispatch(submitAddMeal(values)),
    submitEditMeal: values => dispatch(submitEditMeal(values))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditMealModal);
