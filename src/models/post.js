const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }

  }, 
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;