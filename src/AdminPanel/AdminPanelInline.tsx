import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { IDailyFormNamDep, StaffApiService } from '../Api/api.service';
import {Staff} from '../Data/Staff';
import AddRoomModal from './Modals/AddRoomModal';

interface StaffInlineProps {
    staff: Staff
}
function AdminPanelInline(props: StaffInlineProps) {
    var {staff} = props;
    const [staffState, setStaffForm]:[StaffInlineProps, (
        staffState: StaffInlineProps) => void ] = useState({staff});

    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const showAddRoomModel = async () => {
        setShowAddRoomModal(true);
    }
    const showEditRoomModel = async () => {
        setShowAddRoomModal(true);
    }
    // Modal Functions

    function UpdateComponent(id: number | undefined) {
        function ParseJSON(data:IDailyFormNamDep) {
            var dataTXT = JSON.stringify(data);
            var dataJSON = JSON.parse(dataTXT);
            console.log("dataJson: " + dataJSON.room);
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
            console.log("staffName: " + staff.meetingRoom);
            let staffInline:StaffInlineProps = {staff};

            setStaffForm(staffInline);
            console.log("meetingRoom" + staffInline.staff.meetingRoom.toString());

        }
        console.log("Updating componenet");
        StaffApiService.getRowByID(id).then((data) => {
            ParseJSON(data);

        });
    }

    function CloseAddRoomModal() {
        console.log("here");
        setShowAddRoomModal(false);
        return false;

    }
    //Inline Renders
    function formatDateToTimeIN(time:string) {
        if (time ==='None') {
            return (<Button variant='success'>Time In</Button>)
        }
        else {
            let timeInFormat = staffState.staff.timeIn.substring(0,5);
            return (<>{timeInFormat} <Button variant='secondary' size='sm'>
                Edit</Button></>)
        }
    }
    function renderMeetingRoom() {
        if (staffState.staff.meetingRoom === '') {
            return(<Button onClick={showAddRoomModel}>Add Room</Button>)
        }
        if (staffState.staff.meetingRoom !== '') {
            return(<>{staffState.staff.meetingRoom} <Button
            variant='secondary' size='sm' onClick={showEditRoomModel}>
                Edit
                </Button></>)
        }
    }

    function formatDateToTimeOut(time:string) {
        if (time === 'None') {
            return (<Button variant='danger'>Time Out</Button>)
        }
        else {
            let timeOutFormat = staffState.staff.timeOut.substring(0,5);
            return(<>{timeOutFormat} <Button variant='secondary' size='sm'>
                Edit
            </Button></>)
        }
    }
    function formatTagRender(tag:string) {
        console.log("the tag is: "+ tag);
        if (tag === '') {
            return(<Button variant='primary'>
                Issue
            </Button>);
        }
        else {
            return (
                <>{staffState.staff.tagIssue} <Button variant='secondary' size='sm'>
                    Edit
                    </Button></>
            );
        }
    }
    function formatTagReturned() {
        var tagRetStr = staffState.staff.tagReturned.toString();
        var tag = staffState.staff.tagIssue;
        if (tagRetStr ==='false' && tag === '') {
            return (<Button variant='primary'>Edit</Button>)
        }
        if (tagRetStr === 'false' && tag!=='' && staffState.staff.timeOut !== 'None') {
            return (<>No <Button variant='secondary' size='sm'>Edit</Button></>)
        }
        if (tagRetStr === 'false' && tag!=='' && staffState.staff.timeOut === 'None') {
            return (<Button variant='secondary'>Edit</Button>)
        }
        if (tagRetStr === 'true') {
            return (<>Yes <Button variant='secondary' size='sm'>Edit</Button></>);
        }
    }

    return (
        <React.Fragment>
            <AddRoomModal
                id={staffState.staff.id}
                name={staffState.staff.name}
                showModal={showAddRoomModal}
                closeModal={() => CloseAddRoomModal()}
                updateParent={UpdateComponent}
            />
            <tr>
                <td>{staffState.staff.name}</td>
                <td>{staffState.staff.department}</td>
                <td>{renderMeetingRoom()}</td>
                <td>{formatDateToTimeIN(staffState.staff.timeIn)}</td>
                <td>{formatDateToTimeOut(staffState.staff.timeOut)}</td>
                <td>{formatTagRender(staffState.staff.tagIssue)}</td>
                <td>{formatTagReturned()}</td> 
                <td><Button variant='danger'>Delete</Button></td>
            </tr>
        </React.Fragment>
    );
}

export default AdminPanelInline;