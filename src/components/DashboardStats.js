import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody } from "reactstrap";
import EasyPieChart from "easy-pie-chart";
import Sparkline from "./Sparkline";

class DashboardStats extends Component {
  static propTypes = {
    caloriesPercentage: PropTypes.number,
    mealsStats: PropTypes.array,
    meals: PropTypes.object,
    userData: PropTypes.object
  };

  componentDidMount() {
    const todayCaloriesChartSettings = {
      animate: {
        duration: 1500,
        enabled: true
      },
      barColor: percent => {
        if (percent <= 50) return "#2868ff";
        if (percent <= 100) return "#88cc68";
        if (percent > 100) return "#de0d00";
      },
      trackColor: "rgba(200,200,200,0.4)",
      scaleColor: false,
      lineWidth: 12,
      lineCap: "round",
      size: 240
    };

    this.caloriesChart = new EasyPieChart(
      this.todaysCaloriesChartRef,
      todayCaloriesChartSettings
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.caloriesPercentage !== this.props.caloriesPercentage) {
      this.caloriesChart.update(this.props.caloriesPercentage);
    }
  }

  render() {
    const { caloriesPercentage, meals, mealsStats, userData } = this.props;
    const caloriesGoal = (userData && userData.caloriesGoal) || 1500;
    const colorMap = {
      [`0:${caloriesGoal}`]: "#23b7e5",
      [`${caloriesGoal + 1}`]: "#de0d00"
    };
    const totalCalories = meals.details.length
      ? meals.details.reduce((acc, cur) => acc + cur.calories, 0)
      : 0;
    const caloriesBars = mealsStats.length
      ? [...mealsStats]
          .splice(mealsStats.length - 15)
          .reduce(
            (acc, cur) => `${acc}${acc ? "," : ""}${cur.dailyCalories}`,
            ""
          )
      : "";

    return (
      <div className="right-side-content">
        <Card className="card-default todays-calories">
          <CardHeader>Today's Calories</CardHeader>
          <CardBody className="text-center">
            <div
              ref={ref => (this.todaysCaloriesChartRef = ref)}
              data-percent={caloriesPercentage}
              className="easypie-chart easypie-chart-lg"
            >
              <p>
                {caloriesPercentage}
                <i>%</i>
                <span>PROGRESS</span>
              </p>
            </div>
            <h3>Calories daily history</h3>
            <Sparkline
              options={{
                colorMap,
                height: 50,
                barWidth: 8,
                barSpacing: 3,
                chartRangeMin: 0
              }}
              values={caloriesBars}
              className="text-center"
            />
          </CardBody>
        </Card>
        <Card className="card-default">
          <CardHeader>Total for selected period</CardHeader>
          <CardBody className="text-center">
            <p className="text-lg">
              <i className="fas fa-fire" />
              {totalCalories}
              <span>Cal</span>
            </p>
          </CardBody>
        </Card>
        <Card className="card-default">
          <CardHeader>Meal average for selected period</CardHeader>
          <CardBody className="text-center">
            <p className="text-lg">
              <i className="fas fa-fire" />
              {meals.details.length
                ? Math.round(totalCalories / meals.details.length)
                : 0}
              <span>Cal</span>
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default DashboardStats;
