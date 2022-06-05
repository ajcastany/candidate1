import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { StaffApiService, IStaff, IDailyForm } from "../Api/api.service";
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
    const  [daily_forms, setDailyForms]:[IDailyForm[], (daily_forms: IDailyForm[]) => void] = useState<IDailyForm[]>([]);
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