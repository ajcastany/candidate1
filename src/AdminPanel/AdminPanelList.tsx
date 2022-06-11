import React from 'react';
import {Staff} from "../Data/Staff";
import AdminPanelInline from './AdminPanelInline';

interface StaffListProps {
    staffs: Staff[]
}

function AdminPanelList({staffs}: StaffListProps) {
    const items = staffs.map(staff => (
        <React.Fragment key={staff.id}>
                <AdminPanelInline staff={staff}/>
        </React.Fragment>)
    )

    return <React.Fragment>{items}</React.Fragment>
    
    
    
}

export default AdminPanelList;