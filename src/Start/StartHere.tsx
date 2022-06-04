import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { StaffApiService } from "../Api/api.service";
/* async function getResponse() {
    ApiService.getAllStaff().then(response => {
        console.log(response.data)
    return response.data;
    });
    
} */

interface Staff {
    id: number,
    name: string,
    department: string;
}




function StartHere() {
    const [staffs, setStaffs]:[Staff[], (staffs: Staff[]) => void] = useState<Staff[]>([]);
    StaffApiService.getAllStaff().then((data) => setStaffs(data));
    console.log(staffs);
    return (
    <Container>
        <h2>Test: </h2>
        <p>asdf</p>
    </Container>
    );
}

export default StartHere;