const express = require('express');
const router = express.Router();
const reviewCtrl = require('../controllers/review');

router.get('/', reviewCtrl.getAllReviews);
router.get('/verified', reviewCtrl.getAllVerifiedReviews);
router.get('/unverified', reviewCtrl.getAllUnverifiedReviews);
router.post('/', reviewCtrl.createReview);
router.get('/:id', reviewCtrl.getOneReview);
router.put('/:id', reviewCtrl.modifyReview);
router.delete('/:id', reviewCtrl.deleteReview);

module.exports = router;