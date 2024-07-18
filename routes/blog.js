const express = require('express');
const router = express.Router();
const blogCtrl = require('../controllers/blog');

router.post('/', blogCtrl.createBlog);
router.get('/', blogCtrl.getAllBlogs);
router.get('/:id', blogCtrl.getOneBlog);
router.put('/:id', blogCtrl.modifyBlog);
router.delete('/:id', blogCtrl.deleteBlog);

module.exports = router;