import React from 'react'
import { AdminNavbar } from '../../components/navbar'

import { faEdit, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function AdminWorkspace() {
  return (
    <div>
      <AdminNavbar />
      <div className='Workspace-section'>

        <div className='Workspace-container'>
          <div className='Workspace-heading'>
            <h3>WORKSPACES</h3>
          </div>
          <div className='Workspace-content'>
            <Link to="/admin_workspace/create_course"><FontAwesomeIcon icon={faEdit} /> Create Course</Link>
            <Link to="/admin_workspace/offer_course"><FontAwesomeIcon icon={faEdit} /> Offer Course</Link>
            <Link to="/admin_workspace/student_entry"><FontAwesomeIcon icon={faEdit} /> Student Details Entry</Link>
            <Link to="/admin_workspace/teacher_entry"><FontAwesomeIcon icon={faEdit} /> Teacher Details Entry</Link>
            <Link to="/admin_workspace/assign_course_teacher"><FontAwesomeIcon icon={faEdit} /> Assign Course Teacher</Link>
            <Link to="/admin_workspace/course_registration_approval"><FontAwesomeIcon icon={faEdit} />Course Registration Approval</Link>
            <Link to="/admin_workspace/final_course_report_mark" > <FontAwesomeIcon icon={faFileAlt} /> Course Report (Total Mark)</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
