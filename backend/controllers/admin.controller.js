const db = require("../models/project350.model");
const { v4: uuidv4 } = require('uuid');

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

    var { values } = req.body;

    var query = "insert into tbl_course values ? ";

    db.query(query, [values], (err, result) => {
        if (!err) {
            res.status(200).json({
                "message": `${result.affectedRows} course inserted successfully`,
                result
            })
        }
        else {
            res.status(400).json({
                "message": "Course insert failed",
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

const postTeacherDetails = (req, res) => {

    var { teacher_id, teacher_name, dept_id, teacher_email, teacher_phone } = req.body;

    var query = "insert into tbl_teacher values(?, ?, ?, ?, ?)";

    db.query(query, [teacher_id, teacher_name, dept_id, teacher_email, teacher_phone], (err, result) => {
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
        values.push([input.dept_id, item, input.semester, input.session, input.USN, input.year]);
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
    var values = [];

    input.course_list.map((course) => {
        values.push([input.teacher_id, course.course_id, course.semester, course.session, course.USN]);
    })

    var query = "insert into tbl_teach values ?";

    db.query(query, [values], (err, result) => {
        if (!err) {
            res.status(200).json({
                "message": "Course teacher assign successful",
                result
            })
        }
        else {
            res.status(400).json({
                "message": "course teacher assign failed failed",
                err
            })
        }
    })
}

module.exports = {
    postCreateDepartment,
    postCreateCourse,
    postStudentDetails,
    postTeacherDetails,
    postOfferCourse,
    assignCourseTeacher
};