const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/user');

router.get('/', usersCtrl.getAllUsers);
router.get('/:id', usersCtrl.getOneUser);
router.post('/', usersCtrl.createUser);
router.patch('/:id', usersCtrl.updateUser);

module.exports = router;
