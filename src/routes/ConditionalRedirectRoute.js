import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getItem } from "../services/localStorage";

export default function ConditionalRedirectRoute({
  component: Component,
  path,
  ...rest
}) {
  if (path === "/login" || path === "/register") {
    return (
      <Route
        {...rest}
        render={props =>
          getItem("auth_token") ? (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: { from: props.location }
              }}
            />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={props =>
          getItem("auth_token") ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}
