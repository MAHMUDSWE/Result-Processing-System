const express = require("express");
const {
    postCreateCourse,
    postStudentDetails,
    postTeacherDetails,
    postCreateDepartment,
    postOfferCourse,
    assignCourseTeacher,
    getCourseList,
    adminSignUp,
    adminLogin,
    getAdminDetails,
    getControllerApprovalDetails,
    putAdminApproval
} = require("../controllers/admin.controller");

const router = express();

router.get('/adminDetails', getAdminDetails);

router.get('/getCourse', getCourseList);

router.post("/createDepartment", postCreateDepartment);

router.post("/createCourse", postCreateCourse);

router.post("/studentDetailsEntry", postStudentDetails);

router.post("/teacherDetailsEntry", postTeacherDetails);

router.post("/createOfferCourse", postOfferCourse);

router.post("/assignCourse", assignCourseTeacher);

router.get('/adminApproval', getControllerApprovalDetails);

router.put('/adminApproval', putAdminApproval);

router.put('/adminstrator_signup', adminSignUp);

router.post('/admin_login', adminLogin);

module.exports = router;