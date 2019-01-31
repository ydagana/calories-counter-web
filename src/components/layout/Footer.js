import React, { Component } from "react";
import FooterContent from "../FooterContent";

class Footer extends Component {
  render() {
    return (
      <footer className="footer-container">
        <FooterContent oneLine={this.props.oneLine} />
      </footer>
    );
  }
}

export default Footer;
