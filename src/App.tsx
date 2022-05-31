import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Navigation from './Home/Navigation';
import HomePage from "./Home/HomePage";
import AdminPanel from "./AdminPanel/AdminPanel";
import AttendanceForm from "./AttendanceForm/AttendanceForm";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/attendance" element={<AttendanceForm />} />
      </Routes>
    </div>
  );
}

export default App;
