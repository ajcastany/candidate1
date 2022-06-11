import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { IDailyFormNamDep, StaffApiService } from "../Api/api.service";
import AdminPanelList from "./AdminPanelList";
import { Staff } from "../Data/Staff";
import TagModal from "../AttendanceForm/TagModal";
import AddNewRowModal from "./AddNewRowModal";

function AdminPanel() {
    const [attendanceDay, setAttendanceDay]= useState(new Date().toISOString().substring(0,10))
    console.log("DATE: ", attendanceDay);
    const [daily_forms, setDailyForms]:[IDailyFormNamDep[], (
        daily_forms: IDailyFormNamDep[]) => void] = useState<IDailyFormNamDep[]>([]);
        useEffect( () => {
        StaffApiService.getDay(attendanceDay).then( (data) => setDailyForms(data))
        }, []);

    const [showAddNewRowModal, setShowAddNewRowModal] = useState(false);
    const showAddNewRowModel = async () => {
        setShowAddNewRowModal(true);
    }
    
    console.log(daily_forms)

    function BuildRowData(data:IDailyFormNamDep[]) {
        var staff_list: Staff[] = [];
    
        if (data.length == 0) {
            console.log("No data");
            return staff_list;
        }
        data.forEach(element => {
            var elementTXT = JSON.stringify(element);
            var elementJSON = JSON.parse(elementTXT);
            let staff:Staff = new Staff({
                id: elementJSON.id,
                name: elementJSON.name_dep.staff_name,
                department: elementJSON.name_dep.staff_department,
                meetingRoom: elementJSON.room,
                timeIn: elementJSON.time_in,
                timeOut: elementJSON.time_out,
                tagIssue: elementJSON.tag,
                tagReturned: elementJSON.tag_ret
            });
            staff_list.push(staff)
        });
        console.log("admin_panel", staff_list);
        return staff_list;
    }

    function CloseAddNewModal() {
        setShowAddNewRowModal(false);
        return false;
    }

    let rowsData:Staff[] = BuildRowData(daily_forms)

    return (
    <div>
        <AddNewRowModal
            showModal={showAddNewRowModal}
            closeModal={() => CloseAddNewModal()} />
        <div className="orange-strip">
            <h2 className="display-4 text-center"><strong>Admin Panel</strong></h2>
        </div>
        <Container className="my-auto date-container">
            <Form.Group>
                <Form.Label>Select Date</Form.Label>
                <Form.Control type='date' 
                placeholder="aaa"
                name='attendance-day'
                
                value={attendanceDay}
                onChange={(e) => setAttendanceDay(e.target.value)} />
            </Form.Group>
            

        </Container>
        <div className="container">
            <table className="table table-striped table-hover table-responsive">
                <thead className="table">
                    <tr>
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
                    <AdminPanelList staffs={rowsData} />
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