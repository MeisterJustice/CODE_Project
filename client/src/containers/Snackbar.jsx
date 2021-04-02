import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alerts = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
    >
      <Alert onClose={props.handleClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Alerts;
