const router = require("express").Router();
const comment = require("../controller/comment");

//댓글 작성
router.get("/", comment.createComment);

//댓글 수정
router.patch("/:id", comment.updateComment);

//댓글 삭제
router.delete("/:id", comment.deleteComment);

module.exports = router;
