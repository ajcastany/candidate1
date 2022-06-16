import React, {useEffect, useState} from 'react';
import {Staff} from "../Data/Staff";
import AdminPanelInline from './AdminPanelInline';

interface StaffListProps {
    staffs: Staff[]
    updateParentAdmin: () => void
    refreshChild: boolean
}

function AdminPanelList(props: StaffListProps) {
    const [refreshChildren, setRefreshChildren] = useState(props.refreshChild);
    const [itemsS, setItems]:[Staff[], (items:Staff[]) => void] = useState<Staff[]>([]);

    useEffect(() => {
        setItems(props.staffs)
    }, [])
    useEffect(() => {
        setItems(props.staffs);
    },[refreshChildren]);

    const items = props.staffs.map(staff => (
        <React.Fragment key={staff.id}>
                <AdminPanelInline staff={staff}
                updateParentAdmin={props.updateParentAdmin}
                refreshChild={refreshChildren} 
                />
        </React.Fragment>)
    )

    return <React.Fragment>{items}</React.Fragment>
    
    
    
}

export default AdminPanelList;