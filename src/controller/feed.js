const db = require("../models");
const Feed = db.feed;

const createFeed = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title is empty!",
    });

    return;
  }

  // Set document
  const feed = new Feed({
    photos: req.body.photos,
    content: req.body.content,
  });

  // Save document
  feed
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

const findAllFeed = (req, res) => {
  // Retrieve all documents
  Feed.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Retrieve document failure.",
      });
    });
};

// Retrieve single document
const findOneByFeedId = (req, res) => {
  const id = req.params.id;

  // Retrieve single document by id
  Feed.findById(id)
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
const updateFeed = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  // Set id
  const id = req.params.id;

  // Update document by id
  Feed.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

const updateLikes = (req, res) => {
  Feed.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
const deleteFeed = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  // Set id
  const id = req.params.id;

  // Delete document by id
  Feed.findByIdAndRemove(id)
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
  createFeed,
  findAllFeed,
  findOneByFeedId,
  updateFeed,
  deleteFeed,
};
