import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import ContentWrapper from "../layout/ContentWrapper";
import { fetchUsers, deleteUser } from "../../actionCreators/user.actions";
import { selectUsers } from "../../selectors/user.selectors";
import UsersTable from "../UsersTable";

class Users extends Component {
  static propTypes = {
    fetchUses: PropTypes.func,
    deleteUser: PropTypes.func,
    users: PropTypes.object
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users, deleteUser } = this.props;
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div>
            Users
            <small>Manage users from here!</small>
          </div>
        </div>
        <Row>
          <Col xl="12">
            <Card className="card-default">
              <CardHeader>Users List</CardHeader>
              <CardBody>
                <UsersTable users={users} deleteUser={deleteUser} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ContentWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  users: selectUsers()
});

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: values => dispatch(fetchUsers(values)),
    deleteUser: id => dispatch(deleteUser(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
