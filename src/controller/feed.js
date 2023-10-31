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
  } catch {
    res.status(500).send();
  }
};

const findAllFeed = async (req, res) => {
  try {
    const data = await Feed.find();
    res.send(data);
  } catch {
    res.status(500).send();
  }
};

// Retrieve single document
const findOneByFeedId = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Feed.findById(id);

    if (!data) {
      res.status(404).send();
      return;
    }

    res.send(data);
  } catch {
    res.status(500).send();
  }
};

// Update document by id
const updateFeed = async (req, res) => {
  try {
    const data = await Feed.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

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

const updateLikes = async (req, res) => {
  const { isLiked } = req.body;
  const { id } = req.params;

  const feed = await Feed.findById(id);

  try {
    await Feed.findByIdAndUpdate(id, {
      likesCount: isLiked ? feed.likesCount + 1 : feed.likesCount - 1,
    });

    res.send({
      message: "Success.",
    });
  } catch {
    res.status(500).send();
  }
};

// Delete document by id
const deleteFeed = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Feed.findByIdAndRemove(id);

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
  createFeed,
  findAllFeed,
  findOneByFeedId,
  updateFeed,
  deleteFeed,
  updateLikes,
};
