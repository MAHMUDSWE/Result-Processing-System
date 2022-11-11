import React from 'react'
import { NavLink } from 'react-router-dom'
import sustlogo from '../assets/sustlogo.png'
import './style/navbar.css'

function Navbar() {

    return (
        <div className='Navbar-section '>

            <div className='Logo-container'>

                <div>
                    <img src={sustlogo} width='90px' height="70px" alt="logo" />
                </div>
                <div>
                    <h3 className='Logo-heading'>
                        Result Processing System
                    </h3>
                </div>

            </div>

            <div className='nav-container'>
                <nav className=''>
                    <NavLink to="/student_workspace"
                        className={({ isActive }) => isActive ? "activeItem" : "nav-li-link"}>Workspace</NavLink>

                    <NavLink to="/student_profile"
                        className={({ isActive }) => isActive ? "activeItem" : "nav-li-link"}>Profile</NavLink>

                    <NavLink to="/student_logout"
                        className={({ isActive }) => isActive ? "activeItem" : "nav-li-link"} >Log out</NavLink>
                </nav>
            </div>

        </div>
    )
}

export default Navbar;

export function TeacherNavbar() {

    return (
        <div className='Navbar-section '>

            <div className='Logo-container'>

                <div>
                    <img src={sustlogo} width='90px' height="70px" alt="logo" />
                </div>
                <div>
                    <h3 className='Logo-heading'>
                        Result Processing System
                    </h3>
                </div>

            </div>

            <div className='nav-container'>
                <nav className=''>
                    <NavLink to="/teacher_workspace"
                        className={({ isActive }) => isActive ? "activeItem" : "nav-li-link"}>Workspace</NavLink>

                    <NavLink to="/teacher_profile"
                        className={({ isActive }) => isActive ? "activeItem" : "nav-li-link"}>Profile</NavLink>

                    <NavLink to="/teacher_logout"
                        className={({ isActive }) => isActive ? "activeItem" : "nav-li-link"} >Log out</NavLink>
                </nav>
            </div>

        </div>
    )
}

export function AdminNavbar() {

    return (
        <div className='Navbar-section '>

            <div className='Logo-container'>

                <div>
                    <img src={sustlogo} width='90px' height="70px" alt="logo" />
                </div>
                <div>
                    <h3 className='Logo-heading'>
                        Result Processing System
                    </h3>
                </div>

            </div>

            <div className='nav-container'>
                <nav className=''>
                    <NavLink to="/admin_workspace"
                        className={({ isActive }) => isActive ? "activeItem" : "nav-li-link"}>Workspace</NavLink>

                    <NavLink to="/admin_profile"
                        className={({ isActive }) => isActive ? "activeItem" : "nav-li-link"}>Profile</NavLink>

                    <NavLink to="/admin_logout"
                        className={({ isActive }) => isActive ? "activeItem" : "nav-li-link"} >Log out</NavLink>
                </nav>
            </div>

        </div>
    )
}