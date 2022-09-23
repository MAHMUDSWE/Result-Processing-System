const db = require("../models/project350.model");

const postCreateCourse = (req, res) => {

    var { course_id, course_title, course_credits, dept_id, course_type, course_isMajor } = req.body;

    var query = "insert into tbl_course values(?, ?, ?, ?, ?, ?)";

    db.query(query, [course_id, course_title, dept_id, course_credits, course_type, course_isMajor], (err, result) => {
        if (!err) {
            res.status(200).json({
                "message": "Course create successful",
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

    var query = "insert into tbl_student values(?, ?, ?, ?, ?, ?, ?)";

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

module.exports = { postCreateCourse, postStudentDetails };