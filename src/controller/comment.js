const db = require("../models");
const Comment = db.comment;

const createComment = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title is empty!",
    });

    return;
  }

  // Set document
  const comment = new Comment({
    content: req.body.content,
    completed: req.body.completed || false,
  });

  // Save document
  comment
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Create document failure.",
      });
    });
};

const updateComment = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  // Set id
  const id = req.params.id;

  // Update document by id
  Comment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update document. (id: " + id + ")",
        });
      } else {
        res.send({
          message: "Document updated.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Update document failure. (id: " + id + ")",
      });
    });
};

const deleteComment = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  // Set id
  const id = req.params.id;

  // Delete document by id
  Comment.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot delete document. (id: " + id + ")",
        });
      } else {
        res.send({
          message: "Document deleted.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Delete document failure. (id: " + id + ")",
      });
    });
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
