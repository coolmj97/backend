const db = require("../models");
const Feed = db.feed;

const createFeed = async (req, res) => {
  const { photos, content } = req.body;

  if (!content) {
    res.status(400).send({
      message: "내용을 입력해주세요.",
    });
    return;
  }

  try {
    const feed = new Feed({
      photos,
      content,
    });

    const data = await feed.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Create document failure.",
    });
  }
};

const findAllFeed = async (req, res) => {
  try {
    const data = await Feed.find();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Retrieve document failure.",
    });
  }
};

// Retrieve single document
const findOneByFeedId = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Feed.findById(id);

    if (!data) {
      res.status(404).send({
        message: `not found ${id}}`,
      });
      return;
    }

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Update document by id
const updateFeed = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  try {
    const data = await Feed.findByIdAndUpdate(id, req.body, {
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
      message: err.message,
    });
  }
};

const updateLikes = async (req, res) => {
  const { isLiked } = req.body;

  try {
    const likes = new Feed({
      ...req.body,
      isLiked,
    });

    const data = await Feed.findByIdAndUpdate(id, likes, {
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
const deleteFeed = async (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  try {
    const data = await Feed.findByIdAndRemove(id);

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
  createFeed,
  findAllFeed,
  findOneByFeedId,
  updateFeed,
  deleteFeed,
  updateLikes,
};
