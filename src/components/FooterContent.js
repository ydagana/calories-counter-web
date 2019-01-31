import React, { Component } from "react";
import PropTypes from "prop-types";

class FooterContent extends Component {
  static propTypes = {
    oneLine: PropTypes.bool
  };
  render() {
    const year = new Date().getFullYear();

    return (
      <div className="p-0 text-center">
        <span className="mr-2">&copy;</span>
        <span>{year}</span>
        <span className="mx-2">-</span>
        <span>Younes Dagana</span>
        {this.props.oneLine ? <span className="mx-2">-</span> : <br />}
        <span>Email</span>
        <span className="mx-2">:</span>
        <span>jens.cpp@gmail.com</span>
      </div>
    );
  }
}

export default FooterContent;
