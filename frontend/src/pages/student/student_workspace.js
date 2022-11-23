import React from 'react'
import "./style/student_workspace.css"

import { faEdit, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../../components/navbar'
import { Link } from 'react-router-dom'

export default function StudentWorkspace() {
  return (
    <div>
      <Navbar />
      <div className='Workspace-section'>

        <div className='Workspace-container'>
          <div className='Workspace-heading'>
            <h3>WORKSPACES</h3>
          </div>
          <div className='Workspace-content'>
            <Link to="/student_workspace/course_registration"><FontAwesomeIcon icon={faEdit} /> Course Registration</Link>
            <Link to="/student_workspace/admit_card"><FontAwesomeIcon icon={faFileAlt} /> Get Admit Card</Link>
            <Link to="/student_workspace/view_result"><FontAwesomeIcon icon={faFileAlt} /> View Result</Link>
          </div>
        </div>
      </div>
    </div>

  )
}
