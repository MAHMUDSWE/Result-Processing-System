const db = require('../models/project350.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getStudentDetails = (req, res) => {

    var { reg_no } = req.body;

    var query = "select * from tbl_student where reg_no = ? "

    db.query(query, [reg_no], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "success": `Details from ${rows[0].std_name}`,
                rows,
            });
        }
        else {
            res.status(400).json({
                "message": "Request failed",
                err,
            });
        }
    });
}

const getCourseOfferList = (req, res) => {

    var { dept_id, usn, semester } = req.query;

    var query = "SELECT * FROM tbl_offer NATURAL JOIN tbl_course WHERE dept_id = ? AND USN = ? AND semester = ?";

    db.query(query, [dept_id, usn, semester], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.status(200).json({
                "success": `List of courses offered`,
                rows,
            });
        }
        else {
            res.status(400).json({
                "message": "Request failed",
                err,
            });
        }
    });
}

const getDropCourseList = (req, res) => {

    var { dept_id, session, semester } = req.query;

    var query = "SELECT * FROM tbl_offer NATURAL JOIN tbl_course WHERE dept_id = ? AND session = ? AND semester = ?";

    db.query(query, [dept_id, session, semester], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "success": `List of courses offered`,
                rows,
            });
        }
        else {
            res.status(400).json({
                "message": "Request failed",
                err,
            });
        }
    });
}

const postRegisterCourse = (req, res) => {
    var input = req.body;
    var values = [];

    input.course_list.map((course) => {
        values.push([input.reg_no, course.course_id, course.semester, course.session, course.USN]);
    })

    console.log(values);
    var query = "insert into tbl_takes values ?";

    db.query(query, [values], (err, result) => {
        if (!err) {
            res.status(200).json({
                "message": "Course registration successful",
                result
            })
        }
        else {
            res.status(400).json({
                "message": "course registration failed",
                err
            })
        }
    })
}

const studentSignUp = async (req, res) => {
    let { password, confirm_password } = req.body;
    let reg_no = req.body.username;

    let function1 = async () => {
        let results = await new Promise((resolve, reject) => db.query('SELECT count(*) as count FROM tbl_student WHERE reg_no = ? and password != "" AND password != "null"', [reg_no], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        }))
        return results;
    }

    var result = await function1();

    if (result[0].count > 0) {
        return res.status(409).json({
            "message": `Already Registered`,
        });
    }

    if (password === confirm_password) {
        password = await bcrypt.hash(req.body.password, 10);
    }
    else {
        return res.status(400).json({
            "message": "Password didn't match",
        });
    }

    // functionality to send an otp

    var query = 'UPDATE tbl_student SET password = ? WHERE reg_no = ?';

    db.query(query, [password, reg_no], (err, result) => {

        if (!err && result.affectedRows === 1) {
            res.status(200).json({
                "message": `Registration Successful`,
            });
        }
        else {
            res.status(400).json({
                "message": "Registration failed. Invalid username or password",
                err,
            });
        }
    })

}

const studentLogin = async (req, res) => {
    let { reg_no, password } = req.body;

    let function1 = async () => {
        var query = 'SELECT *  FROM tbl_student WHERE reg_no = ? ';
        let results = await new Promise((resolve, reject) => db.query(query, [reg_no], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        }))
        return results;
    }

    var result = await function1();

    if (result.length === 0) {
        return res.status(400).json({
            "message": `Not yet Registered.`,
        });
    }
    else if (result[0].password === '') {
        return res.status(400).json({
            "message": `Not yet Registered.`,
        });
    }


    var query = 'SELECT reg_no, dept_id, password FROM tbl_student WHERE reg_no = ?'

    db.query(query, [reg_no], async (err, result) => {
        if (!err) {
            var hashedPassword = result[0].password;
            let dept_id = result[0].dept_id;

            let results = await bcrypt.compare(password, hashedPassword);

            let jwtSecretKey = process.env.JWT_SECRET_KEY;

            let data = {
                reg_no,
                dept_id
            };
            let expiresIn = {
                expiresIn: "24h"
            };

            const token = jwt.sign(data, jwtSecretKey, expiresIn);

            if (results) {
                res.status(200).json({
                    message: "Log in Successful",
                    access_token: token
                })
            } else {
                res.status(401).json({
                    message: "Invalid username or password"
                })
            }
        } else {
            res.status(400).json({
                message: "Log in failed",
                err
            })
        }
    })
}


module.exports = {
    getStudentDetails,
    getCourseOfferList,
    getDropCourseList,
    postRegisterCourse,
    studentSignUp,
    studentLogin
};