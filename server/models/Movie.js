const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    description: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSmall: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    ageLimit: { type: String },
    genres: { type: String },
    rating: { type: String },
    isSeries: { type: Boolean, default: false },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
