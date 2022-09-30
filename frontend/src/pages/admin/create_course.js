import axios from 'axios';
import React, { useState } from 'react'
import { AdminNavbar } from '../../components/navbar'
import './style/create_course.css'

export default function CreateCourse() {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        console.log(value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        axios.post("/createCourse", inputs)
            .then(res => res.data)
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.log(error.response.data.message);
                }
                else {
                    console.log(error);
                }
            })
    }

    return (
        <div>
            <AdminNavbar />

            <div className='createCourse-container'>
                <div className='createCourse-heading'>
                    <h3>Create Courses</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="course_id"
                            value={inputs.course_id || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            required pattern="[a-z A-Z 0-9]+"
                            placeholder="course id"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="course_title"
                            value={inputs.course_title || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                            placeholder="course title"

                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="dept_id"
                            value={inputs.dept_id || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                            placeholder="department id"

                        />
                    </div>
                    <div>
                        <input
                            type="numeric"
                            name="course_credits"
                            value={inputs.course_credits || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                            placeholder="course credits"

                        />
                    </div>
                    <div>
                        <select name='course_type' required onChange={handleChange}>
                            <option value="" >Course Type</option>
                            <option value="Theory">Theory</option>
                            <option value="Lab">Lab</option>
                        </select>
                        <select name='course_isMajor' required onChange={handleChange}>
                            <option value="" >Major Or Non-Major</option>
                            <option value="Major">Major</option>
                            <option value="Non-Major">Non-Major</option>
                        </select>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}
