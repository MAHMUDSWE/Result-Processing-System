import React, { useState } from 'react';
import axios from 'axios';
import HeaderSection from '../components/header';
import "./style/signup.css";
import { Link } from 'react-router-dom';


export default function RecoverPassword() {

    const [inputs, setInputs] = useState({
        showPassword: false
    });
    const [message, setMessage] = useState('');
    const [isSignUpSuccess, setIsSignupSuccess] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleClickShowPassword = () => {
        setInputs({ ...inputs, showPassword: !inputs.showPassword });
    };

    const handleSearchUsername = (event) => {
        event.preventDefault();
        setOpenPassword(true);
        console.log(inputs);
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        let { username, password, confirm_password, registerAs } = inputs;
        let endPoint;
        if (registerAs === 'student') {
            endPoint = 'student_recover';
        }
        else if (registerAs === 'teacher') {
            endPoint = 'teacher_recover';
        }
        else if (registerAs === 'adminstrator') {
            endPoint = 'adminstrator_recover';
        }
        console.log(endPoint);
        console.log(inputs);

        axios.put(`/${endPoint}`, {
            username, password, confirm_password
        })
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setMessage(data.message);
                setIsSignupSuccess(true);
            })
            .catch(error => {
                if (error.response.status === 409) {
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
        <div className='Student-login-section'>
            <div>
                <HeaderSection />
            </div>

            {isSignUpSuccess ?
                (<div className='Student-signup-container'>
                    <h3>{message}</h3>
                    <Link to="/">Go to log in page......</Link>
                </div>)
                : (<div className='Student-signup-container'>

                    <form onSubmit={handleSubmit}>
                        <div className='selectRole'>
                            <p>Recover password  <select required name='registerAs' onChange={handleChange}>
                                <option value=''> recover as</option>
                                <option value='student'>Student</option>
                                <option value='teacher'>Teacher</option>
                                <option value='adminstrator'>Exam Controller</option>
                            </select>
                            </p>
                        </div>
                        {openPassword ? (<div>
                            <input
                                type={inputs.showPassword ? "text" : "password"}
                                name='password'
                                value={inputs.password || ""}
                                onChange={handleChange}
                                autoComplete="off"
                                required placeholder="Set new password"
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
                            <button>recover</button>
                        </div>) : (<div>
                            <input
                                className='input1'
                                type="text"
                                name='username'
                                value={inputs.username || ""}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Search Username"
                                required pattern="[a-z A-Z 0-9]+"
                            />
                            <button onClick={handleSearchUsername}>Search</button>
                        </div>)
                        }

                        <span style={{ color: 'red' }}>{message}</span>
                    </form>
                </div>)}
        </div>
    )
}
