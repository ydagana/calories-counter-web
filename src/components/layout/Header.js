import React, { Component } from "react";
import pubsub from "pubsub-js";

import ToggleState from "../ToggleState";
import TriggerResize from "../TriggerResize";
import HeaderRun from "./Header.run";
import Logo from "../Logo";

class Header extends Component {
  componentDidMount() {
    HeaderRun();
  }

  toggleUserBlock(e) {
    e.preventDefault();
    pubsub.publish("toggleUserBlock");
  }
  preventDefault(e) {
    e.preventDefault();
  }

  render() {
    return (
      <header className="topnavbar-wrapper">
        {/* START Top Navbar */}
        <nav className="navbar topnavbar">
          {/* START navbar header */}
          <div className="navbar-header">
            <Logo />
          </div>
          {/* END navbar header */}

          {/* START Left navbar */}
          <ul className="navbar-nav mr-auto flex-row">
            <li className="nav-item">
              {/* Button used to collapse the left sidebar. Only visible on tablet and desktops */}
              <TriggerResize>
                <ToggleState state="aside-collapsed">
                  <a
                    href="#top"
                    className="nav-link d-none d-md-block d-lg-block d-xl-block"
                    onClick={this.preventDefault}
                  >
                    <em className="fas fa-bars" />
                  </a>
                </ToggleState>
              </TriggerResize>
              {/* Button to show/hide the sidebar on mobile. Visible on mobile only. */}
              <ToggleState state="aside-toggled" nopersist={true}>
                <a
                  href="#top"
                  className="nav-link sidebar-toggle d-md-none"
                  onClick={this.preventDefault}
                >
                  <em className="fas fa-bars" />
                </a>
              </ToggleState>
            </li>
            {/* START User avatar toggle */}
            <li className="nav-item d-none d-md-block">
              <a
                className="nav-link"
                href="#top"
                onClick={this.toggleUserBlock}
              >
                <em className="icon-user" />
              </a>
            </li>
            {/* END User avatar toggle */}
          </ul>
          {/* END Left navbar */}
        </nav>
        {/* END Top Navbar */}
      </header>
    );
  }
}

export default Header;
