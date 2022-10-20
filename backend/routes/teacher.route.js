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
    getTheoryCourseFinalMarkList
} = require('../controllers/teacher.controller');

const router = express();


router.get('/assignedCourse', getAssignedCourseList);

router.get('/takenCourse', getTakenCourseStudentList);

router.post('/courseEvaluationMarkEntry', postCourseEvaluationMarkEntry);

router.post('/labFinalMarkEntry', postLabFinalMarkEntry);

router.put('/partAMarkEntry', putPartAMark);

router.put('/partBMarkEntry', putPartBMark);

router.get('/courseWiseAttendaceAndEvaluation', getCourseWiseAttendaceAndEvaluation);

router.get('/labCourseFinalMarkList', getLabCourseFinalMarkList);

router.get('/theoryCourseFinalMarkList', getTheoryCourseFinalMarkList);


module.exports = router;