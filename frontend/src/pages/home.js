import React from 'react'
import './style/home.css'
import HeaderSection from '../components/header'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (

        <div className="Body-section">
            <HeaderSection />
            <div className='Body-link-container'>
                {/* <a
                    className="Body-link"
                    href="/admin_login"
                    target="0"
                    rel="noopener noreferrer"
                >
                    Administrator Login
                </a>
                <a
                    className="Body-link"
                    href="teacher_login"
                    target=""
                    rel="noopener noreferrer"
                >
                    Teacher Login
                </a>
                <a
                    className="Body-link"
                    href="student_login"
                    target=""
                    rel="noopener noreferrer"
                >
                    Student Login
                </a> */}
                <Link className="Body-link" to='/admin_login'> Administrator Login</Link>
                <Link className="Body-link" to='/teacher_login'> Teacher Login</Link>
                <Link className="Body-link" to='/student_login'> Student Login</Link>

            </div>
            <div className='Body-link-container2'>
                <h3>Don't have an account?</h3>
                {/* <a
                    className="Body-link"
                    href="signup"
                    target=""
                    rel="noopener noreferrer"
                >
                    Register Now
                </a> */}
                <Link className="Body-link" to='/signup'> Register Now</Link>
            </div>
        </div>

    )
}
