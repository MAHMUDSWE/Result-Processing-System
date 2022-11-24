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
    getTeacherDetails,
    putTeacherApproval,
    getTeacherApprovalDetails,
    getTabulationSheet,
    getAllAssignedCourseList,
    recoverPassword,
    changePassword
} = require('../controllers/teacher.controller');

const router = express();

router.get('/teacherDetails', getTeacherDetails);

router.get('/assignedCourse', getAssignedCourseList);

router.get('/allAssignedCourse', getAllAssignedCourseList);

router.get('/takenCourse', getTakenCourseStudentList);

router.post('/courseEvaluationMarkEntry', postCourseEvaluationMarkEntry);

router.post('/labFinalMarkEntry', postLabFinalMarkEntry);

router.put('/partAMarkEntry', putPartAMark);

router.put('/partBMarkEntry', putPartBMark);

router.get('/courseWiseAttendaceAndEvaluation', getCourseWiseAttendaceAndEvaluation);

router.get('/labCourseFinalMarkList', getLabCourseFinalMarkList);

router.get('/theoryCourseFinalMarkList', getTheoryCourseFinalMarkList);

router.get('/teacherApproval', getTeacherApprovalDetails);

router.put('/teacherApproval', putTeacherApproval);

router.get('/tabulationSheet', getTabulationSheet);

router.put('/teacher_recover', recoverPassword);

router.put('/teacher_changePassword', changePassword);

router.put('/teacher_signup', teacherSignUp);

router.post('/teacher_login', teacherLogin)


module.exports = router;