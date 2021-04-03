const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
  {
    fullName: { type: String },
    location: { type: String },
    dateAndTime: Date,
    phoneNumber: String,
    extras: [String],
    cutType: String,
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
