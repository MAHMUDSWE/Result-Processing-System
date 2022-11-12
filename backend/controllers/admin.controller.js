const db = require("../models/project350.model");
const { v4: uuidv4 } = require('uuid');

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

module.exports = {
    getCourseList,
    postCreateDepartment,
    postCreateCourse,
    postStudentDetails,
    postTeacherDetails,
    postOfferCourse,
    assignCourseTeacher
};