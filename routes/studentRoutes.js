const express = require('express');
const studController = require('../controllers/studController');


const router = express.Router();

// home page
router.get('/students', studController.getStudents);

module.exports = router;
