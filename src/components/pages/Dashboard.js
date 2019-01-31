import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { createStructuredSelector } from "reselect";
import { selectMeals } from "../../selectors/meal.selectors";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddMealModal from "../AddMealModal";
import ContentWrapper from "../layout/ContentWrapper";
import MealsTable from "../mealsTable";
import { fetchMeals } from "../../actionCreators/meal.actions";

class Dashboard extends Component {
  static propTypes = {
    meals: PropTypes.object,
    fetchMeals: PropTypes.func
  };

  state = {
    mealModalState: false
  };

  componentDidMount() {
    this.props.fetchMeals({});
  }

  toggleAddMealModal = e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    this.setState({ mealModalState: !this.state.mealModalState });
  };

  render() {
    const { meals } = this.props;

    return (
      <ContentWrapper>
        <ToastContainer autoClose={3000} />
        <div className="content-heading">
          <div>
            Dashboard
            <small>Welcome to Calories Counter!</small>
          </div>
        </div>
        <Row>
          <Col xl="3">
            <Card className="card-transparent">
              <h2 className="text-gray">Calories Overview</h2>
              <h3>Younes</h3>
              <p>
                <a
                  className="btn-link"
                  href="test"
                  onClick={this.toggleAddMealModal}
                >
                  <i className="fas fa-plus" /> <span>Add a New Meal</span>
                </a>
              </p>

              <AddMealModal
                isOpen={this.state.mealModalState}
                toggleModal={this.toggleAddMealModal}
              />
            </Card>
          </Col>
          <Col xl="3">
            <Card className="card-transparent">
              <h2 className="text-gray">Goal</h2>
              <h3>Younes</h3>
            </Card>
          </Col>
          <Col xl="3">
            <Card className="card-transparent">
              <h2 className="text-gray">Today</h2>
              <h3>Younes</h3>
            </Card>
          </Col>
          <Col xl="3">
            <Card className="card-transparent">
              <h2 className="text-gray">Average</h2>
              <h3>Younes</h3>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl="8">
            <Card className="card-default">
              <CardHeader>My Meals</CardHeader>
              <CardBody>
                <MealsTable
                  toggleAddMealModal={this.toggleAddMealModal}
                  meals={meals}
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="card-default">
              <CardHeader>STUFF</CardHeader>
              <CardBody>
                <p>stuff</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ContentWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  meals: selectMeals()
});

function mapDispatchToProps(dispatch) {
  return {
    fetchMeals: values => dispatch(fetchMeals(values))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
