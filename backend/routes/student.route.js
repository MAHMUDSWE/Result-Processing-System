const express = require('express');
const {
    getStudentDetails,
    getCourseOfferList,
    getDropCourseList,
    postRegisterCourse
} = require('../controllers/student.controller');

const router = express();

router.get('/studentDetails', getStudentDetails);

router.get('/courseOfferList', getCourseOfferList);

router.get('/dropCourseList', getDropCourseList);

router.post('/registerCourse', postRegisterCourse);

module.exports = router;