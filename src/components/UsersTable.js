import React, { Component } from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";
import moment from "moment";
import swal from "sweetalert";

class UsersTable extends Component {
  static propTypes = {
    users: PropTypes.object
  };

  deleteMealAlert = id => {
    swal({
      title: "Are you sure you want to delete this user?",
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
        this.props.deleteUser(id);
        swal("Your delete request is received!", {
          icon: "success"
        });
        setTimeout(swal.close, 1500);
      }
    });
  };

  render() {
    const { users } = this.props;
    return (
      <Table striped responsive className="meals-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Created</th>
            <th>Calories Goal</th>
            <th>Meals Number</th>
            <th>Role</th>
            <th />
          </tr>
        </thead>
        {users.details.length ? (
          <tbody>
            {users.details.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{moment(user.created).format("LLLL")}</td>
                  <td>{user.caloriesGoal}</td>
                  <td>{user.mealsCount || 0}</td>
                  <td>{user.roleName || "Regular User"}</td>
                  <td className="action-btns">
                    <button
                      className="btn btn-outline-secondary mr-2"
                      onClick={() => this.deleteMealAlert(user.id)}
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
              {users.fetching ? (
                <td colSpan={7} className="text-center pt-10">
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
                <td colSpan={7} className="text-center pt-10">
                  <h2>Looks like there are no users in the system! :(</h2>
                </td>
              )}
            </tr>
          </tbody>
        )}
      </Table>
    );
  }
}

export default UsersTable;
