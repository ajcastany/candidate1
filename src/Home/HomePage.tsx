import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StartHere from "../Start/StartHere";


function HomePage() {
    return (
        <div>
            <h2>Select one of the options bellow</h2>
            <Link to='admin'>
                Admin Panel
            </Link>
            <Link to='attendance'>
                Attendance Form
            </Link>

        </div>
    );
}

export default HomePage;