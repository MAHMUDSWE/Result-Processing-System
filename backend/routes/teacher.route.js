const express = require('express');
const {
    getAssignedCourseList,
    getTakenCourseStudentList,
    postCourseEvaluationMarkEntry,
    postLabFinalMarkEntry,
    putPartAMark,
    putPartBMark,
    getCourseWiseAttendaceAndEvaluation,
    getLabCourseFinalMarkList,
    getTheoryCourseFinalMarkList,
    teacherSignUp,
    teacherLogin,
    getTeacherDetails
} = require('../controllers/teacher.controller');

const router = express();

router.get('/teacherDetails', getTeacherDetails);

router.get('/assignedCourse', getAssignedCourseList);

router.get('/takenCourse', getTakenCourseStudentList);

router.post('/courseEvaluationMarkEntry', postCourseEvaluationMarkEntry);

router.post('/labFinalMarkEntry', postLabFinalMarkEntry);

router.put('/partAMarkEntry', putPartAMark);

router.put('/partBMarkEntry', putPartBMark);

router.get('/courseWiseAttendaceAndEvaluation', getCourseWiseAttendaceAndEvaluation);

router.get('/labCourseFinalMarkList', getLabCourseFinalMarkList);

router.get('/theoryCourseFinalMarkList', getTheoryCourseFinalMarkList);

router.put('/teacher_signup', teacherSignUp);

router.post('/teacher_login', teacherLogin)


module.exports = router;