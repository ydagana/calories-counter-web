import React, { Component } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { selectUserData } from "../../selectors/user.selectors";
import { fetchUserData } from "../../actionCreators/user.actions";

class Base extends Component {
  componentDidMount() {
    if (!this.props.userData) {
      this.props.fetchUserData();
    }
  }

  render() {
    return (
      <div className="wrapper">
        <ToastContainer autoClose={2000} />
        <Header />
        <Sidebar />

        <section className="section-container">{this.props.children}</section>

        <Footer oneLine={true} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userData: selectUserData()
});

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: () => dispatch(fetchUserData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Base);
