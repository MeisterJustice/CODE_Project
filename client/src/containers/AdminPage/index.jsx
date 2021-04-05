/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { fetchSchedules } from "../../store/actions/schedule";
import { createPhoto } from "../../store/actions/photo";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Photo from "./photo";
import Alerts from "../Snackbar";

const date = new Date();
const yesterday = new Date(date);
const yesterdayDate = new Date(yesterday.setDate(yesterday.getDate() - 1));

const AdminPage = (props) => {
  const [isToday, setIsToday] = useState(true);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isToday) {
      props.fetchSchedules(
        `user_id=${props.currentUser.user.id}&startDate=${date}&endDate=${date}`
      );
    } else {
      props.fetchSchedules(
        `user_id=${props.currentUser.user.id}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`
      );
    }
  }, [isToday]);
  return (
    <div>
      <Alerts
        open={open1}
        handleClose={handleClose1}
        severity="success"
        message="Photo successfully added to gallery!"
      />
      <div className="header">
        <div className="logo">WiseCuts</div>
        <div className="header-inline">
          <Link style={{ color: "#000000" }} to="/" className="none a">
            Home
          </Link>
        </div>
      </div>
      <Container>
        <Box mt={10} />
        <button onClick={handleClickOpen} className="schedule-btn">
          Add Photo
        </button>

        <Box border={1} boxShadow={1} my={5}>
          <Box
            borderBottom={1}
            p={3}
            display="flex"
            alignItems="center"
            height="60px"
          >
            <Box
              style={{ color: !isToday ? "#633fb3" : "RGBA(11, 1, 33, 0.6)" }}
              onClick={() => setIsToday(false)}
              className="menu"
            >
              Yesterday
            </Box>
            <Box
              style={{ color: isToday ? "#633fb3" : "RGBA(11, 1, 33, 0.6)" }}
              onClick={() => setIsToday(true)}
              className="menu"
              pl={3}
            >
              Today
            </Box>
          </Box>
          <Box
            pl={3}
            className="text"
            height="50px"
            display="flex"
            alignItems="center"
            borderBottom={1}
          >
            <Moment format="dddd, Do MMMM YYYY">
              {isToday ? date : yesterdayDate}
            </Moment>
          </Box>
          {props.schedules.map((data) => (
            <Box
              px={3}
              height="80px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderBottom={1}
              key={data._id}
            >
              <Box className="text">{data.fullName}</Box>
              <Box>
                <Box style={{ fontWeight: "bold", color: "#174652" }}>
                  {data.phoneNumber}
                </Box>
                <Box className="text" pt={1}>
                  Cut Type:{" "}
                  <span style={{ color: "#174652" }}>
                    {data.cutType === "female" ? "Female" : "Male"} Cut
                  </span>
                </Box>
              </Box>
              <Box className="text">{data.location}</Box>
              <Box className="text">
                <Moment className="text" format="hh:mm A">
                  {data.dateAndTime}
                </Moment>
              </Box>
            </Box>
          ))}
        </Box>
        <Photo
          handleClickOpen={handleClickOpen}
          open={open}
          handleClose={handleClose}
          createPhoto={props.createPhoto}
          currentUser={props.currentUser}
          setOpen={setOpen1}
        />
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
  fetchSchedules,
  createPhoto,
})(AdminPage);
