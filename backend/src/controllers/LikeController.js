const Post = require("../models/Post");

module.exports = {
  async store(req, res) {
    const id = req.params.id;
    const post = await Post.findById(id);

    post.likes++;

    await post.save();

    req.io.emit("like", post);
    return res.json({ post });
  },
};
