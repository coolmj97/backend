const db = require("../models");
const Comment = db.comment;
const User = db.user;

const findAllComment = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.send(comments);
  } catch (err) {
    res.status(500).send();
  }
};

const createComment = async (req, res) => {
  const { userId, content, feedId } = req.body;

  if (!req.body.content) {
    res.status(400).send();
    return;
  }

  try {
    const matchedUser = await User.findById(userId);
    const {
      feeds,
      follower,
      following,
      introduction,
      likes,
      profileUrl,
      total,
      username,
    } = matchedUser;

    const user = {
      feeds,
      follower,
      following,
      introduction,
      likes,
      profileUrl,
      total,
      username,
    };

    const comment = new Comment({
      user,
      content,
      feedId,
    });

    const data = await comment.save();

    res.send(data);
  } catch {
    res.status(500).send();
  }
};

const updateComment = async (req, res) => {
  const { id } = res.params;

  try {
    const data = await Comment.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    if (!data) {
      res.status(404).send();
      return;
    }

    res.send({
      message: "Success",
    });
  } catch {
    res.status(500).send();
  }
};

const deleteComment = async (req, res) => {
  const { id } = res.params;

  try {
    const data = await Comment.findByIdAndRemove(id);

    if (!data) {
      res.status(404).send();
      return;
    }

    res.send({
      message: "Success.",
    });
  } catch {
    res.status(500).send();
  }
};

module.exports = {
  findAllComment,
  createComment,
  updateComment,
  deleteComment,
};
