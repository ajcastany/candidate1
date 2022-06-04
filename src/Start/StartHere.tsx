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

const [staffs, setStaffs]:[Staff[], (staffs: Staff[]) => void] = useState<Staff[]>([]);


function StartHere() {
    StaffApiService.getAllStaff().then((data) => setStaffs(data));
    return (
    <Container>
        <h2>Test: {staffs[0].id} Name {staffs[0].name}, department {staffs[0].department} </h2>
        <p>asdf</p>
    </Container>
    );
}

export default StartHere;