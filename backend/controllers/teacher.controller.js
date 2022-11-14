const db = require('../models/project350.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const getTeacherDetails = (req, res) => {
    var teacher_id = req.teacher_id;

    console.log(teacher_id);

    var query = "select * from tbl_teacher natural join tbl_department where teacher_id = ? "

    try {
        db.query(query, [teacher_id], (err, rows, fields) => {
            if (!err) {
                res.status(200).json({
                    "message": `Details from ${rows[0].teacher_name}`,
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

const getAssignedCourseList = (req, res) => {

    var { USN, semester } = req.query;

    var teacher_id = req.teacher_id;

    var query = "SELECT course_id, course_title, course_type, semester, session, part FROM tbl_teach NATURAL JOIN tbl_course WHERE teacher_id = ? AND USN = ? AND semester = ? ";

    db.query(query, [teacher_id, USN, semester], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "message": `List of courses Assigned`,
                rows,
            });
        }
        else {
            res.status(400).json({
                "message": "Request failed",
                err,
            });
        }
    })

}

const getTakenCourseStudentList = (req, res) => {
    var { course_id, semester, session } = req.query;

    var query = "SELECT reg_no, std_name, course_id, semester, session, USN FROM tbl_takes natural join tbl_student WHERE course_id = ? AND semester = ? AND session = ? ";

    db.query(query, [course_id, semester, session], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "message": `List of Student who has taken course ${course_id}`,
                rows,
            });
        }
        else {
            res.status(400).json({
                "message": "Request failed",
                err,
            });
        }
    })
}

const postCourseEvaluationMarkEntry = (req, res) => {

    var { inputs, total_class } = req.body;

    var teacher_id = req.teacher_id;

    var values = [];
    inputs.map((item) => {
        var { reg_no, course_id, class_attendance, term_test, class_assessment, semester, session, USN } = item;
        values.push(Object.values({
            reg_no,
            course_id,
            first_teacher_id: teacher_id,
            total_class: total_class,
            class_attendance, term_test, class_assessment, semester, session, USN
        }));
    })

    var { course_id, semester, session, USN } = inputs[0];
    var queryTest = 'SELECT COUNT(*) as "count" FROM tbl_teach WHERE course_id = ? AND teacher_id = ? AND part = "A" AND semester = ? AND session = ? AND USN = ? ';

    db.query(queryTest, [course_id, teacher_id, semester, session, USN], (err, rows) => {
        if (!err && rows[0].count == 1) {
            var query = "INSERT INTO tbl_result_theory(reg_no, course_id, first_teacher_id, total_class, class_attendance, term_test, class_assessment, semester, session, USN) VALUES ?";

            db.query(query, [values], (err, rows, fields) => {
                if (!err) {
                    res.status(200).json({
                        "message": `Course evaluation mark for course ${inputs[0].course_id} is added`,
                        rows,
                    });
                }
                else {
                    res.status(400).json({
                        "message": "Request failed",
                        err,
                    });
                }
            })
        }
        else {
            res.status(401).json({
                "message": "Not Authorized",
                err
            })
        }
    })


}


const postLabFinalMarkEntry = (req, res) => {

    var { inputs } = req.body;

    var teacher_id = req.teacher_id;

    var values = [];

    inputs.map((item) => {
        var { reg_no, course_id, total_mark, semester, session, USN } = item;
        values.push(Object.values({
            reg_no,
            course_id,
            first_teacher_id: teacher_id,
            total_mark,
            semester, session, USN
        }));
    })

    // res.send(values);
    var query = "INSERT INTO tbl_result_lab(reg_no, course_id, first_teacher_id, total_mark, semester, session, USN) VALUES ?";

    db.query(query, [values], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "message": `Lab final mark for course ${inputs[0].course_id} is added`,
                rows,
            });
        }
        else {
            res.status(400).json({
                "message": "Request failed",
                err,
            });
        }
    })
}


const putPartAMark = (req, res) => {

    var { inputs } = req.body;

    var teacher_id = req.teacher_id;

    var values = [];
    let queires = '';

    inputs.map((item) => {
        values.push({ ...item, teacher_id });
    })


    var { course_id, semester, session, USN } = inputs[0];

    var queryTest = 'SELECT count(*) as "count" FROM tbl_teach WHERE course_id = ? AND teacher_id = ? AND part = ? AND semester = ? AND session = ? AND USN = ? ';

    db.query(queryTest, [course_id, teacher_id, "A", semester, session, USN], (err, rows) => {

        if (!err && rows[0].count === 1) {
            values.map((item) => {
                queires += `UPDATE tbl_result_theory SET part_A = ${item.part} WHERE reg_no = "${item.reg_no}" and course_id = "${item.course_id}" and semester = "${item.semester}" and session = "${item.session}"; `;
            })

            db.query(queires, (err, rows, fields) => {
                if (!err) {
                    res.status(200).json({
                        "message": `Part A mark for course ${inputs[0].course_id} is added`,
                        rows,
                    });
                }
                else {
                    res.status(400).json({
                        "message": "Part A mark add failed",
                        err,
                    });
                }
            })
        }
        else {
            res.status(401).json({
                "message": "Not Authorized",
                err
            })
        }
    })

}

