const { log } = require('console');
const db = require('../database/mysql');
const util = require('util');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const query = util.promisify(db.query).bind(db);


exports.getLogin = async (req, res) => {
    res.status(200).render('login', {
        pageTitle: "Login Page",
        path: '/login',
        isAuthenticated: false,
        oldInput: {
            email: '',
            password: ''
        }
    })
}


exports.postLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // 422 for validation failed
            console.log(errors.array()[0]);
            res.status(422).render('login', {
                pageTitle: "Login Page",
                path: "/auth/login",
                oldInput: {email, password}
            });
            return;
        }

        // console.log(email);
        let sqlQueryFetch = "SELECT * FROM admin WHERE email = ?";
        let resultFetch = await query(sqlQueryFetch, [email]);

        // console.log(resultFetch[0]);
        // console.log(resultFetch.length);
        if (resultFetch.length === 0) {
            // console.log("user does not exist");
            // res.redirect('/auth/login');
            res.status(422).render('login', {
                pageTitle: "Login Page",
                path: "/auth/login",
                oldInput: {email, password}
            });
            return;
        }


        // console.log(resultFetch[0]);
        // console.log(resultFetch[0].password);
        let hashedPwd = resultFetch[0].password;
        let isEqual = await bcrypt.compare(password, hashedPwd);
        // console.log(isEqual)
        if (!isEqual) {
            // console.log("password does not match");
            res.status(422).render('login', {
                pageTitle: "Login Page",
                path: "/auth/login",
                oldInput: {email, password}
            });
            return;
        }

        // console.log("successfully logged in");

        req.session.isLoggedIn = true;
        // req.session.user = user;
        // let temp = await req.session.save((err) => {
        //     console.log("error auth controller 50:", err);
        //     if (err) return;
        //     res.redirect('/');
        // });
        await req.session.save();

        // console.log("temp: ", temp);
        res.redirect('/');

    } catch (error) {
        res.status(500).render('500', {
            pageTitle: "Internal Server Error!!!",
            data: error.message,
            // isAuthenticated: false
        });
    }
}

exports.getSignup = async (req, res) => {
    res.status(200).render('signup', {
        pageTitle: "Signup Page",
        path: '/auth/signup',
        oldInput: {
            name: '', 
            email: '',
            password: '',
            confirmPassword: ''
        }
    })
}

exports.postSignup = async (req, res) => {
    try {
        const email = req.body.email;
        let name = req.body.name;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // 422 for validation failed
            console.log(errors.array()[0]);
            res.status(422).render('signup', {
                pageTitle: "Signup Page",
                path: "/auth/signup",
                oldInput: {name, email, password, confirmPassword}
            });
            return;
        }

        const sqlQueryFetch = "SELECT * FROM admin WHERE email = ?";
        let resultFetch = await query(sqlQueryFetch, [email]);

        // console.log(resultFetch[0]);
        // console.log(resultFetch.length);
        if (resultFetch.length !== 0) {
            // console.log("user alredy existed");
            res.redirect('/auth/signup');
            return;
        }

        if (password !== confirmPassword) {
            // console.log("password doesn't match");
            res.redirect('/auth/signup');
            return;
        }

        let hashedPwd = await bcrypt.hash(password, 7);
        let values = { name, email, password: hashedPwd };
        const sqlQuery = "INSERT INTO admin SET ?";
        let result = await query(sqlQuery, [values]);

        // console.log(result);
        // console.log("user created successfully");
        res.redirect('/auth/login');

    } catch (error) {
        res.status(500).render('500', {
            pageTitle: "Internal Server Error!!!",
            data: error.message,
            // isAuthenticated: false
        });
    }
}

exports.logout = (req, res) => {
    // res.redirect('/api/login');
    req.session.isLoggedIn = false;
    // console.log("successfully logged out");
    req.session.destroy(err => {
        // console.log(err);
        res.redirect('/auth/login');
    });
}

