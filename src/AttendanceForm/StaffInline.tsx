import React from "react";
import {Staff} from '../Data/Staff';

function formatDateToTime(date:Date) {
    return date.getHours + ':' + date.getMinutes
}

interface StaffInlineProps {
    staff: Staff;
}
function StaffInline(props: StaffInlineProps) {
    const { staff } = props;
    return (
        <div>
            <h5>id</h5>
            <h5>{staff.name}</h5>
            <h5>{staff.department}</h5>
            <h5>{staff.meetingRoom}</h5>
            <h5>{formatDateToTime(staff.timeIn)}</h5>
            <h5>{formatDateToTime(staff.timeOut)}</h5>
            <h5>{staff.tagIssue}</h5>
            <h5>{staff.tagReturned}</h5>
        </div>
    )
}

export default StaffInline;