import React from "react";
import AttendanceList from "./AttendanceList";
import {MOCK_DATA} from "../Data/TEST/MockStaff"

function AttendanceForm() {
    console.log(JSON.stringify(MOCK_DATA, null, ''));
    return (
        <div>
            <div className="blue-strip">
                <h2 className="display-4 text-center"><strong>Attendance Form</strong></h2>
            </div>
                <div className="container">
                <table className="table table-striped table-hover table-responsive">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Department</th> 
                            <th scope="col">Meeting Room</th>
                            <th scope="col">Time In</th>
                            <th scope="col">Time Out</th>
                            <th scope="col">Tag Issued</th>
                            <th scope="col">Tag Returned?</th>
                        </tr>
                    </thead>
                    <tbody>
                            <AttendanceList staffs={MOCK_DATA}/>        
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AttendanceForm;