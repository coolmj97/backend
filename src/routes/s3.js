const router = require('express').Router();
const s3 = require('../controller/s3');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), s3.uploadImage);

module.exports = router;
