import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
// import withAuth from "../hocs/withAuth";
import HomePage from "../containers/HomePage/";
import LoginPage from "../containers/LoginPage/";

const Main = (props) => {
  const { authUser, errors, removeError, currentUser } = props;
  return (
    <div className="container">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <HomePage errors={errors} currentUser={currentUser} {...props} />
          )}
        />
        <Route
          exact
          path="/signin"
          render={(props) => {
            return (
              <LoginPage
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                {...props}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    schedules: state.schedules,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    authUser,
    removeError,
  })(Main)
);
