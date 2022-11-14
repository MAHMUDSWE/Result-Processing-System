import React, { useEffect, useState } from "react";
import axios from "axios";
import { TeacherNavbar } from "../../components/navbar";
import "./style/course_report_total_mark.css";
import { PaginatedItemsEvaluationMark, PaginatedItemsTotalMarkLab } from "./pagination";

export default function CourseReportTotalMark() {

    const [disabledButton, setDisabledButton] = useState(false);

    const [inputs, setInputs] = useState({});

    const [inputCourse, setInputCourse] = useState({});

    const [listOfAssignedCourses, setListOfAssignedCourses] = useState([{}]);

    const [open, setOpen] = useState(false);

    const [openTheory, setOpenTheory] = useState(false);

    const [listOfStudent, setListOfStudent] = useState([{}]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleInputCourse = (event) => {
        const value = event.target.value;
        var filteredCourse = listOfAssignedCourses.filter((values) => values.course_id === value)[0];
        setInputCourse(filteredCourse);
    }

    const [teacherName, setTeacherName] = useState();

    useEffect(() => {
        axios('/teacherDetails')
            .then(res => res.data)
            .then(data => {
                setTeacherName(data.rows[0].teacher_name);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const getAssignedCourseList = (event) => {
        event.preventDefault();

        listOfAssignedCourses.splice(0, listOfAssignedCourses.length);
        setListOfAssignedCourses([{}]);

        setDisabledButton(true);

        axios.get("/assignedCourse", {
            params: {
                ...inputs,
                // teacher_id: 2
            }
        })
            .then((res) => res.data)
            .then((data) => {
                if (data.rows.length === 0) {
                    alert("Course not found!")
                }
                else {
                    console.log(data.rows);
                    data.rows.map((item) => {
                        return listOfAssignedCourses.push(item)
                    })
                    setListOfAssignedCourses(listOfAssignedCourses);

                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.log(error.response.data.message);
                } else {
                    console.log(error);
                }
            });
    }

    const getCourseMarksInformation = (event) => {
        event.preventDefault();
        listOfStudent.splice(0, listOfStudent.length);
        setListOfStudent([{}]);

        var { course_id, course_type, semester, session } = inputCourse;

        var endPoint;
        if (course_type === "Theory") {
            endPoint = "courseWiseAttendaceAndEvaluation";
        }
        else {
            endPoint = "labCourseFinalMarkList";
        }

        axios.get(`/${endPoint}`, {
            params: {
                course_id, semester, session
            }
        })
            .then((res) => res.data)
            .then((data) => {

                console.log(data.rows);

                if (data.rows.length === 0) {
                    alert("Student not found!")
                }
                else {
                    data.rows.map((item) => {
                        return listOfStudent.push(item);
                    })
                    setListOfStudent(listOfStudent);

                    if (inputCourse.course_type === "Theory") {
                        setOpenTheory(true);
                    }
                    setOpen(true);
                    console.log(listOfStudent);
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.log(error.response.data.message);
                } else {
                    console.log(error);
                }
            });
    }

    return (
        <div>
            {/* <TeacherNavbar /> */}

            {/* <div className="CourseEvaluationEntry-container">
                <div className="CourseEvaluationEntry-heading">
                    <h3>Course Report Mark Wise</h3>
                </div> */}
            {open ? (
                <div>

                    <div className="CourseReportTotalMark-container">
                        <div>

                            {openTheory ? (
                                <div>
                                    <div className="CourseEvaluationEntry-heading">
                                        <h3>Course Wise Evaluation Mark</h3>
                                    </div>

                                    <div className="Profile-info-container">
                                        <table className="table2">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Course ID</td>
                                                    <td>: {inputCourse.course_id}</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Course Title</td>
                                                    <td>: {inputCourse.course_title}</td>
                                                </tr>
                                                <tr>
                                                    <td>Semester</td>
                                                    <td>: {inputCourse.semester}</td>
                                                    <td>Session</td>
                                                    <td>: {inputCourse.session}</td>
                                                </tr>
                                                <tr>
                                                    <td>No of Class</td>
                                                    <td>: {listOfStudent[0].total_class}</td>

                                                </tr>
                                                <tr>
                                                    <td>Mid-Semester Mark</td>
                                                    <td>: 20</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* <table className="table1">
                                        <thead>
                                            <tr>
                                                <th>SL</th>
                                                <th>Registration No.</th>
                                                <th>Student's Name</th>
                                                <th>Present in Class</th>
                                                <th>Mid-Semester Mark(Obtained)</th>
                                                <th>Evaluation Mark</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listOfStudent.filter((values) => values.course_id !== undefined).map((item, key) => (

                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    <td>{item.reg_no}</td>
                                                    <td>{item.std_name}</td>
                                                    <td>{item.class_attendance}</td>
                                                    <td>{item.term_test}</td>
                                                    <td>{item.class_assessment}</td>
                                                </tr>
                                            )
                                            )}

                                        </tbody>
                                    </table> */}

                                    <PaginatedItemsEvaluationMark itemsPerPage={20} listOfStudent={listOfStudent} teacherName={teacherName} />
                                </div>
                            ) : (<div>
                                <div className="CourseEvaluationEntry-heading">
                                    <h3>Course Wise Marks Information</h3>
                                </div>

                                <div className="Profile-info-container">
                                    <table className="table2">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Course ID</td>
                                                <td>: {inputCourse.course_id}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Course Title</td>
                                                <td>: {inputCourse.course_title}</td>
                                            </tr>
                                            <tr>
                                                <td>Semester</td>
                                                <td>: {inputCourse.semester}</td>
                                                <td>Session</td>
                                                <td>: {inputCourse.session}</td>
                                            </tr>

                                            <tr>
                                                <td>Exam Marks</td>
                                                <td>: 100</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* <table className="table1">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Registration No.</th>
                                            <th>Student's Name</th>
                                            <th>Total Mark</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listOfStudent.filter((values) => values.course_id !== undefined).map((item, key) => (

                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.reg_no}</td>
                                                <td>{item.std_name}</td>
                                                <td>{item.total_mark}</td>
                                            </tr>
                                        )
                                        )}
                                    </tbody>
                                </table> */}

                                <PaginatedItemsTotalMarkLab itemsPerPage={20} listOfStudent={listOfStudent} />
                            </div>)}
                        </div>
                    </div>
                </div>
            )
                : (

                    (<div>
                        <TeacherNavbar />

                        <div className="CourseEvaluationEntry-container">
                            <div className="CourseEvaluationEntry-heading">
                                <h3>Course Report Mark Wise</h3>
                            </div>
                            <div>
                                <form onSubmit={getAssignedCourseList}>
                                    <div>
                                        <select
                                            name="USN"
                                            required onChange={handleChange}
                                            onClick={() => {
                                                setDisabledButton(false);
                                            }}
                                        >
                                            <option value="">USN</option>
                                            <option value="2020-1">2020-1</option>
                                            <option value="2020-2">2020-2</option>
                                            <option value="2021-1">2021-1</option>
                                            <option value="2021-2">2021-2</option>
                                            <option value="2022-1">2022-1</option>
                                            <option value="2022-2">2022-2</option>
                                            <option value="2023-1">2023-1</option>
                                            <option value="2023-2">2023-2</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            name="semester"
                                            required onChange={handleChange}
                                            onClick={() => {
                                                setDisabledButton(false);
                                            }}
                                        >
                                            <option value="">Semester</option>
                                            <option value="1st">1st</option>
                                            <option value="2nd">2nd</option>
                                            <option value="3rd">3rd</option>
                                            <option value="4th">4th</option>
                                            <option value="5th">5th</option>
                                            <option value="6th">6th</option>
                                            <option value="7th">7th</option>
                                            <option value="8th">8th</option>
                                        </select>
                                    </div>
                                    <button className={`button1 ${disabledButton === true && "disabled"}`}>Get Assigned Courses List</button>
                                </form>

                                <form onSubmit={getCourseMarksInformation}>
                                    <div>
                                        <select name="course_title" onChange={handleInputCourse}>
                                            <option value="">List of Assigned Courses</option>
                                            {listOfAssignedCourses.filter((values) => {
                                                if (values.course_id === undefined || values.part === "B") {
                                                    return false;
                                                }
                                                else {
                                                    return true;
                                                }
                                            }).map((item, key) => (
                                                <option key={key} value={item.course_id}>{item.course_title}</option>
                                            )
                                            )}
                                        </select>
                                    </div>

                                    {/* <div>
                                    <select name='report_type' required onChange={handleReportType}>
                                        <option value="" >Report Type</option>

                                        {inputCourse.course_type === "Theory" ? (
                                            <option value="courseEvaluation">Course Wise Evaluation Mark</option>
                                        )
                                            : (<div></div>)}

                                        {inputCourse.course_type === "Lab" ? (
                                            <option value="labMark">Lab Mark</option>
                                        )
                                            : (<div></div>)}

                                    </select>
                                </div> */}
                                    <button className="button">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    )
                )
            }
            {/* </div> */}
        </div>
    );
}
