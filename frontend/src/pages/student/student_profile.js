import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import './style/student_profile.css'

import {
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Dialog,
    Button
} from '@mui/material';
import ChangePassword from '../changePassword';

export default function StudentProfile() {

    const [studentDetails, setStudentDetails] = useState({});
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get('studentDetails')
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setStudentDetails(data.rows[0]);
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
                                    <td>Student Name</td>
                                    <td>: {studentDetails.std_name}</td>
                                </tr>
                                <tr>
                                    <td>Registration No.</td>
                                    <td>: {studentDetails.reg_no}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>: {studentDetails.std_email}</td>
                                </tr>
                                <tr>
                                    <td>Department</td>
                                    <td>: {studentDetails.dept_name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='ChangePassword-container'>
                    <button className='editProfileButton'
                        onClick={handleClickOpen}>Change Password</button>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                            {/* Change Password */}
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText>
                                <ChangePassword role={"student"} />
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
