import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

/* Import all page components */
import App from "./App";
import HomePage from "./Home/HomePage";
import AdminPanel from "./AdminPanel/AdminPanel";
import AttendanceForm from "./AttendanceForm/AttendanceForm";

function Main() {
    return (
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="home" element={<HomePage />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="attendance" element={<AttendanceForm />} />
        </Routes>
    );
}

export default Main;