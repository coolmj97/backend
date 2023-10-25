const router = require("express").Router();
const feed = require("../controller/feed");

//피드 목록 조회
router.get("/list", feed.findAllFeed);

//피드 생성
router.post("/", feed.createFeed);

//피드 수정
router.patch("/:id", feed.updateFeed);

//피드 삭제
router.delete("/:id", feed.deleteFeed);

//좋아요
// feedRouter.patch("/feed/:feedid/likes", feed.updateLikes);

module.exports = router;
