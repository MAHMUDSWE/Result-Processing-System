import React, { useEffect, useState } from 'react'
import { TeacherNavbar } from '../../components/navbar'
// import './style/teacher_workspace.css'

import { faEdit, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function TeacherWorkspace() {

  let [isHeadTeacher, setIsHeadTeacher] = useState(false);

  useEffect(() => {
    axios.get('/teacherDetails')
      .then(res => res.data)
      .then(data => {
        if (data.rows[0].designation === 'Director') {
          setIsHeadTeacher(true);
        }
      })
  }, [isHeadTeacher])

  return (
    <div>
      <TeacherNavbar />
      <div className='Workspace-section'>

        <div className='Workspace-container'>
          <div className='Workspace-heading'>
            <h3>WORKSPACES</h3>
          </div>
          <div className='Workspace-content'>
            {isHeadTeacher && (<Link to="/teacher_workspace/course_registration_approval"><FontAwesomeIcon icon={faEdit} /> Course Registration Approval</Link>)}
            <Link to="/teacher_workspace/course_evaluation_mark_entry"><FontAwesomeIcon icon={faEdit} /> Course Evaluation Mark Entry</Link>
            <Link to="/teacher_workspace/final_mark_entry"><FontAwesomeIcon icon={faEdit} /> Final Mark Entry</Link>
            <Link to="/teacher_workspace/final_course_report_mark"><FontAwesomeIcon icon={faFileAlt} /> Course Report (Evaluation and Lab Mark)</Link>
            <Link to="/teacher_workspace/final_course_report_grade"><FontAwesomeIcon icon={faFileAlt} /> Course Report (Grade and Letter)</Link>

            {isHeadTeacher && (<Link to="/teacher_workspace/tabulation_sheet"><FontAwesomeIcon icon={faFileAlt} /> Tabulation Sheet </Link>)}


          </div>
        </div>
      </div>
    </div>
  )
}
