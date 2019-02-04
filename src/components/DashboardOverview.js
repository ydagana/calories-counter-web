import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card } from "reactstrap";
import ReactTooltip from "react-tooltip";

class DashboardOverview extends Component {
  static propTypes = {
    userData: PropTypes.object,
    mealsStats: PropTypes.array,
    todaysCalories: PropTypes.number,
    toggleAddEditMealModal: PropTypes.func
  };

  render() {
    const {
      userData,
      toggleAddEditMealModal,
      mealsStats,
      todaysCalories
    } = this.props;

    const dailyAverage = mealsStats.length
      ? mealsStats.reduce((acc, cur) => acc + (cur.dailyCalories || 0), 0) /
        mealsStats.length
      : 0;

    return (
      <Row className="dashboard-top">
        <Col xl="3">
          <Card className="card-transparent">
            <h2 className="text-gray">Calories Overview</h2>
            <h3>
              <i className="fas fa-user-ninja" />
              {userData && userData.username}
            </h3>
            <p>
              <a
                className="btn-link add-meal-btn"
                href="test"
                onClick={e => {
                  e.preventDefault();
                  toggleAddEditMealModal();
                }}
              >
                <i className="fas fa-concierge-bell text-success" />{" "}
                <span>Add a New Meal</span>
              </a>
            </p>
          </Card>
        </Col>
        <Col xl="3">
          <Card className="card-transparent card-2">
            <h2 className="text-gray">
              Goal{" "}
              <i
                className="fas fa-info-circle"
                data-tip="You can change your Daily Calories Goal in the profile page!"
              />
            </h2>
            <ReactTooltip effect="solid" />
            <h3>
              <i className="fas fa-bullseye" />
              {userData && userData.caloriesGoal}
              <span>Cal</span>
            </h3>
          </Card>
        </Col>
        <Col xl="3">
          <Card className="card-transparent card-3">
            <h2 className="text-gray">Today</h2>
            <h3>
              <i className="far fa-calendar-alt" />
              {todaysCalories}
              <span>Cal</span>
            </h3>
          </Card>
        </Col>
        <Col xl="3">
          <Card className="card-transparent card-4">
            <h2 className="text-gray">Daily Average</h2>
            <h3>
              <i className="fas fa-balance-scale" />
              {Math.round(dailyAverage)}
              <span>Cal</span>
            </h3>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default DashboardOverview;
