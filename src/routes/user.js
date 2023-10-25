const router = require("express").Router();
const user = require("../controller/user");

//회원가입
router.post("/sign-up", user.createUser);

//특정 유저 정보
router.get("/:id", user.findOneByUserId);

//유저 정보 수정
router.patch("/:id", user.updateUser);

//회원탈퇴
router.delete("/:id", user.deleteUser);

module.exports = router;
