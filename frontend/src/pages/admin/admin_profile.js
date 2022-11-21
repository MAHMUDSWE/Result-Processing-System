import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AdminNavbar } from '../../components/navbar';
import './style/admin_profile.css';

export default function AdminProfile() {

    const [adminDetails, setAdminDetails] = useState({});

    useEffect(() => {
        axios.get('adminDetails')
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setAdminDetails(data.rows[0]);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div>
            <AdminNavbar />
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
                                    <td>Controller Name</td>
                                    <td>: {adminDetails.admin_name}</td>
                                </tr>
                                <tr>
                                    <td>Registration No.</td>
                                    <td>: {adminDetails.admin_id}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>: {adminDetails.admin_email}</td>
                                </tr>
                                {/* <tr>
                                    <td>Department</td>
                                    <td>: {adminDetails.dept_name}</td>
                                </tr> */}
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
