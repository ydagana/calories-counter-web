import React, { Component } from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";
import moment from "moment";

class MealsTable extends Component {
  static propTypes = {
    meals: PropTypes.object
  };

  render() {
    const { meals, toggleAddMealModal } = this.props;
    return (
      <Table striped responsive>
        <thead>
          <tr>
            <th className="p-0" colSpan="4">
              <img className="img-fluid" src="img/meals.jpg" alt="" />
            </th>
          </tr>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Calories</th>
            <th>Time</th>
          </tr>
        </thead>
        {meals.details.length ? (
          <tbody>
            {meals.details.map((meal, index) => {
              return (
                <tr key={index}>
                  <td>{meal.type}</td>
                  <td>{meal.description}</td>
                  <td>{meal.calories}</td>
                  <td>{moment(meal.time).format("MM/DD/YYYY h:mm A")}</td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              {meals.fetching ? (
                <td colSpan={4} className="text-center pt-10">
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
                <td colSpan={4} className="text-center pt-10">
                  <h2>Your stomach must be empty! :(</h2>
                  <p className="m-0">
                    <button
                      className="btn btn-xl btn-link"
                      onClick={toggleAddMealModal}
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
