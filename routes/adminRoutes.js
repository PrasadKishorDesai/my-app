const express = require('express');
const path = require('path')
const studController = require('../controllers/studController')
const isAuth = require('../middleware/is-auth')

const router = express.Router();

// /admin/students
router.get('/students', isAuth, studController.getAddStudent);

router.post('/students', isAuth, studController.postAddStudent);

router.get('/edit-student/:id', isAuth, studController.getEditStudent);

router.post('/edit-student/:id', isAuth, studController.postEditStudent);

router.get('/delete-student/:id', isAuth, studController.getDeleteStudent);

router.post('/delete-student/:id', isAuth, studController.postDeleteStudent);


module.exports = router;
