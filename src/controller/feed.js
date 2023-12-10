const db = require('../models');
const Feed = db.feed;
const admin = require('firebase-admin');

//작성
const createFeed = async (req, res) => {
  const { title, photos, content, user, uid } = req.body;

  if (!title) {
    res.status(400).send({
      message: '제목을 입력해주세요.',
    });
    return;
  }

  try {
    const feed = new Feed({
      user,
      uid,
      title,
      photos,
      content,
    });

    const data = await feed.save();

    res.send(data);
  } catch {
    res.status(500).send();
  }
};

//목록
const findAllFeed = async (req, res) => {
  try {
    const idToken = req.headers.authorization?.replace('Bearer ', '');
    const user = await admin.auth().verifyIdToken(idToken);
    const data = await Feed.find({ uid: user.uid });

    const offset = parseInt(req.query.offset, 10) || 0;
    const result = data.slice(offset, offset + req.query.limit);

    res.send(result || []);
  } catch (e) {
    console.log('error', e);
    res.status(500).send();
  }
};

//상세
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

//수정
const updateFeed = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Feed.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    if (!data) {
      res.status(404).send();
      return;
    }

    res.send({
      message: 'Success.',
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
      message: 'Success.',
    });
  } catch {
    res.status(500).send();
  }
};

//삭제
const deleteFeed = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Feed.findByIdAndRemove(id);

    if (!data) {
      res.status(404).send();
      return;
    }

    res.send({
      message: 'Success.',
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
