import React from "react";
import {Staff} from '../Data/Staff';

function formatDateToTime(date:Date) {
    return new Date(date).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})
}

function boolToString(bool:boolean) {
    return bool.toString();
}

interface StaffInlineProps {
    staff: Staff;
}
function StaffInline(props: StaffInlineProps) {
    const { staff } = props;
    return (
        <React.Fragment>
            <tr>
                <th scope='row'>{staff.id}</th>
                <td>{staff.name}</td>
                <td>{staff.department}</td>
                <td>{staff.meetingRoom}</td>
                <td>{formatDateToTime(staff.timeIn)}</td>
                <td>{formatDateToTime(staff.timeOut)}</td>
                <td>{staff.tagIssue}</td>
                <td>{boolToString(staff.tagReturned)}</td>
                
            </tr>
        </React.Fragment>
    )
}

export default StaffInline;