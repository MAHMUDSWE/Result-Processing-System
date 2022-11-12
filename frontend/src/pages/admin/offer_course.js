import axios from 'axios';
import React, { useState } from 'react'
import { AdminNavbar } from '../../components/navbar'
import './style/offer_course.css'


export default function OfferCourse() {

    let [inputs, setInputs] = useState({});

    const [courseList, setCourseList] = useState([]);



    const [inputCourseId, setInputCourseId] = useState('');
    const [course_id, setCourse_id] = useState([]);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [statusCode, setStatusCode] = useState();

    // useEffect(() => {
    //     setCourse_id(course_id);

    //     return () => {
    //         setCourse_id([])
    //     };
    // }, [])



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'dept_id' && value.length === 3) {
            axios.get('/getCourse', {
                params: {
                    dept_id: value
                }
            })
                .then(res => res.data)
                .then(data => {
                    console.log(data.course_list);
                    setCourseList([...data.course_list]);
                })
                .catch((err) => {
                    console.log(err);
                    alert("Course not found")
                })
        }

        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleChangeCourseId = (event) => {
        setInputCourseId(event.target.value);
    }

    if (inputs.dept_id !== undefined) {
        // console.log(courseList);
    }

    const addCourseId = () => {
        if (inputCourseId !== "") {
            course_id.push(inputCourseId);
            setInputCourseId('');
            console.log(course_id);
        }
        else {
            alert('Course Id can not be null');
        }
    }
    const removeCourseId = (key) => {
        // const filterCourse_id = course_id.filter((id)=>id.course_id!== key);
        const filterCourse_id = course_id.splice(key, 1);
        setCourse_id(course_id);
        console.log(filterCourse_id);
        setInputCourseId(' ');
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (course_id.length === 0) {
            alert("Add at least one Course ID")
        }

        else {
            inputs.course_id = course_id;

            console.log(inputs);
        }
        axios.post("/createOfferCourse", inputs)
            .then(res => res.data)
            .then(data => {
                setMessage(data.message);
                setStatusCode(200);
                setOpen(true);
                console.log(data);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setMessage(error.response.data.message);
                    setStatusCode(400);
                    setOpen(true);
                    console.log(error);
                }
                else if (error.response.status === 400) {

                    setMessage(error.response.data.message);
                    setStatusCode(400);
                    setOpen(true);
                    console.log(error);
                }
                else {
                    console.log(error);
                }
            })
    }

    return (
        <div>
            <AdminNavbar />

            <div className='offerCourse-container'>
                <div className='offerCourse-heading'>
                    <h3>Offer Course</h3>
                </div>
                {/* <form > */}
                {
                    open ?
                        <div>
                            <h3>{message}</h3>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    if (statusCode === 400) {
                                        setInputs(inputs);
                                    }
                                    else {
                                        setInputs({});
                                        setInputCourseId("");
                                        setCourse_id([])
                                    }
                                }}
                            >
                                Create Course</button>
                        </div>
                        : <div>

                            <datalist id='dept_id'>
                                <option value='100'>Software Engineering</option>
                                <option value='101'>Computer Science and Engineering</option>
                                <option value='102'>Electrical and Electronic Engineering</option>
                            </datalist>
                            <div>
                                <input
                                    list='dept_id'
                                    type="text"
                                    name="dept_id"
                                    value={inputs.dept_id || ""}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required
                                    placeholder="department id"

                                />
                            </div>

                            <datalist id='course_id'>
                                {courseList.map((value, key) => {
                                    return (
                                        <option key={key} value={value.course_id}>{value.course_title}</option>
                                    )
                                })}
                            </datalist>

                            <div className='course_id'>
                                <input
                                    list='course_id'
                                    type="text"
                                    name="course_id"
                                    value={inputCourseId || ""}
                                    onChange={handleChangeCourseId}
                                    autoComplete="off"
                                    pattern="[a-z A-Z 0-9]+"
                                    placeholder="course id"
                                />
                                <button className='course_idButton' onClick={addCourseId}>+</button>
                            </div>
                            <div>
                                Course List:
                                {course_id.map((item, key) => (
                                    <div key={key} className='removeCourseId'>
                                        <li name={item} style={{ listStyleType: "none" }} >
                                            {key + 1}: {item}
                                            <button onClick={() => { removeCourseId(key) }}>-</button>
                                        </li>

                                    </div>

                                )
                                )}
                            </div>

                            <div>
                                <select name="semester" required onChange={handleChange}>
                                    <option selected value=''>Semester</option>
                                    <option value='1st'>1st</option>
                                    <option value='2nd'>2nd</option>
                                    <option value='3rd'>3rd</option>
                                    <option value='4th'>4th</option>
                                    <option value='5th'>5th</option>
                                    <option value='6th'>6th</option>
                                    <option value='7th'>7th</option>
                                    <option value='8th'>8th</option>
                                </select>
                                <select name='session' required onChange={handleChange}>
                                    <option selected value=''>Session</option>
                                    <option value='2016-2017'>2016-2017</option>
                                    <option value='2017-2018'>2017-2018</option>
                                    <option value='2018-2019'>2018-2019</option>
                                    <option value='2019-2020'>2019-2020</option>
                                    <option value='2020-2021'>2020-2021</option>
                                    <option value='2021-2022'>2021-2022</option>

                                </select>
                            </div>

                            <div>
                                <select name='usn' required onChange={handleChange}>
                                    <option selected value=''>USN</option>
                                    <option value='2019-1'>2019-1</option>
                                    <option value='2019-2'>2019-2</option>
                                    <option value='2020-1'>2020-1</option>
                                    <option value='2020-2'>2020-2</option>
                                    <option value='2021-1'>2021-1</option>
                                    <option value='2021-2'>2021-2</option>
                                    <option value='2022-1'>2022-1</option>
                                    <option value='2022-2'>2022-2</option>

                                </select>

                                <select name='year' required onChange={handleChange}>
                                    <option selected value="" >Year</option>
                                    <option value="2016">2016</option>
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                </select>
                            </div>
                            <button onClick={handleSubmit}>Submit</button>

                        </div>
                }
            </div>
        </div>
    )
}
