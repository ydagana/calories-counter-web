import React, { Component } from "react";

class FooterContent extends Component {
  render() {
    const year = new Date().getFullYear();

    return (
      <div className="p-3 text-center">
        <span className="mr-2">&copy;</span>
        <span>{year}</span>
        <span className="mx-2">-</span>
        <span>Younes Dagana</span>
        <br />
        <span>Email</span>
        <span className="mx-2">:</span>
        <span>jens.cpp@gmail.com</span>
      </div>
    );
  }
}

export default FooterContent;
