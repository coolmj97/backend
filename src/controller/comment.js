const db = require("../models");
const Comment = db.comment;
const User = db.user;

const findAllComment = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.send(comments);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const createComment = async (req, res) => {
  const { userId, content, feedId } = req.body;

  if (!req.body.title) {
    res.status(400).send({
      message: "Title is empty!",
    });

    return;
  }

  try {
    const matchedUser = await User.find((data) => data.id === userId);
    const comment = new Comment({
      user: matchedUser,
      content,
      feedId,
    });

    const data = comment.save();

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateComment = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

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
      message: "Document updated.",
    });
  } catch {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  const { id } = res.params;

  try {
    const data = await Comment.findByIdAndRemove(id);

    if (!data) {
      res.status(404).send({
        message: "Cannot delete document. (id: " + id + ")",
      });
      return;
    }

    res.send({
      message: "Document deleted.",
    });
  } catch {
    res.status(500).send({
      message: err.message || "Delete document failure. (id: " + id + ")",
    });
  }
};

module.exports = {
  findAllComment,
  createComment,
  updateComment,
  deleteComment,
};