const putPartBMark = (req, res) => {

    var { inputs } = req.body;

    var teacher_id = req.teacher_id;

    var values = [];
    let queires = '';

    inputs.map((item) => {
        values.push({ ...item, second_teacher_id: teacher_id });
    })


    var { course_id, semester, session, USN } = inputs[0];

    var queryTest = 'SELECT count(*) as "count" FROM tbl_teach WHERE course_id = ? AND teacher_id = ? AND part = ? AND semester = ? AND session = ? AND USN = ? ';

    db.query(queryTest, [course_id, teacher_id, "B", semester, session, USN], (err, rows) => {

        if (!err && rows[0].count === 1) {
            values.map((item) => {
                queires += `UPDATE tbl_result_theory SET part_B = ${item.part}, second_teacher_id = ${item.second_teacher_id} WHERE reg_no = "${item.reg_no}" and course_id = "${item.course_id}" and semester = "${item.semester}" and session = "${item.session}"; `;
            })

            db.query(queires, (err, rows, fields) => {
                if (!err) {
                    res.status(200).json({
                        "message": `Part B mark for course ${inputs[0].course_id} is added`,
                        rows,
                    });
                }
                else {
                    res.status(400).json({
                        "message": "Part B mark add failed",
                        err,
                    });
                }
            })
        }
        else {
            res.status(401).json({
                "message": "Not Authorized",
                err
            })
        }
    })

}

const getCourseWiseAttendaceAndEvaluation = (req, res) => {
    var { course_id, semester, session } = req.query;

    var query = "SELECT reg_no, std_name, course_id, semester, total_class, class_attendance, term_test, class_assessment FROM tbl_result_theory natural join tbl_student WHERE course_id = ? AND semester = ? AND session = ? ";

    db.query(query, [course_id, semester, session], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "message": `Course Wise Attendance and Mid Semester Marks Information`,
                rows,
            });
        }
        else {
            res.status(400).json({
                "message": "Request failed",
                err,
            });
        }
    })
}


const getLabCourseFinalMarkList = (req, res) => {
    var { course_id, semester, session } = req.query;

    var query = "SELECT reg_no, std_name, course_id, course_credits, semester, total_mark, gpa, letter_grade FROM tbl_result_lab natural join tbl_student natural join tbl_course WHERE course_id = ? AND semester = ? AND session = ? ";

    db.query(query, [course_id, semester, session], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "message": `Course Wise Exam marks Information`,
                rows,
            });
        }
        else {
            res.status(400).json({
                "message": "Request failed",
                err,
            });
        }
    })
}

const getTheoryCourseFinalMarkList = (req, res) => {
    var { course_id, semester, session } = req.query;

    var query = "SELECT reg_no, std_name, gpa, letter_grade, course_id, course_title, course_credits, semester, tbl_result_theory.session FROM tbl_result_theory natural join tbl_student natural join tbl_course WHERE course_id = ? AND semester = ? AND session = ? ";

    db.query(query, [course_id, semester, session], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "message": `Course Wise Exam marks Information`,
                rows,
            });
        }
        else {
            res.status(400).json({
                "message": "Request failed",
                err,
            });
        }
    })
}


const teacherSignUp = async (req, res) => {
    let { password, confirm_password } = req.body;
    let teacher_id = req.body.username;

    let function1 = async () => {
        let results = await new Promise((resolve, reject) => db.query('SELECT count(*) as count FROM tbl_teacher WHERE teacher_id = ? and password != "" AND password != "null"', [teacher_id], (err, results) => {
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
            "message": `Already Registered.`,
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

    var query = 'UPDATE tbl_teacher SET password = ? WHERE teacher_id = ?';

    db.query(query, [password, teacher_id], (err, result) => {

        if (!err && result.affectedRows === 1) {
            res.status(200).json({
                "message": `Registration Successful`,
            });
        }
        else {
            res.status(400).json({
                "message": "Registration failed. Enter a valid id",
                err,
            });
        }
    })
}


const teacherLogin = async (req, res) => {
    let { teacher_id, password } = req.body;

    let function1 = async () => {
        var query = 'SELECT * FROM tbl_teacher WHERE teacher_id = ?';
        let results = await new Promise((resolve, reject) => db.query(query, [teacher_id], (err, results) => {
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

    var query = 'SELECT teacher_id, dept_id, password FROM tbl_teacher WHERE teacher_id = ?'

    db.query(query, [teacher_id], async (err, result) => {
        if (!err) {
            var hashedPassword = result[0].password;
            let dept_id = result[0].dept_id;

            let results = await bcrypt.compare(password, hashedPassword);

            let jwtSecretKey = process.env.JWT_SECRET_KEY;

            let data = {
                teacher_id,
                dept_id
            };
            let expiresIn = {
                expiresIn: "24h"
            };

            const token = jwt.sign(data, jwtSecretKey, expiresIn);

            if (results) {
                res.status(200).json({
                    message: "Log in Successful",
                    "access_token": token
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
    getTeacherDetails,
    getAssignedCourseList,
    getTakenCourseStudentList,
    postCourseEvaluationMarkEntry,
    postLabFinalMarkEntry,
    putPartAMark,
    putPartBMark,
    getCourseWiseAttendaceAndEvaluation,
    getLabCourseFinalMarkList,
    getTheoryCourseFinalMarkList,
    teacherSignUp,
    teacherLogin
}




