import React, { Component } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import Home from "./Home";
import Profile from "./Profile";

const oktaAuth = new OktaAuth({
  issuer: "https://dev-29466123.okta.com/oauth2/default",
  clientId: "0oa9f61s865239evm5d7",
  redirectUri: "https://playful-begonia-4c2ee9.netlify.app/login/callback",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.restoreOriginalUri = async (_oktaAuth, originalUri) => {
      props.history.replace(
        toRelativeUrl(originalUri || "/", window.location.origin)
      );
    };
  }

  render() {
    return (
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={this.restoreOriginalUri}
      >
        <Route path="/" exact={true} component={Home} />
        <Route path="/login/callback" component={LoginCallback} />
        <Route path="/profile" component={Profile} />
      </Security>
    );
  }
}

const AppWithRouterAccess = withRouter(App);

class RouterApp extends Component {
  render() {
    return (
      <Router>
        <AppWithRouterAccess />
      </Router>
    );
  }
}

export default RouterApp;
