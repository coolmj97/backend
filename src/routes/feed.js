const router = require('express').Router();
const feed = require('../controller/feed');

//피드 목록 조회
router.get('/', feed.findAllFeed);

//피드 생성
router.post('/', feed.createFeed);

//피드 상세
router.get('/:id', feed.findOneByFeedId);

//피드 수정
router.patch('/:id', feed.updateFeed);

//피드 삭제
router.delete('/:id', feed.deleteFeed);

//좋아요
router.patch('/:id/likes', feed.updateLikes);

module.exports = router;
