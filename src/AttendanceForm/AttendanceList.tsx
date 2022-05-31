import React from "react";
import { Row } from "react-bootstrap";
import { Staff } from "../Data/Staff";
import StaffInline from './StaffInline';

interface StaffListProps {
    staffs: Staff[]
}

function AttendanceList({staffs}: StaffListProps) {
        const items = staffs.map(staff => (
        <div>
            <StaffInline staff={staff}></StaffInline>
        </div>
        ));
        return <div>{items}</div>
}

export default AttendanceList;