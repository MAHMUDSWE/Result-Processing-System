import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import HeaderSection from '../../components/header'
import "./style/admin_login.css"

export default function AdminLogin() {
  const [loginputs, setLogInputs] = useState({});
  let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

  const logHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLogInputs(values => ({ ...values, [name]: value }))
  }

  const logHandleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }

  return (
    <div className='Admin-login-section'>
      <div>
        <HeaderSection />
      </div>

      <div className='Admin-login-container'>
        <p>Administrator Login</p>
        <form onSubmit={logHandleSubmit}>
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
          <a href="/recover">Forgot your password?</a>
          {isLoggedIn ? <Navigate to='/admin_workspace' replace /> : <h3> </h3>}
        </form>
      </div>
    </div>
  )
}
