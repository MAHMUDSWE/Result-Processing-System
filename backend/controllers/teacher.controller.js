const db = require('../models/project350.model');

const getAssignedCourseList = (req, res) => {

    var { teacher_id, USN, semester } = req.body;

    var query = "SELECT course_id, course_title, semester, session FROM tbl_teach NATURAL JOIN tbl_course WHERE teacher_id = ? AND USN = ? AND semester = ? ";

    db.query(query, [teacher_id, USN, semester], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "success": `List of courses Assigned`,
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
    var { course_id, semester, session } = req.body;

    var query = "SELECT reg_no, course_id, semester, session, USN FROM tbl_takes WHERE course_id = ? AND semester = ? AND session = ? ";

    db.query(query, [course_id, semester, session], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "success": `List of Student who has taken course ${course_id}`,
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

    var { inputs, semester, session, USN } = req.body;

    var values = [];

    inputs.map((item) => {
        values.push(Object.values({ ...item, semester, session, USN }));
    })

    // res.send(values);

    var query = "INSERT INTO tbl_result_theory(reg_no, course_id, first_teacher_id, class_attendance, term_test, class_assessment, semester, session, USN) VALUES ?";

    db.query(query, [values], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "success": `Course evaluation mark for course ${inputs[0].course_id} is added`,
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


const postLabFinalMarkEntry = (req, res) => {

    var { inputs, semester, session, USN } = req.body;

    var values = [];

    inputs.map((item) => {
        values.push(Object.values({ ...item, semester, session, USN }));
    })

    // res.send(values);

    var query = "INSERT INTO tbl_result_lab(reg_no, course_id, first_teacher_id, total_mark, semester, session, USN) VALUES ?";

    db.query(query, [values], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "success": `Lab final mark for course ${inputs[0].course_id} is added`,
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

    var { inputs, semester, session, USN } = req.body;

    var values = [];
    let queires = '';

    inputs.map((item) => {
        values.push({ ...item, semester, session, USN });
    })
    values.map((item) => {
        queires += `UPDATE tbl_result_theory SET part_A = ${item.part_A} WHERE reg_no = "${item.reg_no}" and course_id = "${item.course_id}" and semester = "${item.semester}" and session = "${item.session}"; `;
    })

    db.query(queires, (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "success": `Part A mark for course ${inputs[0].course_id} is added`,
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

const putPartBMark = (req, res) => {

    var { inputs, semester, session, USN } = req.body;

    var values = [];
    let queires = '';

    inputs.map((item) => {
        values.push({ ...item, semester, session, USN });
    })
    values.map((item) => {
        queires += `UPDATE tbl_result_theory SET part_B = ${item.part_B}, second_teacher_id = ${item.second_teacher_id} WHERE reg_no = "${item.reg_no}" and course_id = "${item.course_id}" and semester = "${item.semester}" and session = "${item.session}"; `;
    })

    db.query(queires, (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "success": `Part B mark for course ${inputs[0].course_id} is added`,
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

const getCourseWiseAttendaceAndEvaluation = (req, res) => {
    var { course_id, semester, session } = req.body;

    var query = "SELECT reg_no, std_name, course_id, semester, class_attendance, term_test, class_assessment FROM tbl_result_theory natural join tbl_student WHERE course_id = ? AND semester = ? AND session = ? ";

    db.query(query, [course_id, semester, session], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "success": `Course Wise Attendance and Mid Semester Marks Information`,
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
    var { course_id, semester, session } = req.body;

    var query = "SELECT reg_no, std_name, course_id, semester, total_mark FROM tbl_result_lab natural join tbl_student WHERE course_id = ? AND semester = ? AND session = ? ";

    db.query(query, [course_id, semester, session], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "success": `Course Wise Exam marks Information`,
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
    var { course_id, semester, session } = req.body;

    var query = "SELECT reg_no, std_name, gpa, letter_grade, course_id, course_title, course_credits, semester, tbl_result_theory.session FROM tbl_result_theory natural join tbl_student natural join tbl_course WHERE course_id = ? AND semester = ? AND session = ? ";

    db.query(query, [course_id, semester, session], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                "success": `Course Wise Exam marks Information`,
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

module.exports = {
    getAssignedCourseList,
    getTakenCourseStudentList,
    postCourseEvaluationMarkEntry,
    postLabFinalMarkEntry,
    putPartAMark,
    putPartBMark,
    getCourseWiseAttendaceAndEvaluation,
    getLabCourseFinalMarkList,
    getTheoryCourseFinalMarkList
}