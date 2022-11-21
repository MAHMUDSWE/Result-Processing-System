const db = require("../models/project350.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAdminDetails = (req, res) => {
    var admin_id = req.admin_id;

    console.log(admin_id);

    var query = "select * from tbl_admin where admin_id = ? "

    try {
        db.query(query, [admin_id], (err, rows, fields) => {
            if (!err) {
                res.status(200).json({
                    "message": `Details from ${rows[0].admin_name}`,
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

const getCourseList = (req, res) => {
    var { dept_id } = req.query;

    var query = "SELECT * FROM tbl_course WHERE dept_id = ?";

    db.query(query, [dept_id], (err, result) => {
        if (!err && result.length > 0) {
            res.status(200).json({
                "message": `List of courses of department ${dept_id}`,
                course_list: result
            })
        }
        else {
            res.status(400).json({
                "message": "List get failed",
                err
            })
        }
    })
}

const postCreateDepartment = (req, res) => {

    var { values } = req.body;

    var query = "insert into tbl_department values ? ";

    db.query(query, [values], (err, result) => {
        if (!err) {
            res.status(200).json({
                "message": "Department create successful",
                result
            })
        }
        else {
            res.status(400).json({
                "message": "Department create failed",
                err
            })
        }
    })
}


const postCreateCourse = (req, res) => {

    var values = Object.values(req.body);

    var query = "insert into tbl_course values (?) ";

    db.query(query, [values], (err, result) => {
        if (!err) {
            res.status(200).json({
                "message": `Course ${req.body.course_id} added successfully`,
                result
            })
        }
        else {
            res.status(400).json({
                "message": "Course create failed",
                err
            })
        }
    })
}

const postStudentDetails = (req, res) => {

    var { reg_no, std_name, dept_id, std_email, std_phone, std_address, std_dateOfBirth } = req.body;

    var query = "insert into tbl_student(reg_no, std_name, dept_id, std_email, std_phone, std_address, std_dateOfBirth) values(?, ?, ?, ?, ?, ?, ?)";

    db.query(query, [reg_no, std_name, dept_id, std_email, std_phone, std_address, std_dateOfBirth], (err, result) => {
        if (!err) {
            res.status(200).json({
                "message": "Student info added successfully",
                result
            })
        }
        else {
            res.status(400).json({
                "message": "Student info add failed",
                err
            })
        }
    })
}

const postTeacherDetails = (req, res) => {

    var { teacher_id, teacher_name, dept_id, teacher_email, teacher_phone, designation } = req.body;

    var query = "insert into tbl_teacher(teacher_id, teacher_name, dept_id, teacher_email, teacher_phone, designation) values(?, ?, ?, ?, ?, ?)";

    db.query(query, [teacher_id, teacher_name, dept_id, teacher_email, teacher_phone, designation], (err, result) => {
        if (!err) {
            res.status(200).json({
                "message": "Teacher info added successfully",
                result
            })
        }
        else {
            res.status(400).json({
                "message": "Teacher info add failed",
                err
            })
        }
    })
}

const postOfferCourse = (req, res) => {

    var input = req.body;
    var values = [];

    input.course_id.map((item) => {
        values.push([input.dept_id, item, input.semester, input.session, input.usn, input.year]);
    })

    // console.log(values);
    // res.send(values);

    // // input.map((object) => {
    // //     values.push(Object.values(object));
    // // })

    var query = "insert into tbl_offer values ?";

    db.query(query, [values], (err, result) => {
        if (!err) {
            res.status(200).json({
                "message": "Semester wise offer list created successfully",
                result
            })
        }
        else {
            res.status(400).json({
                "message": "offer list create failed",
                err
            })
        }
    })
}


const assignCourseTeacher = (req, res) => {
    var input = req.body;
    input = {
        teacher_id: input.teacher_id,
        course_id: input.course_id,
        semester: input.semester,
        session: input.session,
        usn: input.usn,
        part: input.part,
    }
    var values = Object.values(input);

    var query = "insert into tbl_teach values (?)";
    let message = '';
    if (input.part === 'A') {
        message = "Course teacher assign successful"
    }
    else {
        message = "Second teacher assign successful"
    }
    console.log(values);
    db.query(query, [values], (err, result) => {
        if (!err) {
            res.status(200).json({
                "message": message,
                result
            })
        }
        else {
            res.status(400).json({
                "message": "course teacher assign failed",
                err
            })
        }
    })
}

const getControllerApprovalDetails = (req, res) => {
    var { semester, usn, dept_id } = req.query;
    var { admin_id } = req;

    console.log(semester, usn, admin_id, dept_id);

    var query = `SELECT *, tbl_student.std_name FROM tbl_approval_status, tbl_student
    WHERE
    tbl_approval_status.reg_no = tbl_student.reg_no
    and
    semester = "${semester}" AND USN = "${usn}" AND
    tbl_approval_status.reg_no IN (SELECT tbl_student.reg_no FROM tbl_student WHERE tbl_student.dept_id = ${dept_id})`;

    db.query(query, (err, rows) => {
        if (!err) {
            res.status(200).json({
                "message": "List of Students",
                rows
            })
        } else {
            res.status(200).json({
                "message": "List of students get failed",
                err
            })
        }
    })

}


const putAdminApproval = (req, res) => {
    var { reg_no, semester, USN, Exam_Controller_Status } = req.body;

    let admin_id = req.admin_id;
    let Exam_Controller_Approved_Date = new Date().toISOString();

    var query = `UPDATE tbl_approval_status SET Exam_Controller = (SELECT admin_name FROM tbl_admin WHERE admin_id = ${admin_id}),
        Exam_Controller_Status = "${Exam_Controller_Status}", Exam_Controller_Approved_Date = "${Exam_Controller_Approved_Date}"
        WHERE reg_no = ${reg_no} AND semester = "${semester}" AND USN = "${USN}"
        `;

    db.query(query, (err, result) => {
        if (!err) {
            res.status(200).json({
                "message": "Controller Approval Status updated successfully",
                result
            })
        } else {
            res.status(200).json({
                "message": "Controller Approval status update failed",
                err
            })
        }
    })
}

const adminSignUp = async (req, res) => {
    let { password, confirm_password } = req.body;
    let admin_id = req.body.username;

    let function1 = async () => {
        let results = await new Promise((resolve, reject) => db.query('SELECT count(*) as count FROM tbl_admin WHERE admin_id = ? and password != "" AND password != "null"', [admin_id], (err, results) => {
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

    var query = 'UPDATE tbl_admin SET password = ? WHERE admin_id = ?';

    db.query(query, [password, admin_id], (err, result) => {

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

const adminLogin = async (req, res) => {
    let { admin_id, password } = req.body;

    let function1 = async () => {
        var query = 'SELECT * FROM tbl_admin WHERE admin_id = ?';
        let results = await new Promise((resolve, reject) => db.query(query, [admin_id], (err, results) => {
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

    var query = 'SELECT admin_id, designation, password FROM tbl_admin WHERE admin_id = ?'

    db.query(query, [admin_id], async (err, result) => {
        if (!err) {
            var hashedPassword = result[0].password;
            let { designation } = result[0];

            let results = await bcrypt.compare(password, hashedPassword);

            let jwtSecretKey = process.env.JWT_SECRET_KEY;

            let data = {
                admin_id,
                designation
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
    getAdminDetails,
    getCourseList,
    postCreateDepartment,
    postCreateCourse,
    postStudentDetails,
    postTeacherDetails,
    postOfferCourse,
    assignCourseTeacher,
    getControllerApprovalDetails,
    putAdminApproval,
    adminSignUp,
    adminLogin
};