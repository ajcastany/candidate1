import React, {useState} from "react";
import { Button } from "react-bootstrap";
import {Staff} from '../Data/Staff';
import TagModal from '../AttendanceForm/TagModal';
import {StaffApiService, IDailyFormNamDep} from "../Api/api.service"


interface StaffInlineProps {
    staff: Staff;
}

function StaffInline(props: StaffInlineProps) {
    const [showTagModal, setTagModal] = useState(false);
    const showTagModel = () => {
        setTagModal(true);
        console.log(showTagModal)
    }

    var showTag:boolean =false;
    let varl:string = '';
    var { staff } = props;
    const [staffState, setStaffForm]:[Staff, (
        staff: Staff) => void ] = useState(staff);

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
            return (<Button>Returned?</Button>)
        }
        if (tagString == 'true') {
            return tagRet
        }
    }

    function TagRender(tag:string) {
        if (tag == '') {
            //console.log("tag not available: " + tag);
            return (<Button variant='primary' 
            onClick={showTagModel}>Issue</Button>);
        }
        else {
            console.log("should render");
            return (
                <>{tag} <Button variant='secondary' size="sm"
                onClick={showTagModel}>Edit</Button></>
                );
        }
    }

    function boolToString(bool:boolean) {
        return bool.toString();
    }

    function CloseModal(){
        setTagModal(false);
        return false;
    }

  function UpdateComponent(id: number | undefined) {
        console.log("this id: " + id);
        var staff:Staff = new Staff();
/*         function useForceUpdate() {
            const [value, setvalue] = useState(0);
            return () => setvalue(value => value+1);
        } */
        function BuildNewStaff(data:IDailyFormNamDep) {
            var dataTXT = JSON.stringify(data)
            var dataJSON = JSON.parse(dataTXT)
            staff.id = dataJSON[0].id;
            staff.name = dataJSON[1];
            staff.department = dataJSON[2];
            staff.meetingRoom = dataJSON[0].room
            staff.timeIn = (dataJSON[0].time_in == undefined) ? new Date(0) : dataJSON[0].time_in 
            staff.timeOut = (dataJSON[0].time_out == undefined) ? new Date(0) : dataJSON[0].time_out
            staff.tagIssue = dataJSON[0].tag
            staff.tagReturned = dataJSON[0].tag_ret

            return staff
        }
        StaffApiService.getDayById(id).then((data) => staff = BuildNewStaff(data)); 
        //Addeffect here? update staff const
        let staffInline:StaffInlineProps = {staff};
        
        //staffInline.staff = staff;
        setStaffForm(staffInline);
    }

//const showModal = () => {}


    return (
        <React.Fragment>
            <TagModal id={staffState.staff.id} 
            showModal={showTagModal} 
            closeModal={() => CloseModal()} 
            updateParent={UpdateComponent}
            />
            <tr>
                <th scope='row'>{staffState.staff.id}</th>
                <td>{staffState.staff.name}</td>
                <td>{staffState.staff.department}</td>
                <td>{staffState.staff.meetingRoom}</td>
                <td>{formatDateToTimeIN(staffState.staff.timeIn)}</td>
                <td>{formatDateToTimeOUT(staffState.staff.timeOut)}</td>
                <td>{TagRender(staffState.staff.tagIssue)}</td>
                <td>{TagReturnedEmpty(staffState.staff.tagReturned, staffState.staff.tagIssue)}</td>
                
            </tr>
        </React.Fragment>
    )
}

export default StaffInline;