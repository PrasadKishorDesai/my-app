const db = require('../database/mysql');
const util = require('util');
const query = util.promisify(db.query).bind(db);


const getStudents = async (req, res) => {
    const sqlQuery = "SELECT * FROM students";
    try {
        const result = await query(sqlQuery);
        res.status(200).render('home', {
            pageTitle: "Home Page",
            path: "api/students",
            studs: result,
            newDataAdded: false,
            isAuthenticated: req.session.isLoggedIn
        })
    } catch (error) {
        res.status(500).render('500', {
            pageTitle: "Internal Server Error!!!",
            data: error.message,
            // isAuthenticated: req.session.isLoggedIn
        });
    }
}

const getAddStudent = async (req, res) => {
    try {
        res.status(200).render('add-student', {
            pageTitle: "Add Student Page",
            path: "auth/students",
            isAuthenticated: req.session.isLoggedIn
        })
    } catch (error) {
        res.status(500).render('500', {
            pageTitle: "Internal Server Error!!!",
            data: error.message,
            // isAuthenticated: req.session.isLoggedIn
        });
    }
}

const postAddStudent = async (req, res) => {
    try {
        let values = req.body;
        let sqlQuery = "INSERT INTO students SET ?";
        let result = await query(sqlQuery, [values]);

        // const sqlQueryFetch = "SELECT * FROM students WHERE Id = ?";
        // let resultFetch = await query(sqlQueryFetch, [result.insertId]);

        // res.status(201).send({
        //     success: true,
        //     message: "Student data inserted successfully",
        //     data: resultFetch[0]
        // })


        res.redirect('/api/students');

        // sqlQuery = "SELECT * FROM students";
        // result = await query(sqlQuery);
        // res.status(200).render('home', {
        //     pageTitle: "Home Page",
        //     path: "api/students",
        //     studs: result
        // })

    } catch (error) {
        res.status(500).render('500', {
            pageTitle: "Internal Server Error!!!",
            data: error.message,
            // isAuthenticated: req.session.isLoggedIn
        });
    }
}



const getEditStudent = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id)
        const sqlQueryFetch = "SELECT * FROM students WHERE id = ?";
        let resultFetch = await query(sqlQueryFetch, [id]);
        // console.log(resultFetch[0])


        res.status(200).render('edit-student', {
            pageTitle: "Add Student Page",
            path: "auth/edit-student",
            studData: resultFetch[0],
            isAuthenticated: req.session.isLoggedIn
        })
    } catch (error) {
        res.status(500).render('500', {
            pageTitle: "Internal Server Error!!!",
            data: error.message,
            // isAuthenticated: req.session.isLoggedIn
        });
    }
}

const postEditStudent = async (req, res) => {
    // console.log(req.params.id);
    try {
        let values = req.body;
        let id = req.params.id;
        const sqlQuery = "UPDATE students SET ? WHERE id = ?";
        let result = await query(sqlQuery, [values, id]);

        res.redirect('/api/students');

    } catch (error) {
        res.status(500).render('500', {
            pageTitle: "Internal Server Error!!!",
            data: error.message,
            // isAuthenticated: req.session.isLoggedIn
        });
    }
}


module.exports = {
    getAddStudent,
    postAddStudent,
    getStudents,
    getEditStudent,
    postEditStudent
}
