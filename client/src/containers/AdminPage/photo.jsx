import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Photo(props) {
  const [data, setData] = useState({
    title: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(data);
    let formData = new FormData();

    formData.append("photo", data.photo);
    formData.append("title", data.title);

    props
      .createPhoto(formData, `user_id=${props.currentUser.user.id}`)
      .then(() => {
        setLoading(false);
        props.handleClose();
        setData({
          title: "",
          photo: "",
        });
        props.setOpen(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <Box>
      <Dialog
        style={{ padding: "40px" }}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Photo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a photo to add to your list of online gallery
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <Box pt={3} />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="file"
            fullWidth
            accept="image/*"
            onChange={(e) => setData({ ...data, photo: e.target.files[0] })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          {loading ? (
            <CircularProgress size="20px" />
          ) : (
            <Button onClick={handleSubmit} color="primary">
              Post Photo
            </Button>
          )}
        </DialogActions>
        <Box pb={5} />
      </Dialog>
    </Box>
  );
}
