import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link, withRouter } from "react-router-dom";
import { Badge } from "reactstrap";

import SidebarRun from "./Sidebar.run";
import SidebarUserBlock from "./SidebarUserBlock";

import Menu from "../../Menu.js";
import { logoutRequest } from "../../actionCreators/user.actions";

const SidebarItem = ({ item, isActive }) => (
  <li className={isActive ? "active" : ""}>
    <Link to={item.path} title={item.name}>
      {item.label && (
        <Badge tag="div" className="float-right" color={item.label.color}>
          {item.label.value}
        </Badge>
      )}
      {item.icon && <em className={item.icon} />}
      <span>{item.name}</span>
    </Link>
  </li>
);

class Sidebar extends Component {
  static propTypes = {
    logoutRequest: PropTypes.func
  };

  componentDidMount() {
    SidebarRun(this.navigator.bind(this));
  }

  navigator(route) {
    this.props.history.push(route);
  }

  routeActive(paths) {
    paths = Array.isArray(paths) ? paths : [paths];
    return paths.some(p => this.props.location.pathname.indexOf(p) > -1);
  }

  itemType = item => {
    if (item.heading) return "heading";
    if (item.path) return "menu";
    if (item.action === "logout") return "logout";
  };

  logout = () => {
    this.props.logoutRequest();
    return false;
  };

  render() {
    return (
      <aside className="aside-container">
        <div className="aside-inner">
          <nav data-sidebar-anyclick-close="" className="sidebar">
            <ul className="sidebar-nav">
              <li className="has-user-block">
                <SidebarUserBlock />
              </li>
              {Menu.map((item, i) => {
                switch (this.itemType(item)) {
                  case "heading":
                    return (
                      <li className="nav-heading" key={i}>
                        <span>{item.heading}</span>
                      </li>
                    );
                  case "menu":
                    return (
                      <SidebarItem
                        isActive={this.routeActive(item.path)}
                        item={item}
                        key={i}
                      />
                    );
                  case "logout":
                    return (
                      <li key={i}>
                        <a href="/" onClick={this.logout}>
                          {item.label && (
                            <Badge
                              tag="div"
                              className="float-right"
                              color={item.label.color}
                            >
                              {item.label.value}
                            </Badge>
                          )}
                          {item.icon && <em className={item.icon} />}
                          <span>{item.name}</span>
                        </a>
                      </li>
                    );
                  default:
                    return null;
                }
              })}
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutRequest: values => dispatch(logoutRequest(values))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Sidebar));
