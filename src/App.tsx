import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from "./Home/HomePage";
import AdminPanel from "./AdminPanel/AdminPanel";
import AttendanceForm from "./AttendanceForm/AttendanceForm";

function App() {
  return (
    <div>
      <h1>candidate</h1>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/attendance" element={<AttendanceForm />} />
      </Routes>
    </div>
  );
}

export default App;
