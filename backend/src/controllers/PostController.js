const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort("-createdAt");

    res.json({ posts });
  },
  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    return res.json({ image, file: req.file });

    // const [name] = image.split(".");
    // const fileName = `${name}.jpg`;

    // const caminhoDaImagem = req.file.path;

    // await sharp(caminhoDaImagem)
    //   .resize(500)
    //   .jpeg({ quality: 70 })
    //   .toFile(path.resolve(req.file.destination, "resized", fileName));

    // fs.unlinkSync(caminhoDaImagem);

    // const post = await Post.create({
    //   author,
    //   place,
    //   description,
    //   hashtags,
    //   image: fileName,
    // });

    // req.io.emit("post", post);

    // return res.json({ post });
  },
};
