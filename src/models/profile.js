const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      description: {
        type: String,
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref :"Post",
        required: true,
      }
  },
  { timestamps: true }
);

const profileModel = mongoose.model("Profile", profileSchema);

module.exports = profileModel;