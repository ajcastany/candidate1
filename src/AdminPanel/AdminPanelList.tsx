import React, {useEffect, useState} from 'react';
import {Staff} from "../Data/Staff";
import AdminPanelInline from './AdminPanelInline';

interface StaffListProps {
    staffs: Staff[]
    updateParentAdmin: () => void
    refreshChild: boolean
}

function AdminPanelList(props: StaffListProps) {
    const [refreshChildren, setRefreshChildren] = useState<boolean>();
    const [itemsS, setItems]:[Staff[], (items:Staff[]) => void] = useState<Staff[]>([]);

    useEffect(() => {
        console.log("here: " + itemsS);
        setRefreshChildren(props.refreshChild)
        setItems(props.staffs)
    })
    //USE this: https://stackoverflow.com/questions/59636937/react-useeffect-and-return-render
    useEffect(() => {
        setItems(props.staffs);
    },[refreshChildren]);

    console.log(itemsS );
    const items = itemsS.map(staff => (
        <React.Fragment key={staff.id}>
                <AdminPanelInline staff={staff}
                updateParentAdmin={props.updateParentAdmin}
                refreshChild={props.refreshChild} 
                />
        </React.Fragment>)
    )

    return <React.Fragment>{items}</React.Fragment>
    
    
    
}

export default AdminPanelList;