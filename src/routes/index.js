import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ConditionalRedirectRoute from "./ConditionalRedirectRoute";

import Base from "../components/layout/Base";
import BasePage from "../components/layout/BasePage";

import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import NotFound from "../components/pages/NotFound";
import Dashboard from "../components/pages/Dashboard";

const listOfPages = ["/login", "/register", "/notfound"];

const Routes = ({ location }) => {
  const path = location.pathname.toLowerCase();
  const currentKey = path.split("/")[1] || "/";
  const timeout = { enter: 500, exit: 500 };

  // Animations supported
  //      'rag-fadeIn'
  //      'rag-fadeInRight'
  //      'rag-fadeInLeft'

  const animationName = "rag-fadeIn";

  if (listOfPages.indexOf(path) > -1) {
    return (
      <BasePage>
        <Switch location={location}>
          <ConditionalRedirectRoute path="/login" component={Login} />
          <ConditionalRedirectRoute path="/register" component={Register} />
          <Route path="/notfound" component={NotFound} />
        </Switch>
      </BasePage>
    );
  } else {
    return (
      <Base>
        <TransitionGroup>
          <CSSTransition
            key={currentKey}
            timeout={timeout}
            classNames={animationName}
            exit={false}
          >
            <div>
              <Switch location={location}>
                <ConditionalRedirectRoute
                  path="/dashboard"
                  component={Dashboard}
                />
                <Redirect exact from="/" to="/dashboard" />
                <Redirect to="/notfound" />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Base>
    );
  }
};

export default withRouter(Routes);
