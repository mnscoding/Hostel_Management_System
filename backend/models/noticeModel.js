const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noticeSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
    },
    /*user_id: {
      type: String,
      required: true,
    },*/
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notice", noticeSchema);
