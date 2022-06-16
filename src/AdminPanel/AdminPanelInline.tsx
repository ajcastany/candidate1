import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import internal from 'stream';
import { IDailyFormNamDep, StaffApiService } from '../Api/api.service';
import {Staff} from '../Data/Staff';
import AddRoomModal from './Modals/AddRoomModal';
import DeleteRowModal from './Modals/DeleteRowModal';
import EditTagIssueModal from './Modals/EditTagIssueModal';
import EditTagReturnedModal from './Modals/EditTagReturnedModal';
import EditTimeINModal from './Modals/EditTimeINModal';
import EditTimeModal from './Modals/EditTimeINModal';
import EditTimeOUTModal from './Modals/EditTimeOUTModal';

interface StaffInlineProps {
    staff: Staff
    updateParentAdmin: () => void
    refreshChild: boolean
}

function AdminPanelInline(props: StaffInlineProps) {
    const [staffState, setStaffForm]:[Staff, (
        staffState: Staff) => void ] = useState(props.staff);

    const [refreshThis, setRefreshThis] = useState(props.refreshChild);

    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const showAddRoomModel = async () => {
        setShowAddRoomModal(true);
    }
    const showEditRoomModel = async () => {
        setShowAddRoomModal(true);
    }
    const [showIssueTagModal, setShowIssueTagModal] = useState(false);
    const showIssueTagModel = async () => {
        setShowIssueTagModal(true);
    }

    const [showTagReturnedModal, setShowTagRetunedModal] = useState(false);
    const showTagReturnedModel = async () => {
        setShowTagRetunedModal(true);
    }
    
    const [showEditTimeINModal, setShowEditTimeINModal] = useState(false);
    //const [modalTimeInOrOut, setModalTimeInOrOut] = useState('');
    const showEditTimeModel = async () => {
        setShowEditTimeINModal(true);
    }

    const [showEditTimeOUTModal, setShowEditTimeOUTModal] = useState(false);
    const showEditTimeOUTModel = async () => {
        setShowEditTimeOUTModal(true);
    }
    
    const [showDeleteEntryModal, setDeleteEntryModal] = useState(false);
    const showDeleteEntryModel = async() => {
        setDeleteEntryModal(true);
    }

    
    // Modal Functions

    function UpdateComponent(id: number | undefined) {
        function ParseJSON(data:IDailyFormNamDep) {
            var dataTXT = JSON.stringify(data);
            var dataJSON = JSON.parse(dataTXT);
            var staff:Staff = new Staff( {
                id: dataJSON.id,
                day: dataJSON.day,
                name: dataJSON.name_dep.staff_name,
                department: dataJSON.name_dep.staff_dept,
                meetingRoom: dataJSON.room,
                timeIn: (dataJSON.time_in === 'None') ? "None" : dataJSON.time_in,
                timeOut: (dataJSON.time_out === 'None') ? "None" : dataJSON.time_out,
                tagIssue: dataJSON.tag,
                tagReturned: dataJSON.tag_ret
            });
            let staffInline:Staff = staff;
            setStaffForm(staffInline);
        }
        StaffApiService.getRowByID(id).then((data) => {
            ParseJSON(data);

        });
    }

    function CloseAddRoomModal() {
        setShowAddRoomModal(false);
        return false;

    }

    function CloseIssueTagModal() {
        setShowIssueTagModal(false);
        return false;
    }

    function CloseTagReturnedModal() {
        setShowTagRetunedModal(false);
        return false;
    }

    function CloseEditTimeINModal() {
        setShowEditTimeINModal(false);
        return false
    }

    function CloseEditTimeOUTModal() {
        setShowEditTimeOUTModal(false);
        return false;
    }
    function CloseDeleteEntryModal() {
        setDeleteEntryModal(false);
        return false;
    }

    //Inline Renders
    function formatDateToTimeIN(time:string) {
        if (time ==='None') {
            return (<Button variant='success' onClick={() => showEditTimeModel()}>Time In</Button>)
        }
        else {
            let timeInFormat = staffState.timeIn.substring(0,5);
            return (<>{timeInFormat} <Button variant='secondary' size='sm' onClick={() => showEditTimeModel()}>
                Edit</Button></>)
        }
    }
    function renderMeetingRoom() {
        if (staffState.meetingRoom === '') {
            return(<Button onClick={showAddRoomModel}>Add Room</Button>)
        }
        if (staffState.meetingRoom !== '') {
            return(<>{staffState.meetingRoom} <Button
            variant='secondary' size='sm' onClick={showEditRoomModel}>
                Edit
                </Button></>)
        }
    }

    function formatDateToTimeOut(time:string) {
        if (time === 'None') {
            return (<Button variant='danger' 
            onClick={() => showEditTimeOUTModel()}>Time Out</Button>)
        }
        else {
            let timeOutFormat = staffState.timeOut.substring(0,5);
            return(<>{timeOutFormat} <Button variant='secondary' size='sm' 
            onClick={() => showEditTimeOUTModel()}>
                Edit
            </Button></>)
        }
    }
    function formatTagRender(tag:string) {
        //console.log("the tag is: "+ tag);
        if (tag === '') {
            return(<Button variant='primary' onClick={showIssueTagModel}>
                Issue
            </Button>);
        }
        else {
            return (
                <>{staffState.tagIssue} <Button variant='secondary' onClick={showIssueTagModel} size='sm'>
                    Edit
                    </Button></>
            );
        }
    }
    function formatTagReturned() {
        var tagRetStr = staffState.tagReturned.toString();
        var tag = staffState.tagIssue;
        if (tagRetStr ==='false' && tag === '') {
            return ('')
        }
        if (tagRetStr === 'false' && tag!=='' && staffState.timeOut !== 'None') {
            return (<>No <Button variant='danger' size='sm' onClick={showTagReturnedModel}>Edit</Button></>)
        }
        if (tagRetStr === 'false' && tag!=='' && staffState.timeOut === 'None') {
            return (<Button variant='primary' onClick={showTagReturnedModel}>Edit</Button>)
        }
        if (tagRetStr === 'true') {
            return (<>Yes <Button variant='success' size='sm' onClick={showTagReturnedModel}>Edit</Button></>);
        }
    }

    return (
        <React.Fragment>
            <AddRoomModal
                id={staffState.id}
                name={staffState.name}
                showModal={showAddRoomModal}
                closeModal={() => CloseAddRoomModal()}
                updateParent={UpdateComponent}
            />
            <EditTagIssueModal 
            id={staffState.id}
            showModal={showIssueTagModal}
            closeModal={() => CloseIssueTagModal()}
            updateParent={UpdateComponent}
            />
            <EditTagReturnedModal 
            id={staffState.id}
            tag={staffState.tagIssue}
            showModal={showTagReturnedModal}
            closeModal={() => CloseTagReturnedModal()}
            updateParent={UpdateComponent}
            />
            <EditTimeINModal
                id={staffState.id}
                timeIN={staffState.timeIn}
                timeOUT={staffState.timeOut}
                showModal={showEditTimeINModal}
                closeModal={() => CloseEditTimeINModal()}
                updateParent={UpdateComponent}
            />
            <EditTimeOUTModal 
                id={staffState.id}
                timeIN={staffState.timeIn}
                timeOUT={staffState.timeOut}
                showModal={showEditTimeOUTModal}
                closeModal={() => CloseEditTimeOUTModal()}
                updateParent={UpdateComponent}
            />
            <DeleteRowModal 
                id={staffState.id}
                name={staffState.name}
                showModal={showDeleteEntryModal}
                closeModal={() => CloseDeleteEntryModal()}
                updateParentAdmin={props.updateParentAdmin}
            />
            <tr>
                <td>{staffState.name}</td>
                <td>{staffState.department}</td>
                <td>{renderMeetingRoom()}</td>
                <td>{formatDateToTimeIN(staffState.timeIn)}</td>
                <td>{formatDateToTimeOut(staffState.timeOut)}</td>
                <td>{formatTagRender(staffState.tagIssue)}</td>
                <td>{formatTagReturned()}</td> 
                <td><Button variant='danger' onClick={showDeleteEntryModel}>Delete</Button></td>
            </tr>
        </React.Fragment>
    );
}

export default AdminPanelInline;