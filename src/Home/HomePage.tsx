import React from "react";
import { Link } from "react-router-dom";

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