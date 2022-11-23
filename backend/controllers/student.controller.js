const db = require('../models/project350.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getStudentDetails = (req, res) => {

    var reg_no = req.reg_no;

    console.log(reg_no);

    var query = "select * from tbl_student natural join tbl_department where reg_no = ? "

    try {
        db.query(query, [reg_no], (err, rows, fields) => {
            if (!err) {
                res.status(200).json({
                    "message": `Details from ${rows[0].std_name}`,
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
    } catch (error) {
        res.status(400).json({
            "message": "Internal Server error",
            err,
        });
    }
}

const getCourseOfferList = (req, res) => {

    var { usn, semester } = req.query;

    let dept_id = req.dept_id;

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

    var { session, semester } = req.query;

    let dept_id = req.dept_id;

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

    let reg_no = req.reg_no;
    let session = req.session;

    let { semester, USN } = input.course_list[0];

    let application_date = new Date().toISOString();

    input.course_list.map((course) => {
        values.push([reg_no, course.course_id, course.semester, course.session, course.USN]);
    })

    // console.log(values);
    // console.log(application_date.split("T")[0]);

    var query = "insert into tbl_takes values ? ; ";

    query = query + `INSERT INTO tbl_approval_status(reg_no, semester, session, USN, Application_Date)
VALUES
(${reg_no}, "${semester}", "${session}", "${USN}", "${application_date}");`;

    console.log(query);

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

const getApprovalStatus = (req, res) => {
    let reg_no = req.reg_no;
    let { semester, usn } = req.query;

    var query = `select *, DATE_FORMAT(Application_Date,'%Y-%m-%d') AS ApplicationDate,
    DATE_FORMAT(Department_Head_Approved_Date,'%Y-%m-%d') AS dpt_Head_Approved_Date
     from tbl_approval_status where reg_no = ? and semester = ? and usn = ?`;

    db.query(query, [reg_no, semester, usn], (err, rows) => {
        console.log(rows);
        if (!err && rows.length > 0) {
            res.status(200).json({
                "message": `Registration Approval Status`,
                rows
            });
        }
        else if (!err && rows.length === 0) {
            res.status(200).json({
                "message": 'Not found',
                rows
            })
        }
        else {
            res.status(400).json({
                "message": "Registration Status get failed",
                err,
            });
        }
    })
}

const getAdmitCards = async (req, res) => {
    let reg_no = req.reg_no;
    let { usn } = req.query;


    let function1 = async () => {
        let results = await new Promise((resolve, reject) => db.query(`SELECT * FROM tbl_approval_status WHERE reg_no = ${reg_no} AND USN = '${usn}';`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        }))
        return results;
    }

    var result = await function1();
    console.log(result);

    if (result[0].Department_Head_Status === undefined || result[0].Department_Head_Status === 'DISAPPROVED' ||
        result[0].Exam_Controller_Status === undefined || result[0].Exam_Controller_Status === 'DISAPPROVED') {
        return res.status(401).json({
            "message": `Course Registration is Disaproved.`,
        });
    }

    var query = `SELECT tbl_takes.reg_no, tbl_takes.course_id, tbl_takes.semester, tbl_takes.session as 'courseSession', tbl_takes.USN,
                 tbl_student.std_name, tbl_student.session,
                 tbl_course.course_title, tbl_course.course_credits, tbl_course.course_type
                 FROM tbl_takes, tbl_student, tbl_course
                 WHERE tbl_takes.reg_no = tbl_student.reg_no and tbl_takes.course_id = tbl_course.course_id 
                 and tbl_takes.reg_no = ${reg_no} AND tbl_takes.USN = "${usn}";`;

    db.query(query, (err, rows) => {

        if (!err && rows.length > 0) {
            res.status(200).json({
                "message": `List of Courses in admit card`,
                rows
            });
        }
        else if (!err && rows.length === 0) {
            res.status(200).json({
                "message": 'Not found',
                rows
            })
        }
        else {
            res.status(400).json({
                "message": "Course list get failed",
                err,
            });
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


    var query = 'SELECT reg_no, dept_id, session, password FROM tbl_student WHERE reg_no = ?'

    db.query(query, [reg_no], async (err, result) => {
        if (!err) {
            var hashedPassword = result[0].password;
            let { dept_id, session } = result[0];

            let results = await bcrypt.compare(password, hashedPassword);

            let jwtSecretKey = process.env.JWT_SECRET_KEY;

            let data = {
                reg_no,
                dept_id,
                session
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
    getApprovalStatus,
    getAdmitCards,
    studentSignUp,
    studentLogin
};