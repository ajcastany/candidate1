import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { IDailyFormNamDep, StaffApiService } from "../Api/api.service";
import AdminPanelList from "./AdminPanelList";
import { Staff } from "../Data/Staff";
import TagModal from "../AttendanceForm/TagModal";
import AddNewRowModal from "./Modals/AddNewRowModal";

function AdminPanel() {
    const [attendanceDay, setAttendanceDay]= useState(new Date().toISOString().substring(0,10))
    //debug:
    //const [attendanceDay, setAttendanceDay]= useState('2000-01-01')
    console.log("DATE: ", attendanceDay);
    const [daily_forms, setDailyForms]:[IDailyFormNamDep[], (
        daily_forms: IDailyFormNamDep[]) => void] = useState<IDailyFormNamDep[]>([]);
        
    const [rowsData, setRowsData]:[Staff[], (
        rowsData: Staff[]) => void] = useState<Staff[]>([]);
    
    const [showAddNewRowModal, setShowAddNewRowModal] = useState(false);
    const showAddNewRowModel = async () => {
        setShowAddNewRowModal(true);
    }


    const [refreshState, setRefreshState] = useState(false);
    const toggleRefresh = ()  => {
        setRefreshState(s => !s);
        //setRowsData(BuildRowData(daily_forms));
        //OpenDay();
    };

    //console.log(daily_forms)
    useEffect( () =>{
        console.log("st: " + refreshState.toString());
        StaffApiService.getDay(attendanceDay).then( (data) => {
            console.log("data:" + (data.toString()));
            setDailyForms(data)
            });         
    }, [refreshState]);

    useEffect( () => {
        StaffApiService.getDay(attendanceDay).then( (data) => {
            console.log("data:" + (data.toString()));
            setDailyForms(data)
            })
        }, []);

    useEffect( () => {
        console.log("setRows" + daily_forms.toString());
        var rowDat = BuildRowData(daily_forms)
        setRowsData(rowDat);
    }, [daily_forms])
    
    function BuildRowData(data:IDailyFormNamDep[]) {
        var staff_list: Staff[] = [];
    
        if (data.length == 0) {
            console.log("No data");
            return staff_list;
        }
        //console.log("length: " + data.toString());
        data.forEach(element => {
            var elementTXT = JSON.stringify(element);
            var elementJSON = JSON.parse(elementTXT);
            let staff:Staff = new Staff({
                id: elementJSON.id,
                name: elementJSON.name_dep.staff_name,
                department: elementJSON.name_dep.staff_dept,
                meetingRoom: elementJSON.room,
                timeIn: elementJSON.time_in,
                timeOut: elementJSON.time_out,
                tagIssue: elementJSON.tag,
                tagReturned: elementJSON.tag_ret
            });
            staff_list.push(staff)
        });
        //console.log("admin_panel", staff_list);
        return staff_list;
    }

    function CloseAddNewModal() {
        setShowAddNewRowModal(false);
        return false;
    }

    function OpenDay() {
        console.log("open day: " + attendanceDay.toString());
        StaffApiService.getDay(attendanceDay).then( (data) => {
                console.log("data:" + (data.toString()));
                setDailyForms(data)
                })
    }
    // warp this in a use effect?
    //let rowsData:Staff[] = BuildRowData(daily_forms);
    //console.log("setREfresh: " + refreshState.toString());
    return (
    <div>
        <AddNewRowModal
            day={attendanceDay}
            showModal={showAddNewRowModal}
            closeModal={() => CloseAddNewModal()} 
            updateParentAdmin={toggleRefresh}
            />
        <div className="orange-strip">
            <h2 className="display-4 text-center"><strong>Admin Panel {refreshState.toString()}</strong></h2>
        </div>
        <Container className="my-auto date-container" style={{display:'flex'}}>
            <Row>
                <Col>
            <Form.Group>
                <Form.Label>Select Date</Form.Label>
                <Form.Control type='date' 
                placeholder="aaa"
                name='attendance-day'
                
                value={attendanceDay}
                onChange={(e) => setAttendanceDay(e.target.value)} />
                
            </Form.Group>
            </Col>
            <Col className='open-button py-auto' style={{display:'flex'}} >
            <Button className="open-button" onClick={OpenDay}>Open Day</Button> 
            </Col>
            </Row>
        </Container>
        
        <div className="container">
            <table className="table table-striped table-hover table-responsive">
                <thead className="table">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Meeting Room</th>
                        <th scope="col">Time In</th>
                        <th scope="col">Time Out</th>
                        <th scope="col">Tag Issued</th>
                        <th scope="col">Tag Returned?</th>
                    </tr>
                </thead>
                <tbody>
                    <AdminPanelList staffs={rowsData} 
                    updateParentAdmin={toggleRefresh}
                    refreshChild={refreshState}
                    />
                </tbody>
            </table>
        </div>
        <Container>
            <Button onClick={showAddNewRowModel}>Add new Entry</Button>
        </Container>    
    </div>
 
    );
}

export default AdminPanel;