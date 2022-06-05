import React from "react";
import { Button } from "react-bootstrap";
import {Staff} from '../Data/Staff';

function formatDateToTimeIN(date:Date) {
    //console.log(new Date(date) == new Date(0));
    if (date.toISOString() == new Date(0).toISOString()) {
        return (<Button>
            IN
        </Button>);
    }
    else {
        return new Date(date).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
    } 
    
}
function formatDateToTimeOUT(date:Date) {
    //console.log(date.toISOString() === new Date(0).toISOString());
    //console.log(new Date(date) == new Date(0));
    if (date.toISOString() == new Date(0).toISOString()) {
        return (<Button>
            OUT
        </Button>);
    }
    else {
        return new Date(date).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
    } 
    
}

function TagReturnedEmpty(tagRet:boolean, tag:string) {
    var tagString = tagRet.toString();
    if (tagString == 'false' && tag == '') {
        return (<Button>Returned?</Button>)
    }
    if (tagString == 'false') {
        return ""
    }
    if (tagString == 'true') {
        return 
    }
}

function TagRender(tag:string) {
    if (tag == '') {
        return (<Button>Issue</Button>);
    }
    else {
        return (tag);
    }
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
        <React.Fragment>
            <tr>
                <th scope='row'>{staff.id}</th>
                <td>{staff.name}</td>
                <td>{staff.department}</td>
                <td>{staff.meetingRoom}</td>
                <td>{formatDateToTimeIN(staff.timeIn)}</td>
                <td>{formatDateToTimeOUT(staff.timeOut)}</td>
                <td>{TagRender(staff.tagIssue)}</td>
                <td>{TagReturnedEmpty(staff.tagReturned, staff.tagIssue)}</td>
                
            </tr>
        </React.Fragment>
    )
}

export default StaffInline;