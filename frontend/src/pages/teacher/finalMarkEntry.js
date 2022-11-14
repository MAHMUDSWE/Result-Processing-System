import React, { useState } from "react";
import axios from "axios";
import { TeacherNavbar } from "../../components/navbar";
import "./style/finalMarkEntry.css";

export default function CourseEvaluationEntry() {
  var department = "Institute of Information and Communication Technology";

  var degreeName = "Bachelor of Science(Engineering)";

  const [disabledButton, setDisabledButton] = useState(false);

  const [inputs, setInputs] = useState({});

  const [inputCourse, setInputCourse] = useState({});

  const [listOfAssignedCourses, setListOfAssignedCourses] = useState([{}]);

  const [open, setOpen] = useState(false);

  const [openTheory, setOpenTheory] = useState(false);

  const [listOfStudent, setListOfStudent] = useState([{}]);

  const [part, setPart] = useState('');

  const [endPoint, setEndPoint] = useState('');

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

    const { name, value } = event.target;

    if (name === 'part' && (value > 30 || value < 0)) {
      alert("Value must be between 0-30");
    }

    else if (name === 'total_mark' && (value > 100 || value < 0)) {
      alert("Value must be between 0-100");
    }
    else {
      const list = [...listOfStudent];
      list[key][name] = value;
      setListOfStudent(list);
    }
  }

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
          console.log(data.rows)
          data.rows.map((item) => {
            return listOfAssignedCourses.push(item)
          })
          setListOfAssignedCourses(listOfAssignedCourses);


          // console.log(listOfAssignedCourses);
          // console.log(courseType);
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

    var { course_id, course_type, semester, session, part } = inputCourse;

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
            if (course_type === "Lab") {
              return listOfStudent.push({
                ...item,
                total_mark: '',
              })
            }
            else if (part === 'A') {
              return listOfStudent.push({
                ...item,
                part: '',
              })
            }
            else {
              return listOfStudent.push({
                ...item,
                part: '',
              })
            }

          })
          setListOfStudent(listOfStudent);

          if (inputCourse.course_type === "Theory") {
            if (inputCourse.part === 'A') {
              setOpenTheory(true);
              setPart("A");
              setEndPoint('partAMarkEntry');
            }
            else {
              setOpenTheory(true);
              setPart("B");
              setEndPoint('partBMarkEntry');
            }
          } else {
            setEndPoint("labFinalMarkEntry");
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

  const postFinalMarkEntry = (event) => {
    event.preventDefault();

    if (!window.confirm("Are you sure to submit?")) {
      return;
    }

    // console.log({
    //   inputs: [...listOfStudent],
    //   teacher_id: 1,
    // });

    if (inputCourse.course_type === "Theory") {
      axios.put(`/${endPoint}`, {
        inputs: [...listOfStudent],
        // teacher_id: 2,
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
    } else {
      axios.post(`/${endPoint}`, {
        inputs: [...listOfStudent],
        // teacher_id: 2,
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
  }

  return (
    <div>
      <TeacherNavbar />

      <div className="CourseEvaluationEntry-container">
        <div className="CourseEvaluationEntry-heading">
          <h3>Final Mark Entry</h3>
        </div>
        {open ? (<div>

          {openTheory ? (
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

              <form onSubmit={postFinalMarkEntry}>
                <table className="table1">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Registration No.</th>
                      <th>Student's Name</th>
                      <th>{part === 'A' ? "Part A" : "Part B"}</th>
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
                            name='part'
                            value={item.part || ''}
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

            <form onSubmit={postFinalMarkEntry}>
              <table className="table1">
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
                      <td>
                        <input
                          type="numeric"
                          name='total_mark'
                          value={item.total_mark || ''}
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
          </div>)}
        </div>)
          : (
            (<div>
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
                    {listOfAssignedCourses.filter((values) => values.course_id !== undefined).map((item, key) => (
                      <option key={key} value={item.course_id}>{item.course_title}</option>
                    )
                    )}
                  </select>
                </div>
                <button className="button">Submit</button>
              </form>
            </div>)
          )
        }
      </div>
    </div>
  );
}
