/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Schedule from "./Schedule";
import { connect } from "react-redux";
import { createSchedule, fetchSchedules } from "../../store/actions/schedule";
import Gallery from "./gallery";

const HomePage = (props) => {
  return props.currentUser.isAuthenticated ? (
    <div>Admin</div>
  ) : (
    <div>
      <div className="header-wrapper">
        <div className="column">
          <div className="header">
            <div className="logo">WiseCuts</div>
            <div className="header-inline">
              <a className="none" href="#schedule">
                Booking
              </a>
              <a className="none" href="#">
                Gallery
              </a>
              <a className="admin" href="#">
                Admin
              </a>
            </div>
          </div>
          <div className="header-body">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <div className="header-text">more than a hair cut</div>
              <div className="header-btn">
                <a href="#schedule" className="btn btn-booking">
                  Booking
                </a>
                <a href="#" className="btn btn-potforlio">
                  Gallery
                </a>
              </div>
            </Box>
          </div>
        </div>
      </div>
      <Container>
        <Schedule createSchedule={props.createSchedule} />
        <Gallery />
      </Container>
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

export default connect(mapStateToProps, {
  createSchedule,
  fetchSchedules,
})(HomePage);
