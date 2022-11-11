import axios from 'axios';
import React, { useState } from 'react'
import { AdminNavbar } from '../../components/navbar'
import './style/assign_course.css'

export default function AssignCourse() {

    const [inputs, setInputs] = useState({});
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [statusCode, setStatusCode] = useState();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        // console.log(value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);


        axios.post("/assignCourse", inputs)
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setMessage(data.message)
                setStatusCode(200);
                setOpen(true);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.log(error.response);

                    setMessage(error);
                    setOpen(true);
                }
                else if (error.response.status === 400) {
                    console.log(error.response.data);
                    if (error.response.data.err.code === 'ER_DUP_ENTRY') {
                        setMessage(`Course teacher for course ${inputs.course_id} is already assigned`);
                    }
                    else {
                        setMessage(error.response.data.message);
                    }
                    setStatusCode(400);
                    setOpen(true);

                }
                else {
                    // console.log(error.response.data);
                    setMessage(error.message);
                    setOpen(true);
                }
            })
    }

    return (
        <div>
            <AdminNavbar />

            <div className='createCourse-container'>
                <div className='createCourse-heading'>
                    <h3>Assign Courses</h3>
                </div>
                {open ?
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
                                }
                            }}
                        >
                            Assign Course Teacher</button>
                    </div>
                    : <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="teacher_id"
                                value={inputs.teacher_id || ""}
                                onChange={handleChange}
                                autoComplete="off"
                                required pattern="[a-z A-Z 0-9]+"
                                placeholder="teacher id"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="course_id"
                                value={inputs.course_id || ""}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                placeholder="course id"

                            />
                        </div>
                        <div className='selectInAssign'>
                            <select name='part' required onChange={handleChange}>
                                <option selected value=''>Role</option>
                                <option value='A'>Course Teacher</option>
                                <option value='B'>Second Teacher</option>
                            </select>
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
                        <button>Submit</button>
                    </form>}
            </div>
        </div>
    )
}
