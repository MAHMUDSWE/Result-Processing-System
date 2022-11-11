const express = require('express');
const {
    getStudentDetails,
    getCourseOfferList,
    getDropCourseList,
    postRegisterCourse,
    studentSignUp,
    studentLogin
} = require('../controllers/student.controller');

const router = express();

router.get('/studentDetails', getStudentDetails);

router.get('/courseOfferList', getCourseOfferList);

router.get('/dropCourseList', getDropCourseList);

router.post('/registerCourse', postRegisterCourse);

router.put('/student_signup', studentSignUp);

router.post('/student_login', studentLogin);


module.exports = router;