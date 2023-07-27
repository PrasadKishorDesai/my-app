const { log } = require('console');
const db = require('../database/mysql');
const util = require('util');
const bcrypt = require('bcryptjs');
const query = util.promisify(db.query).bind(db);


exports.getLogin = async (req, res) => {
    res.status(200).render('login', {
        pageTitle: "Login Page",
        path: '/login',
        isAuthenticated: false
    })
}


exports.postLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // console.log(email);
        let sqlQueryFetch = "SELECT * FROM admin WHERE email = ?";
        let resultFetch = await query(sqlQueryFetch, [email]);

        // console.log(resultFetch[0]);
        // console.log(resultFetch.length);
        if (resultFetch.length === 0) {
            // console.log("user does not exist");
            res.redirect('/auth/signup');
            return;
        }


        // console.log(resultFetch[0]);
        // console.log(resultFetch[0].password);
        let hashedPwd = resultFetch[0].password;
        let isEqual = await bcrypt.compare(password, hashedPwd);
        // console.log(isEqual)
        if (!isEqual) {
            // console.log("password does not match");
            res.redirect('/api/login');
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
        path: '/signup',
        isAuthenticated: false
    })
}

exports.postSignup = async (req, res) => {
    try {
        const email = req.body.email;

        const sqlQueryFetch = "SELECT * FROM admin WHERE email = ?";
        let resultFetch = await query(sqlQueryFetch, [email]);

        // console.log(resultFetch[0]);
        // console.log(resultFetch.length);
        if (resultFetch.length !== 0) {
            // console.log("user alredy existed");
            res.redirect('/auth/signup');
            return;
        }

        let name = req.body.name;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;
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

