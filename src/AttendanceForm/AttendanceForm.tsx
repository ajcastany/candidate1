import React from "react";
import AttendanceList from "./AttendanceList";
import {MOCK_DATA} from "../Data/TEST/MockStaff"

function AttendanceForm() {
    console.log(JSON.stringify(MOCK_DATA, null, ''));
    return (
        <div>
            <h2>Attendance Form</h2>
            <AttendanceList staffs={MOCK_DATA}/>
        </div>
    );
}

export default AttendanceForm;