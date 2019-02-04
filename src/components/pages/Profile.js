import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";

import ContentWrapper from "../layout/ContentWrapper";
import UpdateUserForm from "../UpdateUserForm";
import ChangePasswordForm from "../ChangePasswordForm";

class Profile extends Component {
  static propTypes = {
    userData: PropTypes.object
  };

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div>
            Your Profile
            <small>This is your personal space!</small>
          </div>
        </div>

        <Row>
          <div className="col-md-12">
            <UpdateUserForm />
          </div>
        </Row>

        <Row>
          <div className="col-md-12">
            <ChangePasswordForm />
          </div>
        </Row>
      </ContentWrapper>
    );
  }
}

export default Profile;
