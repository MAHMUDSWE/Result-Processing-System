import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import HeaderSection from '../../components/header'
import "./style/teacher_login.css"

export default function TeacherLogin() {

    const [inputs, setInputs] = useState({
        showPassword: false
    });
    let [logMessage, setLogMessage] = useState("");
    let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("teacherIsLoggedIn"));

    const logHandleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleClickShowPassword = () => {
        setInputs({ ...inputs, showPassword: !inputs.showPassword });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let { username, password } = inputs;

        console.log(inputs);
        axios.post('/teacher_login', {
            teacher_id: username,
            password
        })
            .then(res => res.data)
            .then(data => {
                console.log(data);
                localStorage.setItem("access_token", data.access_token);
                setLogMessage(data.message);
                localStorage.setItem("teacherIsLoggedIn", "true");
                setIsLoggedIn(localStorage.getItem("teacherIsLoggedIn"));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setLogMessage(error.response.data.message);
                }
                else if (error.response.status === 400) {
                    setLogMessage(error.response.data.message);
                }
                else {
                    setLogMessage("Internal Server Error!");
                }

            })
    }
    return (
        <div className='Student-login-section'>
            <div>
                <HeaderSection />
            </div>

            <div className='Teacher-login-container'>
                <p>Teacher Login</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name='username'
                        value={inputs.username || ""}
                        onChange={logHandleChange}
                        autoComplete="off"
                        placeholder="Username"
                        required pattern="[a-z A-Z 0-9]+" />
                    <input
                        type={inputs.showPassword ? "text" : "password"}
                        name='password'
                        value={inputs.password || ""}
                        onChange={logHandleChange}
                        autoComplete="off"
                        required placeholder="Password" />

                    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        <span className='toggle'> <input
                            type="checkbox"
                            onClick={handleClickShowPassword}
                        /> Show Password</span>
                    </div>
                    <span style={{ color: 'red' }}>{logMessage}</span>
                    <button>Log In</button>
                    <Link to='/recover'>Forgot your password?</Link>
                    {isLoggedIn ? <Navigate to='/teacher_workspace' replace /> : <h3> </h3>}
                </form>
            </div>
        </div>
    )
}
