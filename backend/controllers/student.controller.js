const db = require('../models/project350.model')

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

module.exports = {
    getStudentDetails,
    getCourseOfferList,
    getDropCourseList,
    postRegisterCourse
};