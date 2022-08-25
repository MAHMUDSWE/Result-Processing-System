import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import AdminLogin from '../pages/admin/admin_login'
import HomePage from '../pages/home'
import StudentLogin from '../pages/student/student_login'
import TeacherLogin from '../pages/teacher/teacher_login'

export default function PageRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/teacher_login" element={<TeacherLogin />} />
          <Route path="/student_login" element={<StudentLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
