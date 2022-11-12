import React from 'react'
import { TeacherNavbar } from '../../components/navbar'
// import './style/teacher_workspace.css'

import { faEdit, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function TeacherWorkspace() {
  return (
    <div>
      <TeacherNavbar />
      <div className='Workspace-section'>

        <div className='Workspace-container'>
          <div className='Workspace-heading'>
            <h3>WORKSPACES</h3>
          </div>
          <div className='Workspace-content'>
            <Link to="/teacher_workspace/course_evaluation_mark_entry"><FontAwesomeIcon icon={faEdit} /> Course Evaluation Mark Entry</Link>
            <Link to="/teacher_workspace/final_mark_entry"><FontAwesomeIcon icon={faEdit} /> Final Mark Entry</Link>
            <Link to="/teacher_workspace/final_course_report_mark"><FontAwesomeIcon icon={faFileAlt} /> Course Report (Evaluation and Lab Mark)</Link>
            <Link to="/teacher_workspace/final_course_report_grade"><FontAwesomeIcon icon={faFileAlt} /> Course Report (Grade and Letter)</Link>
            <Link to="/teacher_workspace/tabulation_sheet"><FontAwesomeIcon icon={faFileAlt} /> Tabulation Sheet </Link>

          </div>
        </div>
      </div>
    </div>
  )
}
