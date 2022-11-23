import axios from "axios";
import React, { useState } from "react";
import { TeacherNavbar } from "../../components/navbar";
import "./style/course_report_total_mark.css";
import { PaginatedItemsTabulationSheet } from "./tabulationPagination";

export default function TabulationSheet() {

    const [disabledButton, setDisabledButton] = useState(false);

    const [inputs, setInputs] = useState({});

    const [open, setOpen] = useState(false);

    const [listOfStudent, setListOfStudent] = useState([]);
    // const [list, setList] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const getTabulationSheet = (event) => {
        event.preventDefault();

        setDisabledButton(true);
        console.log(inputs);
        axios.get("/tabulationSheet", {
            params: {
                ...inputs,
            }
        })
            .then((res) => res.data)
            .then((data) => {
                // console.log(data.rows);
                if (data.rows.length === 0) {
                    alert("Student not found!")
                }
                else {
                    var list = [...data.rows];
                    var item = [];

                    for (var i = 0; i < list.length; i++) {
                        var flag = 0;
                        for (var j = 0; j < item.length; j++) {
                            if (list[i].reg_no === item[j].reg_no) {
                                flag++;
                                item[j].course_list.push({
                                    course_id: list[i].course_id,
                                    course_session: list[i].courseSession,
                                    semester: list[i].semester,
                                    course_type: list[i].course_type,
                                    course_credits: list[i].course_credits,
                                    gpa: list[i].gpa,
                                    letter_grade: list[i].letter_grade
                                })
                            }
                        }
                        if (flag === 0) {
                            item.push({
                                reg_no: list[i].reg_no,
                                std_name: list[i].std_name,
                                session: list[i].session,
                                USN: list[i].USN,
                                course_list: [{
                                    course_id: list[i].course_id,
                                    course_session: list[i].courseSession,
                                    semester: list[i].semester,
                                    course_type: list[i].course_type,
                                    course_credits: list[i].course_credits,
                                    gpa: list[i].gpa,
                                    letter_grade: list[i].letter_grade
                                }]
                            })
                        }
                    }
                    var temp = [...item];
                    setListOfStudent(temp);
                    setOpen(true);
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
                    <div className="CourseReportTotalMark-container">

                        <div>
                            <div className="CourseEvaluationEntry-heading" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', backgroundColor: 'white', color: 'black' }}>
                                SHAHJALAL UNIVERSITY OF SCIENCE AND TECHNOLOGY, SYLHET, BANGLADESH <br />
                                TABULATION SHEET <br />
                                Institute of Information and Communication Technology <br />
                                B.Sc(Engg) {listOfStudent[0] && listOfStudent[0].course_list[0].semester} Semester Examination <br />
                                EXAMINATION HELD IN: <br />
                            </div>

                            <PaginatedItemsTabulationSheet itemsPerPage={12} listOfStudent={listOfStudent} />
                        </div>
                    </div>
                </div>
            )

                : (
                    (
                        <div>
                            <TeacherNavbar />

                            <div className="CourseEvaluationEntry-container">
                                <div className="CourseEvaluationEntry-heading">
                                    <h3>Tabulation Sheet</h3>
                                </div>
                                <div>
                                    <form onSubmit={getTabulationSheet}>
                                        <div>
                                            <select
                                                name="usn"
                                                required onChange={handleChange}
                                                onClick={() => {
                                                    setDisabledButton(false);
                                                }}
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
                                        <div>
                                            <select
                                                name="session"
                                                required onChange={handleChange}
                                                onClick={() => {
                                                    setDisabledButton(false);
                                                }}
                                            >
                                                <option value="">Session</option>
                                                <option value='2015-2016'>2015-2016</option>
                                                <option value='2016-2017'>2016-2017</option>
                                                <option value='2017-2018'>2017-2018</option>
                                                <option value='2018-2019'>2018-2019</option>
                                                <option value='2019-2020'>2019-2020</option>
                                                <option value='2020-2021'>2020-2021</option>
                                                <option value='2021-2022'>2021-2022</option>
                                                <option value='2022-2023'>2022-2023</option>
                                            </select>
                                        </div>
                                        <button className={`button1 ${disabledButton === true && "disabled"}`}>Get Tabulation Sheet</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                )
            }
            {/* </div> */}
        </div>
    );
}
