import React, { useState } from 'react'
import { AdminNavbar } from '../../components/navbar'

export default function CreateCourse() {

    const [inputs, setInputs] = useState({});
//-------
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <AdminNavbar />

            <div className=''>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="course_id"
                            value={inputs.course_id || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            required pattern="[a-z A-Z]+"
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
                            placeholder="course credits"
                            
                        />
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}
