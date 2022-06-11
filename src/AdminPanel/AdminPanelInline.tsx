import React, { useState } from 'react';
import {Staff} from '../Data/Staff';

interface StaffInlineProps {
    staff: Staff
}
function AdminPanelInline(props: StaffInlineProps) {
    var {staff} = props;
    const [staffState, setStaffForm]:[StaffInlineProps, (
        staffState: StaffInlineProps) => void ] = useState({staff});


    return (
        <React.Fragment>
            <tr>
                <td>{staffState.staff.name}</td>
                <td>{staffState.staff.department}</td>
                <td>{staffState.staff.meetingRoom}</td>
                <td>{staffState.staff.timeIn}</td>
                <td>{staffState.staff.timeOut}</td>
                <td>{staffState.staff.tagIssue}</td>
                <td>{staffState.staff.tagReturned}</td> 
            </tr>
        </React.Fragment>
    );
}

export default AdminPanelInline;