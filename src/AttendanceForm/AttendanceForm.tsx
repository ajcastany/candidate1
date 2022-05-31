import React from "react";
import AttendanceList from "./AttendanceList";
import {MOCK_DATA} from "../Data/TEST/MockStaff"

function AttendanceForm() {
    console.log(JSON.stringify(MOCK_DATA, null, ''));
    return (
        <div>
            <h2>Attendance Form</h2>
            <table className="table">
                <thead>
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
    );
}

export default AttendanceForm;