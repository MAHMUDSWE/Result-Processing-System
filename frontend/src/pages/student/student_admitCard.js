import axios from 'axios';
import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import './style/student_admitCard.css';

import sustlogo from '../../assets/sustlogo.png'

export default function StudentAdmitCard() {

    const [inputs, setInputs] = useState({});
    const [open, setOpen] = useState(false);
    const [courseList, setCourseList] = useState([]);

    // const [regularTheory, setRegularTheory] = useState(0);
    // const [regularLab, setRegularLab] = useState(0);
    // const [dropTheory, setDropTheory] = useState(0);
    // const [dropLab, setDropLab] = useState(0);

    let regularTheory = 0;
    let regularLab = 0;
    let dropTheory = 0;
    let dropLab = 0;

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const getCourseList = (event) => {
        event.preventDefault();

        console.log(inputs);

        axios.get(`/admit_card`, {
            params: {
                usn: inputs.usn
            }
        })
            .then((res) => res.data)
            .then((data) => {

                console.log(data.rows);

                if (data.rows.length === 0) {
                    alert("course not found!")
                }
                else {
                    const list = [...data.rows]
                    console.log(list);
                    setCourseList(list);

                    setOpen(true);
                    console.log(courseList);
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.log(error.response.data.message);
                } else {
                    console.log(error);
                }
            });
    }
    return (
        <div>
            {open ? (
                <div>
                    <div className="CourseEvaluationEntry-container" style={{ marginBottom: '70px' }}>
                        <div className='Logo-container'>

                            <div>
                                <img src={sustlogo} width='90px' height="70px" alt="logo" />
                            </div>
                            <div>
                                <h3 className='Logo-heading'>
                                    Shahjalal University of Science and Technology, Sylhet, Bangladesh
                                </h3>
                            </div>

                        </div>

                        <div>
                            <h2>Admit Card</h2>
                        </div>
                        <div className="Profile-info-container">
                            <table className="table2">
                                <tbody>
                                    <tr>
                                        <td>Registration No.</td>
                                        <td>: {courseList[0].reg_no}</td>
                                    </tr>
                                    <tr>
                                        <td>Student's Name</td>
                                        <td>: {courseList[0].std_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Session</td>
                                        <td>: {courseList[0].session}</td>
                                    </tr>
                                    <tr>
                                        <td>Degree</td>
                                        <td>: B.Sc.(Engg.) in Software Engineering</td>
                                    </tr>
                                    <tr>
                                        <td>Semester</td>
                                        <td>: {courseList[0].semester} Semester Examination-{courseList[0].USN.split('-')[0]}</td>
                                    </tr>
                                    <tr>
                                        <td>Department</td>
                                        <td>: Institute of Information and Communication Technology</td>
                                    </tr>
                                    <tr>
                                        <td>USN</td>
                                        <td>: {courseList[0].USN} ({courseList[0].USN.split('-')[1] === "1" ? ("January - June") : ("July - December")})</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                            <table className="table1">
                                <thead>
                                    <tr>
                                        <th>Theory courses</th>
                                        <th>Course Title</th>
                                        <th>Credit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseList.filter((value) => {
                                        if (value.course_type === 'Theory' && value.session === value.courseSession) {
                                            return true;
                                        }
                                        else {
                                            return false;
                                        }
                                    }).map((item, key) => {
                                        regularTheory += item.course_credits;
                                        return (
                                            <tr key={key}>
                                                <td>{item.course_id}</td>
                                                <td>{item.course_title}</td>
                                                <td>{item.course_credits}</td>
                                            </tr>
                                        )
                                    }

                                    )}
                                    <tr>
                                        <td colSpan={2}>Total Credit</td>
                                        <td>{regularTheory}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table1">
                                <thead>
                                    <tr>
                                        <th>Lab courses</th>
                                        <th>Course Title</th>
                                        <th>Credit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseList.filter((value) => {
                                        if (value.course_type === 'Lab' && value.session === value.courseSession) {
                                            return true;
                                        }
                                        else {
                                            return false;
                                        }
                                    }).map((item, key) => {
                                        regularLab += item.course_credits;
                                        return (
                                            <tr key={key}>
                                                <td>{item.course_id}</td>
                                                <td>{item.course_title}</td>
                                                <td>{item.course_credits}</td>
                                            </tr>
                                        )
                                    }
                                    )}
                                    <tr>
                                        <td colSpan={2}>Total Credit</td>
                                        <td>{regularLab}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <button style={{ backgroundColor: 'white', border: '1px solid black', padding: '8px 16px' }}>
                                Drop Courses</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0px' }}>

                            <table className="table1">
                                <thead>
                                    <tr>
                                        <th>Theory courses</th>
                                        <th>Course Title</th>
                                        <th>Credit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseList.filter((value) => {
                                        if (value.course_type === 'Theory' && value.session !== value.courseSession) {
                                            return true;
                                        }
                                        else {
                                            return false;
                                        }
                                    }).map((item, key) => {
                                        dropTheory += item.course_credits;
                                        return (
                                            <tr key={key}>
                                                <td>{item.course_id}</td>
                                                <td>{item.course_title}</td>
                                                <td>{item.course_credits}</td>
                                            </tr>
                                        )
                                    }
                                    )}
                                    <tr>
                                        <td colSpan={2}>Total Credit</td>
                                        <td>{dropTheory}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table1">
                                <thead>
                                    <tr>
                                        <th>Lab courses</th>
                                        <th>Course Title</th>
                                        <th>Credit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseList.filter((value) => {
                                        if (value.course_type === 'Lab' && value.session !== value.courseSession) {
                                            return true;
                                        }
                                        else {
                                            return false;
                                        }
                                    }).map((item, key) => {
                                        dropLab += item.course_credits;
                                        return (
                                            <tr key={key}>
                                                <td>{item.course_id}</td>
                                                <td>{item.course_title}</td>
                                                <td>{item.course_credits}</td>
                                            </tr>
                                        )
                                    }
                                    )}
                                    <tr>
                                        <td colSpan={2}>Total Credit</td>
                                        <td>{dropLab}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <button style={{ backgroundColor: 'white', border: '1px solid black', padding: '8px 16px' }}>
                                Grand Total Credit</button>

                            <button style={{ backgroundColor: 'white', border: '1px solid black', borderLeft: 'none', padding: '8px 25px' }}>
                                {regularTheory + regularLab + dropTheory + dropLab}</button>
                        </div>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', flexWrap: 'nowrap', bottom: 0 }}>
                                <span>________________________</span>
                                <span style={{ marginLeft: '10px' }}>Student's Signature</span>
                                <span style={{ marginLeft: '10px' }}>Date:</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', flexWrap: 'nowrap', bottom: 0 }}>
                                <span>________________________________</span>
                                <span style={{ marginRight: '25px' }}>Md. Mujibur Rahman</span>
                                <span style={{ marginRight: '10px' }}>Controller of Examinations</span>
                                <span style={{ marginRight: '25px' }}>Date: 24/11/2022</span>
                            </div>
                        </div>
                    </div>
                    <br />

                </div>

            ) :
                <div>
                    <Navbar />
                    <div className="CourseEvaluationEntry-container">
                        <div className="CourseEvaluationEntry-heading">
                            <h3>Get Admit Card</h3>
                        </div>
                        <div>
                            <form onSubmit={getCourseList}>
                                <div>
                                    <select
                                        name="usn"
                                        required onChange={handleChange}
                                    >
                                        <option value="">USN</option>
                                        <option value="2020-1">2020-1</option>
                                        <option value="2020-2">2020-2</option>
                                        <option value="2021-1">2021-1</option>
                                        <option value="2021-2">2021-2</option>
                                        <option value="2022-1">2022-1</option>
                                        <option value="2022-2">2022-2</option>
                                        <option value="2023-1">2023-1</option>
                                        <option value="2023-2">2023-2</option>
                                    </select>
                                </div>
                                <button className="button">Submit</button>
                            </form>
                        </div>
                    </div>

                </div>
            }

        </div>
    )
}
