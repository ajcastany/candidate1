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
    const [staffState, setStaffForm]:[StaffInlineProps, (
        staffState: StaffInlineProps) => void ] = useState({staff});

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
        
/*         function useForceUpdate() {
            const [value, setvalue] = useState(0);
            return () => setvalue(value => value+1);
        } */
        function ParseJSON(data:IDailyFormNamDep) {
            
            var dataTXT = JSON.stringify(data);
            var dataJSON = JSON.parse(dataTXT);
            console.log(dataJSON.id);
            var staff:Staff = new Staff({
            id: dataJSON.id,
            name: dataJSON.name_dep.staff_name,
            department: dataJSON.name_dep.staff_dept,
            meetingRoom: dataJSON.room,
            timeIn: (dataJSON.time_in == undefined) ? new Date(0) : dataJSON[0].time_in,
            timeOut:(dataJSON.time_out == undefined) ? new Date(0) : dataJSON[0].time_out,
            tagIssue: dataJSON.tag,
            tagReturned: dataJSON.tag_ret});
            let staffInline:StaffInlineProps = {staff};
            setStaffForm(staffInline);
        }
/*         function BuildNewStaff(dataJSON:JSON) {
            staff.id = dataJSON.id;
            staff.name = dataJSON.name_dep.staff_name;
            staff.department = dataJSON.name_dep.staff_dept;
            staff.meetingRoom = dataJSON.room
            staff.timeIn = (dataJSON.time_in == undefined) ? new Date(0) : dataJSON[0].time_in 
            staff.timeOut = (dataJSON.time_out == undefined) ? new Date(0) : dataJSON[0].time_out
            staff.tagIssue = dataJSON.tag
            staff.tagReturned = dataJSON.tag_ret

            return staff
        } */
        //StaffApiService.getDayById(id).then((data) => staff = BuildNewStaff(data)); 
        StaffApiService.getDayById(id).then((data) => ParseJSON(data));
        //Addeffect here? update staff const
        
       
        
        //staffInline.staff = staff;

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