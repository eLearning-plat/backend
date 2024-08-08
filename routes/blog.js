const express = require('express');
const router = express.Router();
const blogCtrl = require('../controllers/blog');
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.get('/', auth, blogCtrl.getAllBlogs);
router.post('/' ,multer, blogCtrl.createBlog);
router.get('/:id', blogCtrl.getOneBlog);
router.put('/:id', blogCtrl.modifyBlog);
router.delete('/:id', blogCtrl.deleteBlog);

module.exports = router;