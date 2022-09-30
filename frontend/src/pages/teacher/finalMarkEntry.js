import React, { useState } from "react";
import axios from "axios";
import { TeacherNavbar } from "../../components/navbar";
import "./style/courseEvaluationEntry.css";

export default function FinalMarkEntry() {
  var courseId = "SWE327";
  var courseTitle = "Database Management System";
  var department = "Institute of Information and Communication Technology";

  var degreeName = "Bachelor of Science(Engineering)";
  var session = "2018-2019";
  var semester = "5th";

  const [inputs, setInputs] = useState({});
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    setOpen(true);

    axios
      .post("/createCourse", inputs)
      .then((res) => res.data)
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div>
      <TeacherNavbar />

      <div className="CourseEvaluationEntry-container">
        <div className="CourseEvaluationEntry-heading">
          <h3>Final Mark Entry</h3>
        </div>
        {open ? (
          <div>
            <div className="Profile-info-container">
              <div className="container1">
                <p>Course ID: {courseId}</p>
                <p>Course Title: {courseTitle}</p>
              </div>
              <div className="container2">
                <p>Semester: {semester}</p>
                <p>Session: {session}</p>
              </div>
              <div className="container3">
                <p>Department: {department}</p>
                <p>Degree Name: {degreeName}</p>
              </div>
            </div>

            <form>
              <table>
                <tr>
                  <th>SL</th>
                  <th>Registration No.</th>
                  <th>Student's Name</th>
                  <th>Part A</th>
                  <th>Part B</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2018831056</td>
                  <td>Abir Ahmed Sohan</td>
                  <td>
                    <input type="numeric" />
                  </td>
                  <td>
                    <input type="numeric" />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>2018831067</td>
                  <td>Abu Salman Hossain</td>
                  <td>
                    <input type="numeric" />
                  </td>
                  <td>
                    <input type="numeric" />
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>2018831069</td>
                  <td>MD Mahmudur Rahman</td>
                  <td>
                    <input type="numeric" />
                  </td>
                  <td>
                    <input type="numeric" />
                  </td>
                </tr>
              </table>
              <button>Draft</button> <button>Submit</button>
            </form>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <select name="course_type" required onChange={handleChange}>
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
              <select name="course_type" required onChange={handleChange}>
                <option value="">List of Assigned Courses</option>
                <option value="Database Management">Database Management</option>
                <option value="Lab">Theory of Computation</option>
              </select>
            </div>
            <button>Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}
