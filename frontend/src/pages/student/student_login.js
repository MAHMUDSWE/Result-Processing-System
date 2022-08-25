import React, { useState } from 'react'
import HeaderSection from '../../components/header'
import "./style/student_login.css"

export default function StudentLogin() {
    const [loginputs, setLogInputs] = useState({});

    const logHandleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLogInputs(values => ({ ...values, [name]: value }))
    }
    return (
        <div className='Student-login-section'>
            <div>
                <HeaderSection />
            </div>

            <div className='Student-login-container'>
                <p>Student Login</p>
                <form >
                    <input
                        type="text"
                        name='username'
                        value={loginputs.username || ""}
                        onChange={logHandleChange}
                        autoComplete="off"
                        placeholder="Username"
                        required pattern="[a-z A-Z 0-9]+" />
                    <input
                        type="password"
                        name='password'
                        value={loginputs.password || ""}
                        onChange={logHandleChange}
                        autoComplete="off"
                        required placeholder="Password" />
                    <button>Log In</button>

                    <a href="#">Forgot your password?</a>
                </form>
            </div>
        </div>
    )
}
