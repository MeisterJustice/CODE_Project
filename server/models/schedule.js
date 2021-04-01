const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
  {
    fullName: { type: String },
    location: { name: String, address: String },
    dateAndTime: Date,
    phoneNumber: String,
    extras: [String],
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
