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
        <div>
            <p>ID: {staff.id}</p>
            <p>Name: {staff.name}</p>
            <p>Dpto: {staff.department}</p>
            <p>Room: {staff.meetingRoom}</p>
            <p>IN: {formatDateToTime(staff.timeIn)}</p>
            <p>OUT: {formatDateToTime(staff.timeOut)}</p>
            <p>TAG:{staff.tagIssue}</p>
            <p>Ret: {boolToString(staff.tagReturned)}</p>
        </div>
    )
}

export default StaffInline;