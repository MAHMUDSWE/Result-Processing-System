import axios from 'axios';
import React, { useState } from 'react';

import ReactPaginate from 'react-paginate';
import './style/pagination.css';

function Items({ currentItems }) {
    return (
        <>
            <table className="table1">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Registration No.</th>
                        <th>Student's Name</th>
                        <th>Grade Point</th>
                        <th>Letter Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.filter((values) => values.course_id !== undefined).map((item, key) => (

                        <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{item.reg_no}</td>
                            <td>{item.std_name}</td>
                            <td>{item.gpa}</td>
                            <td>{item.letter_grade}</td>
                        </tr>
                    )
                    )}

                </tbody>
            </table>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', flexWrap: 'nowrap', bottom: 0 }}>
                <span>Signature</span>
                <span>---------------</span>
                <span>Chairman of Exam Committee</span>
            </div>
        </>
    );
}

export function PaginatedItemsLetterGrade({ itemsPerPage, listOfStudent }) {

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;

    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    const currentItems = listOfStudent.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(listOfStudent.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listOfStudent.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}


function ItemsTheory({ currentItems, teacherName }) {
    return (
        <>
            <table className="table1">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Registration No.</th>
                        <th>Student's Name</th>
                        <th>Present in Class</th>
                        <th>Mid-Semester Mark(Obtained)</th>
                        <th>Evaluation Mark</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.filter((values) => values.course_id !== undefined).map((item, key) => (

                        <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{item.reg_no}</td>
                            <td>{item.std_name}</td>
                            <td>{item.class_attendance}</td>
                            <td>{item.term_test}</td>
                            <td>{item.class_assessment}</td>
                        </tr>
                    )
                    )}

                </tbody>
            </table>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', flexWrap: 'nowrap', bottom: 0 }}>
                <span>{teacherName}</span>
                <span>-----------</span>
                <span>Course Teacher</span>
            </div>
        </>
    );
}

export function PaginatedItemsEvaluationMark({ itemsPerPage, listOfStudent, teacherName }) {

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;

    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    const currentItems = listOfStudent.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(listOfStudent.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listOfStudent.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <ItemsTheory currentItems={currentItems} teacherName={teacherName} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}


function ItemsLab({ currentItems }) {
    return (
        <>
            <table className="table1">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Registration No.</th>
                        <th>Student's Name</th>
                        <th>Total Mark</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.filter((values) => values.course_id !== undefined).map((item, key) => (

                        <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{item.reg_no}</td>
                            <td>{item.std_name}</td>
                            <td>{item.total_mark}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', flexWrap: 'nowrap', bottom: 0 }}>
                <span>Signature</span>
                <span>---------------</span>
                <span>Chairman of Exam Committee</span>
            </div>
        </>
    );
}

export function PaginatedItemsTotalMarkLab({ itemsPerPage, listOfStudent }) {

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;

    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    const currentItems = listOfStudent.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(listOfStudent.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listOfStudent.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <ItemsLab currentItems={currentItems} />
            <ReactPaginate
                breakLabel="."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}


function ItemsTeacherApproval({ currentItems, listOfStudent }) {
    const data = currentItems;
    const [currentItemsList, setCurrentItemsList] = useState(data);

    const handleApprove = (event, index) => {
        event.preventDefault();

        let Department_Head_Status = event.target.value
        let { reg_no, semester, USN } = listOfStudent[index];

        let data = {
            reg_no, semester, USN, Department_Head_Status
        }
        console.log(data);
        axios.put('/teacherapproval', data)
            .then(res => res.data)
            .then(data => {
                console.log(data);
                if (data.result.affectedRows === 1) {
                    console.log("inside");

                    const list = [...currentItemsList]
                    list[index].Department_Head_Status = Department_Head_Status;

                    setCurrentItemsList(list);

                    console.log(list);
                }

            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <table className="table1">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Registration No.</th>
                        <th>Student's Name</th>
                        <th>Approval Status</th>
                        {/* <th >Approve</th>
                        <th>Cancel</th> */}
                    </tr>
                </thead>
                <tbody>
                    {currentItemsList.map((item, key) => (

                        <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{item.reg_no}</td>
                            <td>{item.std_name}</td>
                            <td>{item.Department_Head_Status ? item.Department_Head_Status : "N/A"}</td>
                            <td>
                                {/* <button
                                    // className='approve ${}'
                                    className={`approve ${item.Department_Head_Status === "APPROVED" && "disabled"}`}
                                    value="APPROVED"
                                    onClick={(event) => {
                                        handleApprove(event, key)
                                    }}
                                >Approve</button> */}
                                {item.Department_Head_Status === "APPROVED" ?
                                    (<button
                                        // className='approve ${}'
                                        className='approve disabled'
                                        value="APPROVED"
                                    >Approve</button>)
                                    : (<button
                                        // className='approve ${}'
                                        className='approve'
                                        value="APPROVED"
                                        onClick={(event) => {
                                            handleApprove(event, key)
                                        }}
                                    >Approve</button>)
                                }
                            </td>
                            <td>
                                {/* <button
                                    className={`cancel ${item.Department_Head_Status === "DISAPPROVED" && "disabled"}`}
                                    value="DISAPPROVED"
                                    onClick={(event) => {
                                        handleApprove(event, key)
                                    }}
                                >Cancel</button> */}
                                {item.Department_Head_Status === "DISAPPROVED" ?
                                    (<button
                                        // className='approve ${}'
                                        className='cancel disabled'
                                        value="DISAPPROVED"
                                    >Disapprove</button>)
                                    : (<button
                                        // className='approve ${}'
                                        className='cancel'
                                        value="DISAPPROVED"
                                        onClick={(event) => {
                                            handleApprove(event, key)
                                        }}
                                    >Disapprove</button>)
                                }
                            </td>
                        </tr>
                    )
                    )}

                </tbody>
            </table>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', flexWrap: 'nowrap', bottom: 0 }}>
                <h4>Total Student: {listOfStudent.length > 0 && listOfStudent.length}</h4>
            </div>

        </>
    );
}

export function PaginatedItemsTeacherApproval({ itemsPerPage, listOfStudentProps }) {

    // const [listOfStudent, setListOfStudent] = useState(listOfStudentProps);
    const listOfStudent = listOfStudentProps

    console.log(listOfStudent);

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;

    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    const currentItems = listOfStudent.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(listOfStudent.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listOfStudent.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <ItemsTeacherApproval currentItems={currentItems} listOfStudent={listOfStudent} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}