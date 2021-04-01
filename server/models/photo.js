const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema(
  {
    title: { type: String },
    photos: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;
