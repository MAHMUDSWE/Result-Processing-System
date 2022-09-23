const express = require("express");
const { postCreateCourse, postStudentDetails } = require("../controllers/admin.controller");

const router = express();


router.post("/createCourse", postCreateCourse);

router.post("/studentDetailsEntry", postStudentDetails);

module.exports = router;