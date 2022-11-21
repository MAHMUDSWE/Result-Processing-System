import axios from 'axios';
import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { ApprovalStatus } from './approval_status';

import './style/course_registration.css';

import {
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Dialog,
    Button
} from '@mui/material';

export default function CourseRegistration() {

    var registrationDate;

    const [inputsRegular, setInputsRegular] = useState({});
    const [inputsDrop, setInputsDrop] = useState({});

    const [listOfCourses, setListOfCourses] = useState([{}]);
    var [totalCredit, setTotalCredit] = useState(0);

    const [listOfDropCourses, setListOfDropCourses] = useState([{}]);

    const [disabledButton, setDisabledButton] = useState(false);
    const [disabledButtonDrop, setDisabledButtonDrop] = useState(false);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Regular 
    const handleChangeRegular = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputsRegular(values => ({ ...values, [name]: value }));
    }



    const getRegularCoursesList = (event) => {
        event.preventDefault();

        listOfCourses.splice(0, listOfCourses.length);
        setListOfCourses([{}]);
        setTotalCredit(0);
        axios.get("/courseOfferList", {
            params: {
                ...inputsRegular,
                // 'dept_id': 100
            }
        })
            .then(res => res.data)
            .then(data => {

                data.rows.map((item) => {
                    return listOfCourses.push(item);
                })
                let total = 0;
                listOfCourses.filter((values) => values.course_id !== undefined).map((item) => {
                    return total = total + item.course_credits;
                })
                setTotalCredit(total);

                // setInputsRegular({});
                setDisabledButton(true);

                setListOfCourses(listOfCourses);

            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.log(error.response.data.message);
                }
                else if (error.response.status === 400) {
                    console.log(error.response.data.message);
                }
                else {
                    console.log(error.response.data);
                }
            })
    }

    // Drop 
    const handleChangeDrop = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputsDrop(values => ({ ...values, [name]: value }));
    }

    const getDropCoursesList = (event) => {
        event.preventDefault();

        listOfDropCourses.splice(0, listOfDropCourses.length);
        setListOfDropCourses([{}]);

        axios.get("/dropCourseList", {
            params: {
                ...inputsDrop,
                // 'dept_id': 100
            }
        })
            .then(res => res.data)
            .then(data => {

                data.rows.map((item) => {
                    return listOfDropCourses.push(item);
                })


                setDisabledButtonDrop(true);

                setListOfDropCourses(listOfDropCourses);

            })
            .catch(error => {
                if (error.response.status === 401) {

                    console.log(error.response.data.message);
                }
                else if (error.response.status === 400) {
                    console.log(error.response.data.message);
                }
                else {
                    console.log(error.response.data);
                }
            })
    }

    const removeCourseId = (key) => {

        const filterCourse_id = listOfCourses.splice(key - 1, 1);
        listOfDropCourses.push(filterCourse_id[0]);

        setListOfDropCourses(listOfDropCourses);

        let total = 0;
        listOfCourses.filter((values) => values.course_id !== undefined).map((item) => {
            return total = total + item.course_credits;
        })
        setTotalCredit(total);
        setListOfCourses(listOfCourses);
        setInputsRegular({});
    }

    const removeDropCourseId = (key) => {

        var value = listOfDropCourses[key - 1];
        console.log(listOfDropCourses);

        if ((totalCredit + value.course_credits) <= 30) {

            var filterCourse_id = listOfDropCourses.splice(key - 1, 1);
            listOfCourses.push(filterCourse_id[0]);

            let total = 0;
            listOfCourses.filter((values) => values.course_id !== undefined).map((item) => {
                return total = total + item.course_credits;
            })

            setTotalCredit(total);
            setListOfCourses(listOfCourses);
            setListOfDropCourses(listOfDropCourses);
        }
        else {
            alert("Total Credit Can not be more than 30")
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!window.confirm("Are you sure to register?")) {
            return;
        }

        axios.post("/registerCourse", {
            // reg_no: 2018831069,
            course_list: listOfCourses.filter((values) => values.course_id !== undefined)
        })
            .then(res => res.data)
            .then(data => {
                alert(data.message);
                console.log(data);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    alert(error.response.data.message);
                    console.log(error);
                }
                else if (error.response.status === 400) {
                    if (error.response.data.err.code === "ER_DUP_ENTRY") {
                        alert("Already Registered");
                    }
                    else {
                        alert(error.response.data.message);
                        console.log(error);
                    }
                }
                else {
                    console.log(error);
                }
            })
    }


    return (
        <div>
            <Navbar />
            <div className='CourseRegistration-heading'>
                <h3>Course Registration</h3>
            </div>
            <div className='CourseRegistration-container'>

                <div className='CourseRegistration-content'>
                    <div className='CourseRegistration-content-heading'>
                        <div>
                            <p>Total Credit: {totalCredit}</p>
                        </div>
                        <div>
                            <p>Registration Date: {registrationDate}</p>
                        </div>
                        <div>
                            <form onSubmit={getRegularCoursesList}>
                                <div style={{ display: 'flex', flexDirection: 'row', margin: '5px' }}>
                                    <div>
                                        <div>
                                            <label for='usn'>USN*  </label>
                                            <select
                                                name='usn'
                                                id='usn'
                                                required
                                                onChange={handleChangeRegular}
                                                onClick={() => {
                                                    listOfCourses.splice(0, listOfCourses.length);
                                                    setListOfCourses([{}]);
                                                    setTotalCredit(0);
                                                    setDisabledButton(false);
                                                }}
                                            >
                                                <option value="">USN</option>
                                                <option value='2019-1'>2019-1</option>
                                                <option value='2019-2'>2019-2</option>
                                                <option value='2020-1'>2020-1</option>
                                                <option value='2020-2'>2020-2</option>
                                                <option value='2021-1'>2021-1</option>
                                                <option value='2021-2'>2021-2</option>
                                                <option value='2022-1'>2022-1</option>
                                                <option value='2022-2'>2022-2</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for='semester'>Semester* </label>
                                            <select
                                                name='semester'
                                                id='semester'
                                                required
                                                onChange={handleChangeRegular}
                                                onClick={() => {
                                                    listOfCourses.splice(0, listOfCourses.length);
                                                    setListOfCourses([{}]);
                                                    setTotalCredit(0);
                                                    setDisabledButton(false);
                                                }}
                                            >
                                                <option value="">Semester</option>
                                                <option value='1st'>1st</option>
                                                <option value='2nd'>2nd</option>
                                                <option value='3rd'>3rd</option>
                                                <option value='4th'>4th</option>
                                                <option value='5th'>5th</option>
                                                <option value='6th'>6th</option>
                                                <option value='7th'>7th</option>
                                                <option value='8th'>8th</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '10px' }}>
                                        <button
                                            className={`button1 ${disabledButton === true && "disabled"}`}
                                        // onClick={getRegularCoursesList}
                                        >Get Courses List</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='CourseRegistration-content-body'>
                        <div className='body1'>
                            <form onSubmit={getDropCoursesList}>
                                <div className='heading'>
                                    <div>
                                        <label for='semester'>Semester* </label>
                                        <select
                                            name='semester'
                                            id='semester'
                                            required
                                            onChange={handleChangeDrop}
                                            onClick={() => {
                                                listOfDropCourses.splice(0, listOfDropCourses.length);
                                                setListOfDropCourses([{}]);
                                                setDisabledButtonDrop(false);
                                            }}
                                        >
                                            <option value="">Semester</option>
                                            <option value='1st'>1st</option>
                                            <option value='2nd'>2nd</option>
                                            <option value='3rd'>3rd</option>
                                            <option value='4th'>4th</option>
                                            <option value='5th'>5th</option>
                                            <option value='6th'>6th</option>
                                            <option value='7th'>7th</option>
                                            <option value='8th'>8th</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for='session'>Session*  </label>
                                        <select
                                            name='session'
                                            id='session'
                                            required
                                            onChange={handleChangeDrop}
                                            onClick={() => {
                                                listOfDropCourses.splice(0, listOfDropCourses.length);
                                                setListOfDropCourses([{}]);
                                                setDisabledButtonDrop(false);
                                            }}
                                        >
                                            <option value="">Session</option>
                                            <option value='2016-2017'>2017-2018</option>
                                            <option value='2017-2018'>2017-2018</option>
                                            <option value='2018-2019'>2018-2019</option>
                                            <option value='2019-2020'>2019-2020</option>
                                            <option value='2020-2021'>2020-2021</option>
                                            <option value='2021-2022'>2020-2021</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button
                                            className={`button1 ${disabledButtonDrop === true && "disabled"}`}
                                        // onClick={getDropCoursesList}
                                        >Get Drop Courses List</button>
                                    </div>
                                </div>
                            </form>

                            <div className='syllabus-course-list'>
                                Drop Courses List
                                <div>
                                    <table>
                                        <tr>
                                            <th> </th>
                                            <th>SL</th>
                                            <th>Course ID</th>
                                            <th>Course Title</th>
                                            <th>Course Type</th>
                                            <th>Course Credit</th>
                                            <th>Is Major</th>
                                            <th>Semester</th>
                                            <th>Session</th>
                                        </tr>

                                        {listOfDropCourses.filter((values) => values.course_id !== undefined).map((item, key) => (
                                            <tr >
                                                {/* <td><input
                                                    type='checkbox'
                                                    name={key + 1}
                                                    id={key + 1}
                                                    value={key}
                                                    
                                                /> </td> */}
                                                <td><button
                                                    style={{ backgroundColor: "green" }}
                                                    onClick={() => { removeDropCourseId(key + 1) }}
                                                >+</button></td>
                                                <td><label for={key + 1}>{key + 1}</label></td>
                                                <td>{item.course_id}</td>
                                                <td>{item.course_title}</td>
                                                <td>{item.course_type}</td>
                                                <td>{item.course_credits}</td>
                                                <td>{item.course_isMajor}</td>
                                                <td>{item.semester}</td>
                                                <td>{item.session}</td>
                                            </tr>
                                        )
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='body2'>
                            <div>
                                <button onClick={handleSubmit}>Save</button>
                                <button>Fees</button>
                                <button className='editProfileButton'
                                    onClick={handleClickOpen}>Approval Status</button>

                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>
                                        Course Registration Application Status
                                    </DialogTitle>

                                    <DialogContent>
                                        <DialogContentText>
                                            <ApprovalStatus inputs={inputsRegular} />
                                        </DialogContentText>
                                    </DialogContent>

                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Close
                                        </Button>
                                        {/* <Button onClick={handleClose} color="primary" autoFocus>
                                            Yes
                                        </Button> */}
                                    </DialogActions>
                                </Dialog>
                            </div>
                            <div>
                                Registered Courses List
                                <div>
                                    <table>
                                        <tr>
                                            <th> </th>
                                            <th>SL</th>
                                            <th>Course ID</th>
                                            <th>Course Title</th>
                                            <th>Course Type</th>
                                            <th>Course Credit</th>
                                            <th>Is Major</th>
                                            <th>Semester</th>
                                            <th>Session</th>
                                        </tr>

                                        {listOfCourses.filter((values) => values.course_id !== undefined).map((item, key) => (
                                            <tr >
                                                {/* <td><input
                                                    type='checkbox'
                                                    name={key + 1}
                                                    id={key + 1}
                                                    value={key}
                                                    
                                                /> </td> */}
                                                <td><button
                                                    style={{ backgroundColor: "red" }}
                                                    onClick={() => { removeCourseId(key + 1) }}
                                                >-</button></td>
                                                <td><label for={key + 1}>{key + 1}</label></td>
                                                <td>{item.course_id}</td>
                                                <td>{item.course_title}</td>
                                                <td>{item.course_type}</td>
                                                <td>{item.course_credits}</td>
                                                <td>{item.course_isMajor}</td>
                                                <td>{item.semester}</td>
                                                <td>{item.session}</td>
                                            </tr>
                                        )
                                        )}
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

