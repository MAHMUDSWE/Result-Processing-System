import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import './style/teacher_profile.css'

export default function TeacherProfile() {

    const [teacherDetails, setTeacherDetails] = useState({});

    useEffect(() => {
        axios.get('teacherDetails')
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setTeacherDetails(data.rows[0]);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div>
            <Navbar />
            <div className='Profile-section'>

                <div className='Profile-info-container'>
                    <div className='container1'>
                        <table className='table3'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Teacher Name</td>
                                    <td>: {teacherDetails.teacher_name}</td>
                                </tr>
                                <tr>
                                    <td>Teacher ID</td>
                                    <td>: {teacherDetails.teacher_id}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>: {teacherDetails.teacher_email}</td>
                                </tr>
                                <tr>
                                    <td>Department</td>
                                    <td>: {teacherDetails.dept_name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='ChangePassword-container'>
                    <button>Change Password</button>
                </div>
            </div>
        </div>
    )
}
