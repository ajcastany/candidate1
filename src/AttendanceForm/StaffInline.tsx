import React, {useState} from "react";
import { Button } from "react-bootstrap";
import {Staff} from '../Data/Staff';
import TagModal from '../AttendanceForm/TagModal';
import {StaffApiService, IDailyFormNamDep, IDailyForm} from "../Api/api.service"
import TagReturnedModal from "./TagReturnedModal";


interface StaffInlineProps {
    staff: Staff;
}



function StaffInline(props: StaffInlineProps) {
    const [showTagModal, setTagModal] = useState(false);
    const [showTagReturnedModal, setTagReturnedModal] = useState(false);
    const showTagReturnedModel = async () => {
        setTagReturnedModal(true);
        console.log("show tag returned: true");
    }
    const showTagModel = () => {
        setTagModal(true);
        console.log(showTagModal)
    }

    var { staff } = props;
    const [staffState, setStaffForm]:[StaffInlineProps, (
        staffState: StaffInlineProps) => void ] = useState({staff});

    function SubmitTimeInValue() {
        let time:string = new Date().toLocaleTimeString('en-GB');
        //console.log(time);
        
        let data:IDailyForm ={
            day: staffState.staff.day,
            id: staffState.staff.id,
            name: 0,
            room: '',
            time_in: time,
            time_out: staffState.staff.timeOut,
            tag: staffState.staff.tagIssue,
            tag_ret: staffState.staff.tagReturned
        }
        var dataTXT = JSON.stringify(data);
        var dataJSON = JSON.parse(dataTXT);
        StaffApiService.addTimeInOutJSON(dataJSON).then (
            res => {
                console.log(res);
                UpdateComponent(staffState.staff.id);
            }
        )
        console.log(time);
        }
        
    function SubmitTimeOutValue() {
        let time:string = new Date().toLocaleTimeString('en-GB');
        //console.log(time);
        
        let data:IDailyForm ={
            day: staffState.staff.day,
            id: staffState.staff.id,
            name: 0,
            room: '',
            time_in: staffState.staff.timeIn,
            time_out: time,
            tag: staffState.staff.tagIssue,
            tag_ret: staffState.staff.tagReturned
        }
        var dataTXT = JSON.stringify(data);
        var dataJSON = JSON.parse(dataTXT);
        StaffApiService.addTimeInOutJSON(dataJSON).then (
            res => {
                console.log(res);
                if (staffState.staff.tagIssue !== '') {
                    showTagReturnedModel()
                } else {
                    UpdateComponent(staffState.staff.id);
                }
                
            }
        )
       
        //console.log(time);   
        }
    function formatDateToTimeIN(date:string) {
        //console.log(new Date(date) == new Date(0));
        //console.log(date);
        if (date === 'None') {
            return (<Button variant='success'onClick={SubmitTimeInValue}>
                IN
            </Button>);
        }
        else {
            let timeINFormat = staffState.staff.timeIn.substring(0, 5);
            return timeINFormat;
            //return new Date(date).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
        } 
        
    }
    function formatDateToTimeOUT(date:string) {
        //console.log(date.toISOString() === new Date(0).toISOString());
        //console.log(new Date(date) == new Date(0));
        if (date === 'None') {
            return (<Button variant='danger' onClick={SubmitTimeOutValue}>
                OUT
            </Button>);
        }
        else {
            let timeOutFormat = staffState.staff.timeOut.substring(0,5);
            //console.log(timeOutFormat);
            return timeOutFormat;
            //return new Date(date).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
        } 

        
    }

    function TagReturnedEmpty(tagRet:boolean, tag:string) {
        var tagString = staffState.staff.tagReturned.toString();
        if (tagString == 'false' && tag === '') {
            return ('')
        }
        if (tagString == 'false' && tag !== '' && staffState.staff.timeOut !='None') {
            return ("No")
        }
        if (tagString === 'true') {
            return ("Yes")
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

    function CloseTagModal(){
        setTagModal(false);
        return false;
    }

    function CloseTagReturnedModal() {
        setTagReturnedModal(false);
        UpdateComponent(staffState.staff.id);
        return false;
    }
    
  function UpdateComponent(id: number | undefined) {

        function ParseJSON(data:IDailyFormNamDep) {
            
            var dataTXT = JSON.stringify(data);
            var dataJSON = JSON.parse(dataTXT);
            console.log(dataJSON.time_in);
            var staff:Staff = new Staff({
            id: dataJSON.id,
            name: dataJSON.name_dep.staff_name,
            department: dataJSON.name_dep.staff_dept,
            meetingRoom: dataJSON.room,
            timeIn: (dataJSON.time_in === 'None') ? "None" : dataJSON.time_in,
            timeOut:(dataJSON.time_out === 'None') ? "None" : dataJSON.time_out,
            tagIssue: dataJSON.tag,
            tagReturned: dataJSON.tag_ret});

            let staffInline:StaffInlineProps = {staff};
            console.log(staffInline.staff.timeIn.toString());
            setStaffForm(staffInline);
        }
        
        StaffApiService.getRowByID(id).then((data) => ParseJSON(data));
    }

    return (
        <React.Fragment>
            <TagModal id={staffState.staff.id} 
            showModal={showTagModal} 
            closeModal={() => CloseTagModal()} 
            updateParent={UpdateComponent}
            />
            <TagReturnedModal id={staffState.staff.id}
            //Change this to hook showTagReturnedModal when done debuggin'
            showModal={showTagReturnedModal}
            closeModal={() => CloseTagReturnedModal()}
            tag={staffState.staff.tagIssue}
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