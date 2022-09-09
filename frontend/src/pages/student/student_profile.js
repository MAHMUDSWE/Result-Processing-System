import React from 'react'
import Navbar from '../../components/navbar'
import './style/student_profile.css'

export default function StudentProfile() {
    var stdName = "MD Mahmudur Rahman";
    var registrationNumber = "201831069";
    var department = "Institute of Information and Communication Technology";
    var lastAdmittedSemester = "5th Semester"

    var degreeName = "Bachelor of Science(Engineering)";
    var session = "2018-2019";

    return (
        <div>
            <Navbar />
            <div className='Profile-section'>
                <div className='Profile-info-container'>
                    <div className='container1'>
                        <p>Student Name: {stdName}</p>
                        <p>Registration No.: {registrationNumber}</p>
                        <p>Department: {department}</p>
                        <p>Last Admitted Semester: {lastAdmittedSemester}</p>
                    </div>
                    <div className='container2'>
                        <p>Degree Name: {degreeName}</p>
                        <p>Session: {session}</p>
                    </div>
                </div>
                <div className='ChangePassword-container'>
                    <button>Change Password</button>
                </div>
            </div>
        </div>
    )
}
