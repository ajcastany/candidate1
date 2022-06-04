import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { StaffApiService, Staff, DailyForm } from "../Api/api.service";
/* async function getResponse() {
    ApiService.getAllStaff().then(response => {
        console.log(response.data)
    return response.data;
    });
    
} */


function StartHere() {
/*     const [staffs, setStaffs]:[Staff[], (staffs: Staff[]) => void] = useState<Staff[]>([]);
    StaffApiService.getAllStaff().then((data) => setStaffs(data));
    console.log(staffs); */
    const  [daily_forms, setDailyForms]:[DailyForm[], (daily_forms: DailyForm[]) => void] = useState<DailyForm[]>([]);
    StaffApiService.getAllDays().then((data) => setDailyForms(data));
    console.log(daily_forms);
    return (
    <Container>
        <h2>Test: </h2>
        <p>asdf</p>
    </Container>
    );
}

export default StartHere;