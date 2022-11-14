import React from 'react';

import './style/approval_status.css'

const ApprovalStatus = () => {

    return (
        <div className='ApprovalStatus-section'>

            <table className='tableApplicationDate'>
                <tbody>
                    <tr>
                        <td>Application Date</td>
                        <td>2022-05-06</td>
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
                                <td>Dr. Mohammed Jahirul Islam</td>
                            </tr>
                            <tr>
                                <td>Department Head</td>
                                <td>APPROVED</td>
                            </tr>

                            <tr>
                                <td>Department Head Approved Date</td>
                                <td>2022-05-06</td>
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
                                <td>Mr. Shailendra Sutradhar</td>
                            </tr>
                            <tr>
                                <td>Exam Controller Status</td>
                                <td>APPROVED</td>
                            </tr>

                            <tr>
                                <td>Exam Controller Approved Date</td>
                                <td>2022-05-16</td>
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
