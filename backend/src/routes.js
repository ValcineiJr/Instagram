const express = require("express");
const routes = new express.Router();
const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");
const multer = require("multer");

const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);

routes.get("/posts", PostController.index);
routes.get("/posts/:id/like", LikeController.store);

routes.post("/posts", upload.single("image"), PostController.store);

module.exports = routes;
