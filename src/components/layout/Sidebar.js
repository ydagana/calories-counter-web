import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link, withRouter } from "react-router-dom";
import { Badge } from "reactstrap";

import SidebarRun from "./Sidebar.run";

import Menu from "../../Menu.js";
import { logoutRequest } from "../../actionCreators/user.actions";
import { createStructuredSelector } from "reselect";
import { selectUserData } from "../../selectors/user.selectors";

const SidebarItem = ({ item, isActive, onLinkClick }) => (
  <li className={isActive ? "active" : ""}>
    <Link to={item.path} title={item.name} onClick={onLinkClick}>
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
    logoutRequest: PropTypes.func,
    userData: PropTypes.object
  };

  componentDidMount() {
    SidebarRun(this.navigator);
  }

  onLocationChange = () => {
    this.forceUpdate();
  };

  navigator = route => {
    this.props.history.push(route);
  };

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
    const { userData } = this.props;
    return (
      <aside className="aside-container">
        <div className="aside-inner">
          <nav data-sidebar-anyclick-close="" className="sidebar">
            <ul className="sidebar-nav">
              {Menu.map((item, i) => {
                switch (this.itemType(item)) {
                  case "heading":
                    return (
                      <li className="nav-heading" key={i}>
                        <span>{item.heading}</span>
                      </li>
                    );
                  case "menu":
                    if (
                      !item.role ||
                      (userData &&
                        userData.role &&
                        userData.role.length &&
                        (userData.role[0].name === item.role ||
                          userData.role[0].name === "admin"))
                    ) {
                      return (
                        <SidebarItem
                          onLinkClick={this.onLocationChange}
                          isActive={this.routeActive(item.path)}
                          item={item}
                          key={i}
                        />
                      );
                    } else {
                      return;
                    }
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

const mapStateToProps = createStructuredSelector({
  userData: selectUserData()
});
function mapDispatchToProps(dispatch) {
  return {
    logoutRequest: values => dispatch(logoutRequest(values))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
