import axios from "axios";
import React, { useState } from "react";
import { AdminNavbar } from "../../components/navbar";
import { PaginatedItemsAdminApproval } from "./pagination";
import "./style/course_registrationApproval.css";

export default function AdminCourseRegistrationApproval() {
    var department = "Institute of Information and Communication Technology";

    var degreeName = "Bachelor of Science(Engineering)";

    const [inputs, setInputs] = useState({});

    const [open, setOpen] = useState(false);

    const [listOfStudent, setListOfStudent] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const getStudentList = (event) => {
        event.preventDefault();
        // listOfStudent.splice(0, listOfStudent.length);
        // setListOfStudent([{}]);

        console.log(inputs);

        axios.get(`/adminApproval`, {
            params: {
                semester: inputs.semester,
                usn: inputs.usn,
                dept_id: inputs.dept_id
            }
        })
            .then((res) => res.data)
            .then((data) => {

                console.log(data.rows);

                if (data.rows.length === 0) {
                    alert("Student not found!")
                }
                else {
                    // data.rows.map((item) => {
                    //     return listOfStudent.push(item);
                    // })
                    const list = [...data.rows]
                    console.log(list);
                    setListOfStudent(list);

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
            {open ? (
                <div>
                    <AdminNavbar />
                    <div className="CourseReportTotalMark-container">

                        <div>
                            <div className="CourseEvaluationEntry-heading">
                                <h3>Course Registration Approval</h3>
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
                                            <td>Semester</td>
                                            <td>: {listOfStudent[0].semester}</td>
                                            <td>Session</td>
                                            <td>: {listOfStudent[0].session}</td>
                                        </tr>
                                        <tr>
                                            <td>Degree Name</td>
                                            <td>: {degreeName}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Department</td>
                                            <td>: {department}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <PaginatedItemsAdminApproval itemsPerPage={20} listOfStudentProps={listOfStudent} />
                        </div>
                    </div>
                </div>
            )

                : (
                    (
                        <div>
                            <AdminNavbar />

                            <div className="CourseEvaluationEntry-container">
                                <div className="CourseEvaluationEntry-heading">
                                    <h3>Course Registration Approval</h3>
                                </div>
                                <div>
                                    <form onSubmit={getStudentList}>
                                        <div>
                                            <select
                                                name="usn"
                                                required onChange={handleChange}
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
                                        <div>
                                            <select
                                                name="dept_id"
                                                required onChange={handleChange}
                                            >
                                                <option value="">Department</option>
                                                <option value="100">SWE</option>
                                                <option value="101">EEE</option>
                                            </select>
                                        </div>
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
