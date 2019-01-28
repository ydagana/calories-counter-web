import React, { Component } from "react";
import ContentWrapper from "../layout/ContentWrapper";
import { Row, Col, Card, CardHeader, CardBody, Table } from "reactstrap";
import AddMealModal from "../AddMealModal";

class Dashboard extends Component {
  state = {
    mealModalState: false
  };

  toggleAddMealModal = e => {
    e.preventDefault();
    this.setState({ mealModalState: !this.state.mealModalState });
  };

  render() {
    return (
      <ContentWrapper>
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
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
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

export default Dashboard;
