require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/error.js");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// MONGO SETUP ==============================
const {
  port,
  mongo_local_connection_string,
  mongo_cloud_connection_string,
} = require("./config");

mongoose.set("debug", true);
mongoose.Promise = Promise;

// SERVER MIDDLEWARE SETUP
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// REQUIRE AND CONFIGURE ROUTES
const userRoute = require("./routes/user");
const photoRoute = require("./routes/photo");
const scheduleRoute = require("./routes/schedule");

app.use("/api/v1/user", userRoute);
app.use("/api/v1/photo", photoRoute);
app.use("/api/v1/schedule", scheduleRoute);

// but if non of those routes are reached
app.use(function (req, res, next) {
  // we can render a not found page
  let err = new Error("NOT FOUND");
  err.status = 404;
  next(err);
});

// this helps to handle error appropriately in the client
app.use(errorHandler);

mongoose.connect(
  mongo_cloud_connection_string,
  {
    keepAlive: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("database connected");
    app.listen(port, () => {
      console.log(`server started on port ${port}`);
    });
  }
);
