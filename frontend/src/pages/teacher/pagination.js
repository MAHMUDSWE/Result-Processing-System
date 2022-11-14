import React, { useState } from 'react';

import ReactPaginate from 'react-paginate';

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