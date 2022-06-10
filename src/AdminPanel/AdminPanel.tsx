import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import AdminPanelList from "./AdminPanelList";

function AdminPanel() {
    const [attendanceDay, setAttendanceDay] = useState(new Date().toISOString().substring(0,10))
    console.log("DATE: ", attendanceDay);
    return (
    <div>
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
                    <AdminPanelList />
                </tbody>
            </table>
        </div>
        <Container>
            <Button>Add new Entry</Button>
        </Container>    
    </div>
 
    );
}

export default AdminPanel;