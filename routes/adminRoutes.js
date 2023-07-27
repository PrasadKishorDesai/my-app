const express = require('express');
const path = require('path')
const studController = require('../controllers/studController')

const router = express.Router();

const students = [1];

// /admin/students
router.get('/students', studController.getAddStudent);

router.post('/students', studController.postAddStudent);

router.get('/edit-student/:id', studController.getEditStudent);

router.post('/edit-student/:id', studController.postEditStudent);


module.exports = router;
