const express = require("express");
const {
    postCreateCourse,
    postStudentDetails,
    postTeacherDetails,
    postCreateDepartment,
    postOfferCourse,
    assignCourseTeacher,
    getCourseList
} = require("../controllers/admin.controller");

const router = express();

router.get('/getCourse', getCourseList);

router.post("/createDepartment", postCreateDepartment);

router.post("/createCourse", postCreateCourse);

router.post("/studentDetailsEntry", postStudentDetails);

router.post("/teacherDetailsEntry", postTeacherDetails);

router.post("/createOfferCourse", postOfferCourse);

router.post("/assignCourse", assignCourseTeacher);

module.exports = router;