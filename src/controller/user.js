const db = require("../models");
const User = db.user;

const createUser = (req, res) => {
  const { email, password, username, sex } = req.body;
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "이메일은 필수입니다.",
    });

    return;
  }

  // Set document
  const user = new User({
    email,
    password,
    username,
    sex,
  });

  // Save document
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Retrieve single document
const findOneByUserId = (req, res) => {
  const id = req.params.id;

  // Retrieve single document by id
  User.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot find document. (id: " + id + ")",
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Retrieve single document failure. (id: " + id + ")",
      });
    });
};

// Update document by id
const updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  // Set id
  const id = req.params.id;

  // Update document by id
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

// Delete document by id
const deleteUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  // Set id
  const id = req.params.id;

  // Delete document by id
  User.findByIdAndRemove(id)
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
  createUser,
  findOneByUserId,
  updateUser,
  deleteUser,
};
