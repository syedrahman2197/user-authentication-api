const express = require("express");
const { register, login } = require("../controllers/postController");
const postRouter = express.Router();

postRouter.post("/register", register);
postRouter.post("/login", login);

module.exports = postRouter;