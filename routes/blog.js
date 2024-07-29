const express = require('express');
const router = express.Router();
const blogCtrl = require('../controllers/blog');
const multer = require("../middleware/multer-config");
router.post('/',multer, blogCtrl.createBlog);
router.get('/', blogCtrl.getAllBlogs);
router.get('/:id', blogCtrl.getOneBlog);
router.put('/:id', blogCtrl.modifyBlog);
router.delete('/:id', blogCtrl.deleteBlog);

module.exports = router;