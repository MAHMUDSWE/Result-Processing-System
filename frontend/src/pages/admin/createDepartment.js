import axios from 'axios';
import React, { useState } from 'react'
import { AdminNavbar } from '../../components/navbar'
import './style/create_course.css'

export default function CreateDepartment() {

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

        axios.post("/createDepartment", inputs)
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setMessage(data.message)
                setStatusCode(200);
                setOpen(true);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    // console.log(error.response.data.message);
                    setMessage(error);
                    setOpen(true);
                }
                else if (error.response.status === 400) {
                    console.log(error);
                    setMessage(error.response.data.message);
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
                    <h3>Create Department</h3>
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
                            Create Course</button>
                    </div>
                    : <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="dept_id"
                                value={inputs.dept_id || ""}
                                onChange={handleChange}
                                autoComplete="off"
                                required pattern="[a-z A-Z 0-9]+"
                                placeholder="department id"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="dept_name"
                                value={inputs.dept_name || ""}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                placeholder="department name"

                            />
                        </div>
                        <button>Submit</button>
                    </form>}
            </div>
        </div>
    )
}
