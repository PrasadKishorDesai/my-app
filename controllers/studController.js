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
        let sqlQuery = 'INSERT INTO students SET ?';
        let result = await query(sqlQuery, [values]);

        // const sqlQueryFetch = "SELECT * FROM students WHERE Id = ?";
        // let resultFetch = await query(sqlQueryFetch, [result.insertId]);

        // res.status(201).send({
        //     success: true,
        //     message: "Student data inserted successfully",
        //     data: resultFetch[0]
        // })


        res.redirect('/');

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
        })
    } catch (error) {
        res.status(500).render('500', {
            pageTitle: "Internal Server Error!!!",
            data: error.message,
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

        res.redirect('/');

    } catch (error) {
        res.status(500).render('500', {
            pageTitle: "Internal Server Error!!!",
            data: error.message,
        });
    }
}

const getDeleteStudent = async (req, res) => {
    const id = req.params.id;
    const sqlQueryFetch = "SELECT * FROM students WHERE id = ?";
    let resultFetch = await query(sqlQueryFetch, [id]);

    res.status(200).render('confirm-delete', {
        pageTitle: "Confirm Delete",
        path: "auth/delete-student",
        studData: resultFetch[0],
        id: id
    })
}

const postDeleteStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const val = req.body.submit;
        // console.log(val);
        if (val != 'yes') {
            res.redirect('/');
            return;
        }
        const sqlQueryFetch = "SELECT * FROM students WHERE id = ?";
        let resultFetch = await query(sqlQueryFetch, [id]);

        if (resultFetch.length === 0) {
            throw Error("No data found with given id");
        }


        const sqlQuery = "DELETE FROM students WHERE id = ?";
        let result = await query(sqlQuery, [id]);

        // console.log("Data deleted successfully with id:", id);
        res.redirect('/');



    } catch (error) {
        res.status(500).render('500', {
            pageTitle: "Internal Server Error!!!",
            data: error.message,
        });
    }
}


module.exports = {
    getAddStudent,
    postAddStudent,
    getStudents,
    getEditStudent,
    postEditStudent,
    getDeleteStudent,
    postDeleteStudent
}
