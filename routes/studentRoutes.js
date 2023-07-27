const express = require('express');
const studController = require('../controllers/studController');


const router = express.Router();

// home page
router.get('/', studController.getStudents);


// router.get('/', studController.getStudents);

module.exports = router;
