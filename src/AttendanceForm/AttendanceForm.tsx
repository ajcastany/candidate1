import React, {useState, useEffect} from "react";
import AttendanceList from "./AttendanceList";
import { StaffApiService, IDailyFormNamDep } from "../Api/api.service";
import { Staff } from "../Data/Staff";

import {MOCK_DATA} from "../Data/TEST/MockStaff"

function BuildRowData(data:IDailyFormNamDep[]) {
    var staff_list:Staff[] = [];
    if (data.length == 0) {
        console.log("no data");
        return staff_list;
    }

    function CheckDateNotNull(json:string) {
        //DB date column is never null;
        if (json == undefined) {
            return new Date(0);
        } else {
            return json;
        }
    }

    //console.log(data);
    //var dataJSON = JSON.stringify(data);
    //console.log(dataJSON);

    data.forEach(element => {
        var elementTXT = JSON.stringify(element);
        var elementJSON = JSON.parse(elementTXT);
        console.log(elementJSON);
        CheckDateNotNull(elementJSON.timeIn);
         var staff:Staff = new Staff({
            id: elementJSON.id,
            name: elementJSON.name_dep.staff_name,
            department: elementJSON.name_dep.staff_dept,
            meetingRoom: elementJSON.room,
            timeIn:  CheckDateNotNull(elementJSON.time_in),
            timeOut: CheckDateNotNull(elementJSON.time_out),
            tagIssue: elementJSON.tag,
            tagReturned: elementJSON.tag_ret
        });
        staff_list.push(staff);
    });
    console.log(staff_list);
    return staff_list;
}

function AttendanceForm() {
    //console.log(JSON.stringify(MOCK_DATA, null, ''));
    const  [daily_forms, setDailyForms]:[IDailyFormNamDep[], (
        daily_forms: IDailyFormNamDep[]) => void] = useState<IDailyFormNamDep[]>([]);
    useEffect( () => {
        StaffApiService.getAllDays().then((data) => setDailyForms(data));
    }, [])
    //console.log(daily_forms);
    let rowData:Staff[] = BuildRowData(daily_forms);
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
                            <AttendanceList staffs={rowData}/>        
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AttendanceForm;