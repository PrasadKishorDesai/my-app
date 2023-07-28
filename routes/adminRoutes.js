const express = require('express');
const path = require('path')
const studController = require('../controllers/studController')
const isAuth = require('../middleware/is-auth');
const { body } = require('express-validator');

const router = express.Router();

// /admin/students
router.get('/students', isAuth, studController.getAddStudent);

router.post('/students', [
    body('f_name')
        .isLength({ min: 2 })
        .notEmpty()
        .trim(),
    body('l_name')
        .isLength({ min: 2 })
        .notEmpty()
        .trim(),
    body('dob')
        .notEmpty()
        .trim(),
    body('bloodgrp')
        .notEmpty()
        .trim(),
    body('gender')
        .notEmpty()
        .trim(),
    body('phoneno')
        .isLength({ min: 10, max: 10 })
        .notEmpty()
        .trim()
    ], isAuth, studController.postAddStudent
);

router.get('/edit-student/:id', isAuth, studController.getEditStudent);

router.post('/edit-student/:id', [
    body('f_name')
        .isLength({ min: 2 })
        .notEmpty()
        .trim(),
    body('l_name')
        .isLength({ min: 2 })
        .notEmpty()
        .trim(),
    body('dob')
        .notEmpty()
        .trim(),
    body('bloodgrp')
        .notEmpty()
        .trim(),
    body('gender')
        .notEmpty()
        .trim(),
    body('phoneno')
        .isLength({ min: 10, max: 10 })
        .notEmpty()
        .trim()
    ], isAuth, studController.postEditStudent
);

router.get('/delete-student/:id', isAuth, studController.getDeleteStudent);

router.post('/delete-student/:id', [
    body('submit')
        .notEmpty()
        .trim()
    ], isAuth, studController.postDeleteStudent
);


module.exports = router;
