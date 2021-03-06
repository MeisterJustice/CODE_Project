/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Schedule from "./Schedule";
import { connect } from "react-redux";
import { createSchedule } from "../../store/actions/schedule";
import Gallery from "./gallery";
import { fetchPhotos } from "../../store/actions/photo";
import ScrollAnimation from "react-animate-on-scroll";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const HomePage = (props) => {
  const history = useHistory();

  const handleNavigate = () => {
    history.push(props.currentUser.isAuthenticated ? "/admin" : "/signin");
  };

  useEffect(() => {
    props.fetchPhotos();
  }, []);

  return (
    <div>
      <div className="header-wrapper">
        <div className="column">
          <div className="header">
            <div className="logo">WiseCuts</div>
            <div className="header-inline">
              <a className="none a" href="#schedule">
                Booking
              </a>
              <a className="none a" href="#gallery">
                Gallery
              </a>
              <div className="admin a" onClick={handleNavigate}>
                Admin
              </div>
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
                <ScrollAnimation animateIn="bounceInLeft">
                  <a href="#schedule" className="btn btn-booking">
                    Booking
                  </a>
                </ScrollAnimation>
                <ScrollAnimation animateIn="bounceInRight">
                  <a href="#gallery" className="btn btn-potforlio">
                    Gallery
                  </a>
                </ScrollAnimation>
              </div>
            </Box>
          </div>
        </div>
      </div>
      <Container>
        <Schedule createSchedule={props.createSchedule} />
        {props.photos.length > 0 && <Gallery photos={props.photos} />}
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    photos: state.photos,
  };
}

export default connect(mapStateToProps, {
  createSchedule,
  fetchPhotos,
})(HomePage);
