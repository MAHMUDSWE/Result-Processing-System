import axios from 'axios';
import React, { useState } from 'react';

import ReactPaginate from 'react-paginate';
import './style/pagination.css';

function ItemsControllerApproval({ currentItems, listOfStudent }) {
    const data = currentItems;
    const [currentItemsList, setCurrentItemsList] = useState(data);

    const handleApprove = (event, index) => {
        event.preventDefault();

        let Exam_Controller_Status = event.target.value
        let { reg_no, semester, USN } = listOfStudent[index];

        let data = {
            reg_no, semester, USN, Exam_Controller_Status
        }
        console.log(data);
        axios.put('/adminApproval', data)
            .then(res => res.data)
            .then(data => {
                console.log(data);
                if (data.result.affectedRows === 1) {
                    console.log("inside");

                    const list = [...currentItemsList]
                    list[index].Exam_Controller_Status = Exam_Controller_Status;

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
                        <th>Department Head</th>
                        <th>Department Head Approval Status</th>
                        <th>Department Head Approval Date</th>
                        <th>Exam Controller Approval Status</th>
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
                            <td>{item.Department_Head}</td>
                            <td>{item.Department_Head_Status}</td>
                            <td>{item.Department_Head_Approved_Date.split('T')[0]}</td>
                            <td>{item.Exam_Controller_Status ? item.Exam_Controller_Status : "N/A"}</td>
                            <td>
                                {/* <button
                                    // className='approve ${}'
                                    className={`approve ${item.Department_Head_Status === "APPROVED" && "disabled"}`}
                                    value="APPROVED"
                                    onClick={(event) => {
                                        handleApprove(event, key)
                                    }}
                                >Approve</button> */}
                                {item.Exam_Controller_Status === "APPROVED" ?
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
                                {item.Exam_Controller_Status === "DISAPPROVED" ?
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

export function PaginatedItemsAdminApproval({ itemsPerPage, listOfStudentProps }) {

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
            <ItemsControllerApproval currentItems={currentItems} listOfStudent={listOfStudent} />
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