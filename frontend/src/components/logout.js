
import React from 'react'
import { Navigate } from 'react-router-dom'

export function StudentLogout() {
    let isLoggedIn = localStorage.getItem("studentIsLoggedIn");

    return (
        <div>
            {
                localStorage.removeItem("studentIsLoggedIn")
            }
            {
                localStorage.removeItem("access_token")
            }
            {isLoggedIn ? <Navigate to="/student_workspace" replace /> : <h3> </h3>}
        </div>
    )
}

export function TeacherLogout() {
    let isLoggedIn = localStorage.getItem("teacherIsLoggedIn");

    return (
        <div>
            {
                localStorage.removeItem("teacherIsLoggedIn")
            }
            {
                localStorage.removeItem("access_token")
            }
            {isLoggedIn ? <Navigate to="/teacher_workspace" replace /> : <h3> </h3>}
        </div>
    )
}

export function AdminstratorLogout() {
    let isLoggedIn = localStorage.getItem("adminstratorIsLoggedIn");

    return (
        <div>
            {
                localStorage.removeItem("adminstratorIsLoggedIn")
            }
            {
                localStorage.removeItem("access_token")
            }
            {isLoggedIn ? <Navigate to="/admin_workspace" replace /> : <h3> </h3>}
        </div>
    )
}