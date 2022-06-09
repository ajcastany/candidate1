import React from "react";
import { Staff } from "../Data/Staff";
import StaffInline from './StaffInline';

interface StaffListProps {
    staffs: Staff[]
}

function AttendanceList({staffs}: StaffListProps) {
        const items = staffs.map(staff => (
        <React.Fragment key={staff.id}>
                <StaffInline staff={staff}></StaffInline>            
        </React.Fragment>
        ));
        return <React.Fragment>{items}</React.Fragment>
}

export default AttendanceList;