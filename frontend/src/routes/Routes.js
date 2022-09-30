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
import CourseRegistration from '../pages/student/course_registration'
import Logout from '../components/logout'
import StudentProfile from '../pages/student/student_profile'
import CreateCourse from '../pages/admin/create_course'
import StudentDetailsEntry from '../pages/admin/studentDetailsEntry'
import TeacherDetailsEntry from '../pages/admin/teacherDetailsEntry'
import CourseEvaluationEntry from '../pages/teacher/courseEvaluationEntry'
import FinalMarkEntry from '../pages/teacher/finalMarkEntry'

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

          <Route path="/student_profile" element={<ProtectedRoutesAfterLogin>
            <StudentProfile />
          </ProtectedRoutesAfterLogin>} />

          <Route path="/student_workspace/course_registration" element={<ProtectedRoutesAfterLogin>
            <CourseRegistration />
          </ProtectedRoutesAfterLogin>} />

          <Route path="/teacher_workspace" element={<ProtectedRoutesAfterLogin>
            <TeacherWorkspace />
          </ProtectedRoutesAfterLogin>} />

          <Route path="/teacher_workspace/course_evaluation_mark_entry" element={<ProtectedRoutesAfterLogin>
            <CourseEvaluationEntry />
          </ProtectedRoutesAfterLogin>} />

          <Route path="/teacher_workspace/final_mark_entry" element={<ProtectedRoutesAfterLogin>
            <FinalMarkEntry />
          </ProtectedRoutesAfterLogin>} />

          <Route path="/admin_workspace" element={<ProtectedRoutesAfterLogin>
            <AdminWorkspace />
          </ProtectedRoutesAfterLogin>} />

          <Route path="/admin_workspace/create_course" element={<ProtectedRoutesAfterLogin>
            <CreateCourse />
          </ProtectedRoutesAfterLogin>} />

          <Route path="/admin_workspace/student_entry" element={<ProtectedRoutesAfterLogin>
            <StudentDetailsEntry />
          </ProtectedRoutesAfterLogin>} />

          <Route path="/admin_workspace/teacher_entry" element={<ProtectedRoutesAfterLogin>
            <TeacherDetailsEntry />
          </ProtectedRoutesAfterLogin>} />

          <Route path="/logout" element={<ProtectedRoutesAfterLogin>
            <Logout />
          </ProtectedRoutesAfterLogin>} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}
