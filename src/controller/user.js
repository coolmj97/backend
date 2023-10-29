const db = require("../models");
const User = db.user;

const createUser = async (req, res) => {
  const { email, password, username, sex } = req.body;

  if (!req.body.email) {
    res.status(400).send({
      message: "이메일은 필수입니다.",
    });

    return;
  }

  try {
    const user = new User({
      email,
      password,
      username,
      sex,
    });

    const data = await user.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Retrieve single document
const findOneByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await User.findById(id);
    if (!data) {
      res.status(404).send({
        message: "Cannot find document. (id: " + id + ")",
      });
      return;
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Retrieve single document failure. (id: " + id + ")",
    });
  }
};

// Update document by id
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  try {
    const data = await User.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({
        message: "Cannot update document. (id: " + id + ")",
      });
      return;
    }

    res.send({
      message: "Document updated.",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Update document failure. (id: " + id + ")",
    });
  }
};

// Delete document by id
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  try {
    const data = await User.findByIdAndRemove(id);

    if (!data) {
      res.status(404).send({
        message: "Cannot delete document. (id: " + id + ")",
      });
      return;
    }

    res.send({
      message: "Document deleted.",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  createUser,
  findOneByUserId,
  updateUser,
  deleteUser,
};
