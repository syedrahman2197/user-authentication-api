const express = require("express");
const { getProfile, createProfile, deleteProfile, updateProfile } = require("../controllers/profileController");
const auth = require("../middlewares/auth");
const profileRouter = express.Router();

profileRouter.get("/", auth, getProfile);

profileRouter.post("/", auth, createProfile);

profileRouter.delete("/:id", auth, deleteProfile);

profileRouter.put("/:id", auth, updateProfile);

module.exports = profileRouter;