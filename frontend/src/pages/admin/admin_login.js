import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import HeaderSection from '../../components/header'
import "./style/admin_login.css"

export default function AdminLogin() {

  const [inputs, setInputs] = useState({
    showPassword: false
  });
  let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("adminstratorIsLoggedIn"));

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

    localStorage.setItem("adminstratorIsLoggedIn", "true");
    setIsLoggedIn(localStorage.getItem("adminstratorIsLoggedIn"));
  }
  return (
    <div className='Student-login-section'>
      <div>
        <HeaderSection />
      </div>

      <div className='Admin-login-container'>
        <p>Adminstrator Login</p>

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

          <button>Log In</button>
          <Link to='/recover'>Forgot your password?</Link>
          {isLoggedIn ? <Navigate to='/admin_workspace' replace /> : <h3> </h3>}
        </form>
      </div>
    </div>
  )
}
