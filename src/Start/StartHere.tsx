import React from "react";
import { BrowserRouter as Router, Routes, Route, Link as NavLink } from "react-router-dom";
import AdminPanel from "../AdminPanel/AdminPanel";
import AttendanceForm from "../AttendanceForm/AttendanceForm";

function StartHere() {
    return (
        <Router>
        <h2>Select one of the forms bellow</h2>
        <NavLink to='/admin' className={''}>
            Admin Panel
        </NavLink>
        <NavLink to='/attendance' className={''}>
            Attendance Form
        </NavLink>
        <Routes>
            <Route path='/admin' element={<AdminPanel/>} />
            <Route path='/attendance' element={<AttendanceForm/>} />
        </Routes>
    </Router>
    );
}

export default StartHere;