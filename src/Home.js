import React from "react";
import { withOktaAuth } from "@okta/okta-react";
import { useOktaAuth } from "@okta/okta-react";

export default withOktaAuth(() => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = async () => {
    await oktaAuth.signInWithRedirect();
    // window.location.reload()
  };

  const logout = async () => {
    await oktaAuth.signOut();
    window.location.reload();
  };

  let body = null;
  if (authState?.isAuthenticated) {
    body = (
      <div className="Buttons">
        <h3>Woho! you're now logged in as {authState.idToken.claims.email}</h3>
        <button onClick={logout}>Logout</button>
        {/* Replace me with your root component. */}
      </div>
    );
  } else {
    body = (
      <div className="Buttons">
        <h3>Not Authenticated</h3>
        <button onClick={login}>Login via Okta</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">{body}</header>
    </div>
  );
});
