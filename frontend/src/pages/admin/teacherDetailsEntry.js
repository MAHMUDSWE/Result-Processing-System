import axios from 'axios';
import React, { useState } from 'react'
import { AdminNavbar } from '../../components/navbar'
import "./style/studentDetailsEntry.css"

export default function TeacherDetailsEntry() {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        // console.log(value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        axios.post("/teacherDetailsEntry", inputs)
            .then(res => res.data)
            .then(data => {
                alert(data.message);
                console.log(data.message);
            })
            .catch(error => {
                // if (error.response.status === 401) {
                //     console.log(error.response.data.message);
                // }
                // else {
                //     console.log("Internal Server Error!");
                // }
                if (error.response.data.err.code === 'ER_DUP_ENTRY') {
                    alert(error.response.data.err.sqlMessage);
                }
                else {
                    alert(error.response.data.message);
                    console.log(error.response);
                }
            })
    }

    return (
        <div>
            <AdminNavbar />

            <div className='sde-container'>
                <div className='createCourse-heading'>
                    <h3>Teacher Details Entry </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="teacher_id"
                            value={inputs.teacher_id || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            required pattern="[0-9]+"
                            placeholder="teacher id"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="teacher_name"
                            value={inputs.teacher_name || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                            placeholder="teacher name"

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
                            type="email"
                            name="teacher_email"
                            value={inputs.teacher_email || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                            placeholder="email"

                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="teacher_phone"
                            value={inputs.teacher_phone || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            required pattern="[0-9]+"
                            placeholder="phone no"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="designation"
                            value={inputs.designation || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            required 
                            placeholder="designation"
                        />
                    </div>
                    {/* <div>
                        <input
                            type="text"
                            id='std_address'
                            name="std_address"
                            value={inputs.teacher_address || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                            placeholder='address'
                        />

                        <input
                            type="date"
                            name="std_dateOfBirth"
                            value={inputs.teacher_dateOfBirth || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </div> */}
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}
