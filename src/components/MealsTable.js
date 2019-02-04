import React, { Component } from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";
import moment from "moment";
import swal from "sweetalert";

class MealsTable extends Component {
  static propTypes = {
    userData: PropTypes.object,
    meals: PropTypes.object,
    mealsStats: PropTypes.array,
    toggleAddEditMealModal: PropTypes.func,
    deleteMeal: PropTypes.func,
    deleteMealState: PropTypes.bool
  };

  deleteMealAlert = id => {
    swal({
      title: "Are you sure you want to delete this meal?",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          visible: true,
          closeModal: true
        },
        confirm: {
          text: "Yes, delete it!",
          value: true,
          visible: true,
          className: "bg-danger",
          closeModal: false
        }
      }
    }).then(confirm => {
      if (confirm) {
        this.props.deleteMeal(id);
        swal("Your delete request is received!", {
          icon: "success"
        });
        setTimeout(swal.close, 1500);
      }
    });
  };

  render() {
    const { meals, toggleAddEditMealModal, mealsStats, userData } = this.props;
    return (
      <Table striped responsive className="meals-table">
        <thead>
          <tr>
            <th className="p-0" colSpan="5">
              <img className="img-fluid" src="img/meals.jpg" alt="" />
            </th>
          </tr>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Calories</th>
            <th>Time</th>
            <th />
          </tr>
        </thead>
        {meals.details.length ? (
          <tbody>
            {meals.details.map((meal, index) => {
              const mealDayCalories = mealsStats.filter(
                m =>
                  moment(m.mealDay).format("L") ===
                  moment(meal.time).format("L")
              );
              let isRed =
                mealDayCalories.length &&
                userData.caloriesGoal &&
                mealDayCalories[0].dailyCalories > userData.caloriesGoal;
              return (
                <tr key={index}>
                  <td>{meal.type}</td>
                  <td>{meal.description}</td>
                  <td>
                    <span className={isRed ? "text-danger" : "text-success"}>
                      {meal.calories}
                    </span>
                  </td>
                  <td>{moment(meal.time).format("LLLL")}</td>
                  <td className="action-btns">
                    <button
                      className="btn btn-outline-secondary mr-2"
                      onClick={() => toggleAddEditMealModal(meal)}
                    >
                      <i className="far fa-edit" />
                    </button>
                    <button
                      className="btn btn-outline-secondary mr-2"
                      onClick={() => this.deleteMealAlert(meal.id)}
                    >
                      <i className="far fa-trash-alt" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              {meals.fetching ? (
                <td colSpan={5} className="text-center pt-10">
                  <div className="d-flex align-items-center block-center preview-md">
                    <div className="ball-pulse-rise">
                      <div />
                      <div />
                      <div />
                      <div />
                      <div />
                    </div>
                  </div>
                </td>
              ) : (
                <td colSpan={5} className="text-center pt-10">
                  <h2>Your stomach must be empty! :(</h2>
                  <p className="m-0">
                    <button
                      className="btn btn-xl btn-link"
                      onClick={toggleAddEditMealModal}
                    >
                      Please add a meal!
                    </button>
                  </p>
                </td>
              )}
            </tr>
          </tbody>
        )}
      </Table>
    );
  }
}

export default MealsTable;
