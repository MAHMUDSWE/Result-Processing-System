import React from 'react'
import './style/home.css'
import HeaderSection from '../components/header'

export default function HomePage() {
    return (

        <div className="Body-section">
            <HeaderSection />
            <div className='Body-link-container'>
                <a
                    className="Body-link"
                    href="/admin_login"
                    target=""
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
                </a>
            </div>
        </div>

    )
}
