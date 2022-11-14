import React, { useState } from "react";
import axios from "axios";
import { TeacherNavbar } from "../../components/navbar";
import "./style/courseEvaluationEntry.css";

export default function CourseEvaluationEntry() {
  var department = "Institute of Information and Communication Technology";

  var degreeName = "Bachelor of Science(Engineering)";

  const [disabledButton, setDisabledButton] = useState(false);

  const [inputs, setInputs] = useState({});

  const [inputCourse, setInputCourse] = useState({});

  const [listOfAssignedCourses, setListOfAssignedCourses] = useState([{}]);

  const [open, setOpen] = useState(false);

  const [listOfStudent, setListOfStudent] = useState([{}]);

  const [totalClass, setTotalClass] = useState();

  // const [markInput, setMarkInput] = useState([{

  //   class_attendance: '',
  //   term_test: '',
  //   class_assessment: ''
  // }]);

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

  const handleChangeMark = (event, key) => {
    // const name = event.target.name;
    // const value = event.target.value;
    // console.log(key);

    // setMarkInput((values) => ({ ...values, [name]: value }));
    const { name, value } = event.target;

    if (name === 'term_test' && (value > 20 || value < 0)) {
      alert("Value must be between 0-20");
    }
    else if (name === 'class_assessment' && (value > 10 || value < 0)) {
      alert("Value must be between 0-10");
    }
    else if (name === 'class_attendance' && (value > Number(totalClass) || value < 0)) {
      alert(`Value must be between 0-${totalClass}.`);
    }
    else {
      const list = [...listOfStudent];
      list[key][name] = value;
      setListOfStudent(list);
    }
  }

  const handleChangeTotalClass = (event) => {
    setTotalClass(event.target.value);
  }

  const getAssignedCourseList = (event) => {
    event.preventDefault();

    listOfAssignedCourses.splice(0, listOfAssignedCourses.length);
    setListOfAssignedCourses([{}]);

    setDisabledButton(true);

    axios.get("/assignedCourse", {
      params: {
        ...inputs,
        // teacher_id: 1
      }
    })
      .then((res) => res.data)
      .then((data) => {
        if (data.rows.length === 0) {
          alert("Course not found!")
        }
        else {
          data.rows.filter((values) => values.part !== 'B').map((item) => {
            return listOfAssignedCourses.push(item)
          })
          setListOfAssignedCourses(listOfAssignedCourses);
          console.log(listOfAssignedCourses);
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

  const getCourseTakenStudentList = (event) => {
    event.preventDefault();
    listOfStudent.splice(0, listOfStudent.length);
    setListOfStudent([{}]);

    // markInput.splice(0, markInput.length);
    // setMarkInput([{}]);

    var { course_id, semester, session } = inputCourse;

    axios.get("/takenCourse", {
      params: {
        course_id, semester, session
      }
    })
      .then((res) => res.data)
      .then((data) => {
        if (data.rows.length === 0) {
          alert("Student not found!")
        }
        else {
          data.rows.map((item) => {
            return listOfStudent.push({
              ...item,
              class_attendance: '',
              term_test: '',
              class_assessment: ''
            })
          })
          setListOfStudent(listOfStudent);

          // data.rows.map((item) => {
          //   return markInput.push({
          //     ...item,
          //     class_attendance: '',
          //     term_test: '',
          //     class_assessment: ''
          //   })
          // })
          // setMarkInput(markInput);

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

  const postCourseEvaluationMarkEntry = (event) => {
    event.preventDefault();
    // console.log({
    //   inputs: [...listOfStudent],
    //   teacher_id: 2,
    //   total_class: totalClass
    // });

    if (!window.confirm("Are you sure to submit?")) {
      return;
    }

    axios.post("/courseEvaluationMarkEntry", {
      inputs: [...listOfStudent],
      teacher_id: 1,
      total_class: totalClass
    })
      .then(res => res.data)
      .then(data => {
        alert(data.message);
        console.log(data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          alert(error.response.data.message);
          console.log(error);
        }
        else if (error.response.status === 400) {
          if (error.response.data.err.code === "ER_DUP_ENTRY") {
            alert("Already Entered");
          }
          else {
            alert(error.response.data.message);
            console.log(error);
          }
        }
        else {
          console.log(error);
        }
      })
  }

  return (
    <div>
      <TeacherNavbar />

      <div className="CourseEvaluationEntry-container">
        <div className="CourseEvaluationEntry-heading">
          <h3>Course Evaluation Mark Entry</h3>
        </div>
        {open ? (
          <div>
            <div className="Profile-info-container">
              <div className="container1">
                <p>Course ID: {inputCourse.course_id}</p>
                <p>Course Title: {inputCourse.course_title}</p>
              </div>
              <div className="container2">
                <p>Semester: {inputCourse.semester}</p>
                <p>Session: {inputCourse.session}</p>
              </div>
              <div className="container3">
                <p>Department: {department}</p>
                <p>Degree Name: {degreeName}</p>
              </div>
            </div>

            <form onSubmit={postCourseEvaluationMarkEntry}>
              <table className="table1">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Registration No.</th>
                    <th>Student's Name</th>
                    <th>Total Class</th>
                    <th>Present in Class</th>
                    <th>Mid-Semester-Mark</th>
                    <th>Evaluation Mark</th>
                  </tr>
                </thead>
                <tbody>
                  {listOfStudent.filter((values) => values.course_id !== undefined).map((item, key) => (

                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item.reg_no}</td>
                      <td>{item.std_name}</td>
                      <td>
                        <input
                          type="numeric"
                          name="total_class"
                          value={totalClass || ''}
                          required
                          onChange={(event) => { handleChangeTotalClass(event) }}
                        />
                      </td>
                      <td>
                        <input
                          type="numeric"
                          name="class_attendance"
                          value={item.class_attendance || ''}
                          required
                          onChange={(event) => { handleChangeMark(event, key) }}
                        />
                      </td>
                      <td>
                        <input
                          type="numeric"
                          name="term_test"
                          value={item.term_test || ''}
                          required
                          onChange={(event) => { handleChangeMark(event, key) }}
                        />
                      </td>
                      <td>
                        <input
                          type="numeric"
                          name="class_assessment"
                          value={item.class_assessment || ''}
                          required
                          onChange={(event) => { handleChangeMark(event, key) }}
                        />
                      </td>
                    </tr>
                  )
                  )}
                </tbody>
              </table>
              <button>Draft</button> <button>Submit</button>
            </form>
          </div>
        ) : (<div>

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

          <form onSubmit={getCourseTakenStudentList}>
            <div>
              <select name="course_title" onChange={handleInputCourse}>
                <option value="">List of Assigned Courses</option>
                {listOfAssignedCourses.filter((values) => (values.course_type === 'Theory' && values.course_id !== undefined)).map((item, key) => (
                  <option key={key} value={item.course_id}>{item.course_title}</option>
                )
                )}
              </select>
            </div>
            <button className="button">Submit</button>
          </form>
        </div>
        )}
      </div>
    </div>
  );
}
