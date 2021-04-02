import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Box from "@material-ui/core/Box";
import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alerts from "../Snackbar";

const Schedule = (props) => {
  const [data, setData] = useState({
    fullName: "",
    location: "",
    dateAndTime: Date.now(),
    phoneNumber: "",
    cutType: "male",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setData({ ...data, dateAndTime: date });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.fullName.length === 0 && data.phoneNumber.length === 0) {
      return;
    }
    setLoading(true);
    props
      .createSchedule(data)
      .then(() => {
        setData({
          ...data,
          fullName: "",
          phoneNumber: "",
        });
        setLoading(false);
        setOpen(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div id="schedule">
      <Alerts
        open={open}
        handleClose={handleClose}
        severity="success"
        message="Scheduled Sucessfully! You'll be contacted by the barber to confirm your schedule"
      />
      <Box pt={10} className="title" textAlign="center">
        Schedule a Cut
      </Box>
      <Box
        pt={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <img
          alt=""
          src="https://cutstyle.true-emotions.studio/wp-content/uploads/2020/07/bar1.jpg"
        />
        <Box width="80%">
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              label="Full Name"
              value={data.fullName}
              name="fullName"
              onChange={handleChange}
              required
            />
            <Box pt={2} />
            <TextField
              variant="outlined"
              fullWidth
              id="phone"
              label="Phone Number"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handleChange}
              required
            />
            <Box pt={2} />
            <TextField
              variant="outlined"
              fullWidth
              id="location"
              label="Location"
              name="location"
              value={data.location}
              onChange={handleChange}
              select
              required
            >
              {location.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Box pt={2} />
            <TextField
              variant="outlined"
              fullWidth
              id="cut"
              value={data.cutType}
              label="Who's Haircut?"
              name="cutType"
              onChange={handleChange}
              select
              required
            >
              {cuts.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Box pt={2} />
            <MuiPickersUtilsProvider
              className="schedule-date"
              utils={DateFnsUtils}
            >
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                fullWidth
                value={data.dateAndTime}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                variant="outlined"
                required
              />
              <Box pt={2} />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                fullWidth
                value={data.dateAndTime}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                variant="outlined"
                required
              />
            </MuiPickersUtilsProvider>
            <Box pt={2} />
            {loading ? (
              <CircularProgress />
            ) : (
              <button className="schedule-btn">Schedule</button>
            )}
          </form>
        </Box>
        <img
          alt=""
          src="https://cutstyle.true-emotions.studio/wp-content/uploads/2020/07/bar1.jpg"
        />
      </Box>
    </div>
  );
};

export default Schedule;

const cuts = [
  { label: "Female Haircut", value: "female" },
  { label: "Male Haircut", value: "male" },
];

const location = [
  { label: "Eziobodo", value: "eziobodo" },
  { label: "Umuchima", value: "umuchima" },
  { label: "Ihiagwa", value: "ihiagwa" },
];
