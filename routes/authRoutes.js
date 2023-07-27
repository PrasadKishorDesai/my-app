const express = require('express');
const authController = require('../controllers/authController');
const { check, body } = require('express-validator');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login',
    [
        check('email', "Please enter a valid email/password")
            .isEmail()
            .notEmpty()
            .trim(),
        body('password', "Please enter a valid email/password")
            .isLength({ min: 6 })
            .notEmpty()
            .trim()
    ],
    authController.postLogin
);

router.get('/signup', authController.getSignup);

router.post('/signup',
    [
        check('email', "Please enter a valid email/password")
            .isEmail()
            .normalizeEmail()
            .notEmpty()
            .trim(),
        body('password', "Please enter a valid email/password")
            .isLength({ min: 6 })
            .notEmpty()
            .trim(),
        body('confirmPassword')
            .notEmpty()
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords are not matching!!!");
                }
                return true;
            }),
        body('name', 'Please enter name')
            .notEmpty()
            .isLength({min: 3})
            .trim()
    ],
    authController.postSignup
);

router.post('/logout', authController.logout);


module.exports = router;
