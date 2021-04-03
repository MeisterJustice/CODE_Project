import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alerts from "../Snackbar";
import { useHistory } from "react-router-dom";

const LoginPage = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const handleNavigate = () => {
    history.push("/");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.email.length > 0 && data.password.length > 0) {
      setLoading(true);
      props
        .onAuth("signin", data)
        .then(() => {
          setLoading(false);
          setOpen(true);
          setTimeout(() => {
            history.push("/admin");
          }, 1000);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      return;
    }
  };

  return (
    <div className="login-body">
      <Alerts
        open={open}
        handleClose={handleClose}
        severity="success"
        message="Login Sucess! Welcome back Wise"
      />
      <div className="container-login">
        <div className="header-login">
          <div className="header-login-box">
            <span className="header-text-position">
              <div onClick={handleNavigate}>Home</div>
            </span>
          </div>
        </div>
        <div className="login-box">
          <div className="login">
            <h1>Admin Signin</h1>
            <input
              onChange={handleChange}
              id="email"
              type="text"
              placeholder="Email"
              name="email"
            />
            <label htmlFor="email" className="login-input-icon">
              <i className="fa fa-user"></i>
            </label>
            <input
              onChange={handleChange}
              id="password"
              type="password"
              placeholder="Password"
              name="password"
            />
            <label htmlFor="password" className="login-input-icon">
              <i className="fa fa-lock"></i>
            </label>
            <label className="login-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>&nbsp;&nbsp;Remember
            </label>
            {loading ? (
              <CircularProgress />
            ) : (
              <button onClick={handleSubmit}>Login</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
