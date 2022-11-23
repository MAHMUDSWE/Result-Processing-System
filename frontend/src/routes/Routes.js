import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AdminstratorLogout, StudentLogout, TeacherLogout } from '../components/logout'
import AdminLogin from '../pages/admin/admin_login'
import AdminProfile from '../pages/admin/admin_profile'
import AdminWorkspace from '../pages/admin/admin_workspace'
import AssignCourse from '../pages/admin/assignCourse'
import AdminCourseRegistrationApproval from '../pages/admin/courseRegistrationApproval'

import CreateCourse from '../pages/admin/create_course'
import OfferCourse from '../pages/admin/offer_course'
import StudentDetailsEntry from '../pages/admin/studentDetailsEntry'
import TeacherDetailsEntry from '../pages/admin/teacherDetailsEntry'
import HomePage from '../pages/home'
import Signup from '../pages/signup'
import CourseRegistration from '../pages/student/course_registration'
import StudentAdmitCard from '../pages/student/student_admitCard'
import StudentLogin from '../pages/student/student_login'
import StudentProfile from '../pages/student/student_profile'
import StudentResultView from '../pages/student/student_resultView'
import StudentWorkspace from '../pages/student/student_workspace'
import CourseEvaluationEntry from '../pages/teacher/courseEvaluationEntry'
import CourseRegistrationApproval from '../pages/teacher/courseRegistrationApproval'
import CourseReportGrade from '../pages/teacher/course_report_grade_letter'
import CourseReportTotalMark from '../pages/teacher/course_report_total_mark'
import FinalMarkEntry from '../pages/teacher/finalMarkEntry'
import TabulationSheet from '../pages/teacher/tabulation_sheet'
import TeacherLogin from '../pages/teacher/teacher_login'
import TeacherProfile from '../pages/teacher/teacher_profile'
import TeacherWorkspace from '../pages/teacher/teacher_workspace'
import { AdminRoutesProtection, ProtectedRoutesBeforeLogin, StudentsRoutesProtection, TeacherRoutesProtection } from './route_protection'

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

          <Route path="/signup" element={<ProtectedRoutesBeforeLogin>
            <Signup />
          </ProtectedRoutesBeforeLogin>} />

          {/* ///////////////////////////////////////////////////////////////////////// */}

          <Route path="/student_workspace" element={<StudentsRoutesProtection>
            <StudentWorkspace />
          </StudentsRoutesProtection>} />

          <Route path="/student_profile" element={<StudentsRoutesProtection>
            <StudentProfile />
          </StudentsRoutesProtection>} />

          <Route path="/student_workspace/course_registration" element={<StudentsRoutesProtection>
            <CourseRegistration />
          </StudentsRoutesProtection>} />
          <Route path="/student_workspace/view_result" element={<StudentsRoutesProtection>
            <StudentResultView />
          </StudentsRoutesProtection>} />
          <Route path="/student_workspace/admit_card" element={<StudentsRoutesProtection>
            <StudentAdmitCard />
          </StudentsRoutesProtection>} />

          {/* ///////////////////////////////////////////////////////////////////////// */}

          <Route path="/teacher_workspace" element={<TeacherRoutesProtection>
            <TeacherWorkspace />
          </TeacherRoutesProtection>} />

          <Route path='/teacher_workspace/course_registration_approval' element={<TeacherRoutesProtection>
            <CourseRegistrationApproval />
          </TeacherRoutesProtection>}
          />

          <Route path="/teacher_profile" element={<TeacherRoutesProtection>
            <TeacherProfile />
          </TeacherRoutesProtection>} />

          <Route path="/teacher_workspace/course_evaluation_mark_entry" element={<TeacherRoutesProtection>
            <CourseEvaluationEntry />
          </TeacherRoutesProtection>} />

          <Route path="/teacher_workspace/final_mark_entry" element={<TeacherRoutesProtection>
            <FinalMarkEntry />
          </TeacherRoutesProtection>} />

          <Route path='/teacher_workspace/final_course_report_mark' element={<TeacherRoutesProtection>
            <CourseReportTotalMark />
          </TeacherRoutesProtection>} />

          <Route path='/teacher_workspace/final_course_report_grade' element={<TeacherRoutesProtection>
            <CourseReportGrade />
          </TeacherRoutesProtection>} />

          <Route path='/teacher_workspace/tabulation_sheet' element={<TeacherRoutesProtection>
            <TabulationSheet />
          </TeacherRoutesProtection>} />

          {/* ///////////////////////////////////////////////////////////////////////// */}

          <Route path="/admin_workspace" element={<AdminRoutesProtection>
            <AdminWorkspace />
          </AdminRoutesProtection>} />

          <Route path="/admin_profile" element={<AdminRoutesProtection>
            <AdminProfile />
          </AdminRoutesProtection>} />

          <Route path='/admin_workspace/course_registration_approval' element={<AdminRoutesProtection>
            <AdminCourseRegistrationApproval />
          </AdminRoutesProtection>}
          />

          <Route path="/admin_workspace/create_course" element={<AdminRoutesProtection>
            <CreateCourse />
          </AdminRoutesProtection>} />

          <Route path="/admin_workspace/offer_course" element={<AdminRoutesProtection>
            <OfferCourse />
          </AdminRoutesProtection>} />

          <Route path="/admin_workspace/assign_course_teacher" element={<AdminRoutesProtection>
            <AssignCourse />
          </AdminRoutesProtection>} />

          <Route path="/admin_workspace/student_entry" element={<AdminRoutesProtection>
            <StudentDetailsEntry />
          </AdminRoutesProtection>} />

          <Route path="/admin_workspace/teacher_entry" element={<AdminRoutesProtection>
            <TeacherDetailsEntry />
          </AdminRoutesProtection>} />

          {/* ///////////////////////////////////////////////////////////////////////// */}

          <Route path="/student_logout" element={<StudentsRoutesProtection>
            <StudentLogout />
          </StudentsRoutesProtection>} />

          <Route path="/teacher_logout" element={<TeacherRoutesProtection>
            <TeacherLogout />
          </TeacherRoutesProtection>} />

          <Route path="/admin_logout" element={<AdminRoutesProtection>
            <AdminstratorLogout />
          </AdminRoutesProtection>} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}
