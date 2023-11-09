const express = require('express');
const authController = require('../controllers/authController');
const candidateController = require('../controllers/candidateController');
const router = express.Router();

router.use(authController.protect);

router.get('/', candidateController.getAllCandidates);

module.exports = router;
