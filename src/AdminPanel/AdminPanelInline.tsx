import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import {Staff} from '../Data/Staff';

interface StaffInlineProps {
    staff: Staff
}
function AdminPanelInline(props: StaffInlineProps) {
    var {staff} = props;
    const [staffState, setStaffForm]:[StaffInlineProps, (
        staffState: StaffInlineProps) => void ] = useState({staff});

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
            return(<Button>Add Room</Button>)
        }
        if (staffState.staff.meetingRoom !== '') {
            return(<>{staffState.staff.meetingRoom} <Button
            variant='secondary' size='sm'>Edit</Button></>)
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