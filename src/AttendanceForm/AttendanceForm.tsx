import React, {useState, useEffect} from "react";
import AttendanceList from "./AttendanceList";
import { StaffApiService, DailyForm } from "../Api/api.service";
import { Staff } from "../Data/Staff";

import {MOCK_DATA} from "../Data/TEST/MockStaff"

function BuildRowData(data:DailyForm[]) {
    if (data.length == 0) {
        console.log("no data");
        return;
    }

    var staff_list:Staff[] = [];
    //var dataJSON = JSON.stringify(data);
    //console.log(dataJSON);

    data.forEach(element => {
        var elementTXT = JSON.stringify(element);
        var elementJSON = JSON.parse(elementTXT);
        console.log(elementJSON[0].id);
         var staff:Staff = new Staff({
            id: elementJSON[0].id,
            name: elementJSON[1],
            department: elementJSON[2],
            meetingRoom: elementJSON[0].meetingRoom,
            timeIn: elementJSON[0].timeIn,
            timeOut: elementJSON[0].timeOut,
            tagIssue: elementJSON[0].tagIssue,
            tagReturned: elementJSON[0].tagReturned
        });
        console.log(staff);
    });
}

function AttendanceForm() {
    //console.log(JSON.stringify(MOCK_DATA, null, ''));
    const  [daily_forms, setDailyForms]:[DailyForm[], (
        daily_forms: DailyForm[]) => void] = useState<DailyForm[]>([]);
    useEffect( () => {
        StaffApiService.getAllDays().then((data) => setDailyForms(data));
    }, [])
    //console.log(daily_forms);
    BuildRowData(daily_forms);
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