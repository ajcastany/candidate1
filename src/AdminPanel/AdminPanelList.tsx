import React from 'react';
import {Staff} from "../Data/Staff";
import AdminPanelInline from './AdminPanelInline';

interface StaffListProps {
    staffs: Staff[]
    updateParentAdmin: () => void
}

function AdminPanelList(props: StaffListProps) {
    const items = props.staffs.map(staff => (
        <React.Fragment key={staff.id}>
                <AdminPanelInline staff={staff}
                updateParentAdmin={props.updateParentAdmin}
                />
        </React.Fragment>)
    )

    return <React.Fragment>{items}</React.Fragment>
    
    
    
}

export default AdminPanelList;