import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import AdminLogin from '../pages/admin/admin_login'
import HomePage from '../pages/home'
import StudentLogin from '../pages/student/student_login'
import TeacherLogin from '../pages/teacher/teacher_login'
import StudentWorkspace from '../pages/student/student_workspace'
import { ProtectedRoutesAfterLogin, ProtectedRoutesBeforeLogin } from './route_protection'
import TeacherWorkspace from '../pages/teacher/teacher_workspace'
import AdminWorkspace from '../pages/admin/admin_workspace'

export default function PageRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutesBeforeLogin>
            <HomePage />
          </ProtectedRoutesBeforeLogin>} />

          <Route path="/admin_login" element={<ProtectedRoutesBeforeLogin>
            <AdminLogin />
          </ProtectedRoutesBeforeLogin>} />

          <Route path="/teacher_login" element={<ProtectedRoutesBeforeLogin>
            <TeacherLogin />
          </ProtectedRoutesBeforeLogin>} />

          <Route path="/student_login" element={<ProtectedRoutesBeforeLogin>
            <StudentLogin />
          </ProtectedRoutesBeforeLogin>} />

          <Route path="/student_workspace" element={<ProtectedRoutesAfterLogin>
            <StudentWorkspace />
          </ProtectedRoutesAfterLogin>} />

          <Route path="/teacher_workspace" element={<ProtectedRoutesAfterLogin>
            <TeacherWorkspace />
          </ProtectedRoutesAfterLogin>} />

          <Route path="/admin_workspace" element={<ProtectedRoutesAfterLogin>
            <AdminWorkspace />
          </ProtectedRoutesAfterLogin>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
