import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './style/approval_status.css'

const ApprovalStatus = ({ inputs }) => {
    var { semester, usn } = inputs;

    var [approvalStatusInformation, setApprovalStatusInformation] = useState({});

    useEffect(() => {
        axios.get("/approvalStatus", {
            params: {
                semester, usn
            }
        })
            .then(res => res.data)
            .then(data => {
                if (data.rows.length === 0) {
                    console.log("found nothing");
                }
                else {
                    console.log(data.rows[0]);
                    setApprovalStatusInformation(data.rows[0]);
                }

            })
            .catch(err => {
                console.log(err);
            })
    }, [semester, usn])

    return (
        <div className='ApprovalStatus-section'>

            <table className='tableApplicationDate'>
                <tbody>
                    <tr>
                        <td>Application Date</td>
                        <td>{approvalStatusInformation.ApplicationDate ? approvalStatusInformation.ApplicationDate : "N/A"}</td>
                    </tr>
                </tbody>
            </table>

            <div className='ApprovalStatus-container'>
                <div className='ApprovalStatus-heading'>
                    <span>Department Head Approval</span>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Department Head</td>
                                <td>{approvalStatusInformation.Department_Head ? approvalStatusInformation.Department_Head : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Department Head Status</td>
                                <td>{approvalStatusInformation.Department_Head_Status ? approvalStatusInformation.Department_Head_Status : "N/A"}</td>
                            </tr>

                            <tr>
                                <td>Department Head Approved Date</td>
                                <td>{approvalStatusInformation.dpt_Head_Approved_Date ? approvalStatusInformation.dpt_Head_Approved_Date : "N/A"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='ApprovalStatus-container'>
                <div className='ApprovalStatus-heading'>
                    <span>Exam Controller Approval</span>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Exam Controller</td>
                                <td>{approvalStatusInformation.Exam_Controller ? approvalStatusInformation.Exam_Controller : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Exam Controller Status</td>
                                <td>{approvalStatusInformation.Exam_Controller_Status ? approvalStatusInformation.Exam_Controller_Status : "N/A"}</td>
                            </tr>

                            <tr>
                                <td>Exam Controller Approved Date</td>
                                <td>{approvalStatusInformation.Exam_Controller_Approved_Date ? approvalStatusInformation.Exam_Controller_Approved_Date.split('T')[0] : "N/A"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export {
    ApprovalStatus
};
