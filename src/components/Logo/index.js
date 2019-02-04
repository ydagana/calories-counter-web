import React, { Component } from "react";

import "./style.scss";

class Logo extends Component {
  render() {
    return (
      <a href="/dashboard" id="logo">
        <h1>
          <div className="brand-logo">
            <i className="far fa-closed-captioning" /> Calories Counter
          </div>
          <div className="brand-logo-collapsed">
            <i className="far fa-closed-captioning" />
          </div>
        </h1>
      </a>
    );
  }
}

export default Logo;
