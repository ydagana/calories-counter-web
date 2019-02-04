import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import moment from "moment";

import AddEditMealModal from "../AddEditMealModal";
import ContentWrapper from "../layout/ContentWrapper";
import MealsTable from "../MealsTable";
import {
  fetchMeals,
  submitDeleteMeal,
  fetchMealsStats
} from "../../actionCreators/meal.actions";
import {
  selectDeleteMealState,
  selectMeals,
  selectMealsStats
} from "../../selectors/meal.selectors";
import { selectUserData } from "../../selectors/user.selectors";
import DashboardOverview from "../DashboardOverview";
import DashboardStats from "../DashboardStats";
import DateAndTimeRangePicker from "../DateAndTimeRangePicker";

class Dashboard extends Component {
  static propTypes = {
    userData: PropTypes.object,
    meals: PropTypes.object,
    mealsStats: PropTypes.array,
    fetchMeals: PropTypes.func,
    fetchMealsStats: PropTypes.func,
    deleteMeal: PropTypes.func,
    deleteMealState: PropTypes.bool
  };

  state = {
    mealModalState: false,
    isEdit: false,
    meal: null,
    todaysCalories: 0,
    caloriesPercentage: 0
  };

  componentDidMount() {
    this.props.fetchMeals();
  }

  componentDidUpdate(prevProps, prevState) {
    const { userData, mealsStats } = this.props;

    const { todaysCalories } = this.state;
    if (
      userData &&
      userData.caloriesGoal &&
      (prevProps.userData !== userData ||
        prevState.todaysCalories !== todaysCalories)
    ) {
      const caloriesPercentage = Math.round(
        (100 * todaysCalories) / userData.caloriesGoal
      );
      this.setState({ caloriesPercentage });
    }
    if (prevProps.mealsStats !== mealsStats) {
      const todaysStats = mealsStats.length
        ? mealsStats.filter(
            e => moment(e.mealDay).format("L") === moment().format("L")
          )
        : [];
      this.setState({
        todaysCalories: todaysStats.length ? todaysStats[0].dailyCalories : 0
      });
    }
  }

  toggleAddEditMealModal = meal => {
    if (meal && meal.id) {
      this.setState({
        isEdit: true,
        meal,
        mealModalState: !this.state.mealModalState
      });
    } else {
      this.setState({
        isEdit: false,
        meal: null,
        mealModalState: !this.state.mealModalState
      });
    }
  };

  handleRangeChange = range => {
    this.props.fetchMeals({
      startDate: range.startDate,
      endDate: range.endDate,
      startTime: range.startTime,
      endTime: range.endTime
    });
  };

  render() {
    const {
      meals,
      deleteMealState,
      deleteMeal,
      userData,
      mealsStats
    } = this.props;
    const { todaysCalories, caloriesPercentage } = this.state;

    return (
      <ContentWrapper>
        <div className="content-heading">
          <div>
            Dashboard
            <small>Welcome to Calories Counter!</small>
          </div>
        </div>
        <DashboardOverview
          userData={userData}
          toggleAddEditMealModal={this.toggleAddEditMealModal}
          mealsStats={mealsStats}
          todaysCalories={todaysCalories}
        />
        <Row>
          <Col xl="8">
            <Card className="card-default">
              <CardHeader>
                <Row>
                  <Col xl="4">My Meals</Col>
                  <Col xl="8" className="text-right">
                    <DateAndTimeRangePicker
                      onRangeChanged={this.handleRangeChange}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <MealsTable
                  toggleAddEditMealModal={this.toggleAddEditMealModal}
                  userData={userData}
                  meals={meals}
                  mealsStats={mealsStats}
                  deleteMealState={deleteMealState}
                  deleteMeal={deleteMeal}
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <DashboardStats
              caloriesPercentage={caloriesPercentage}
              mealsStats={mealsStats}
              meals={meals}
              userData={userData}
            />
          </Col>
        </Row>
        <AddEditMealModal
          isOpen={this.state.mealModalState}
          isEdit={this.state.isEdit}
          meal={this.state.meal}
          toggleModal={this.toggleAddEditMealModal}
        />
      </ContentWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  meals: selectMeals(),
  mealsStats: selectMealsStats(),
  userData: selectUserData(),
  deleteMealState: selectDeleteMealState()
});

function mapDispatchToProps(dispatch) {
  return {
    fetchMeals: values => dispatch(fetchMeals(values)),
    fetchMealsStats: values => dispatch(fetchMealsStats(values)),
    deleteMeal: id => dispatch(submitDeleteMeal(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
