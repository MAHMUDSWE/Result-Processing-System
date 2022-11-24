import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import "./style/signup.css";


export default function ChangePassword({ role }) {

    const [changed, setChanged] = useState(false);

    const [inputs, setInputs] = useState({
        showPassword: false
    });
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleClickShowPassword = () => {
        setInputs({ ...inputs, showPassword: !inputs.showPassword });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let { old_password, password, confirm_password } = inputs;
        let endPoint;
        if (role === 'student') {
            endPoint = 'student_changepassword';
        }
        else if (role === 'teacher') {
            endPoint = 'teacher_changepassword';
        }
        else if (role === 'adminstrator') {
            endPoint = 'adminstrator_changepassword';
        }
        console.log(endPoint);
        console.log(old_password, password, confirm_password)
        axios.put(`/${endPoint}`, {
            old_password, password, confirm_password
        })
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setMessage(data.message);
                alert(data.message);
                setChanged(true);
            })
            .catch(error => {
                if (error.response.status === 409) {
                    alert(error.response.data.message);
                    console.log(error.response.data.message);
                    setMessage(error.response.data.message);
                }
                else if (error.response.status === 400) {
                    console.log(error.response.data.message);
                    setMessage(error.response.data.message);
                }
                else if (error.response.status === 401) {
                    console.log(error.response.data.message);
                    setMessage(error.response.data.message);
                }
            });
    }

    return (
        // <div className='Student-login-section'>

        <div className='Student-signup-container'>

            <form onSubmit={handleSubmit}>
                <div className='selectRole'>
                    <p> Change Password
                    </p>
                </div>
                <input
                    // className='input1'
                    type={inputs.showPassword ? "text" : "password"}
                    name='old_password'
                    value={inputs.old_password || ""}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="old password"
                    required pattern="[a-z A-Z 0-9]+"
                />
                <input
                    type={inputs.showPassword ? "text" : "password"}
                    name='password'
                    value={inputs.password || ""}
                    onChange={handleChange}
                    autoComplete="off"
                    required placeholder="new password"
                />
                <input
                    type={inputs.showPassword ? "text" : "password"}
                    name='confirm_password'
                    value={inputs.confirm_password || ""}
                    onChange={handleChange}
                    autoComplete="off"
                    required placeholder="Confirm new password"
                />
                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <span className='toggle'> <input
                        type="checkbox"
                        onClick={handleClickShowPassword}
                    /> Show Password</span>
                </div>
                <span style={{ color: 'red' }}>{message}</span>
                {(role === 'student' && changed === true) && <Navigate to='/student_workspace' replace />}
                {(role === 'teacher' && changed === true) && <Navigate to='/teacher_workspace' replace />}
                {(role === 'adminstrator' && changed === true) && <Navigate to='/admin_workspace' replace />}
                <button>Change</button>
            </form>
        </div>

        // </div>
    )
}
