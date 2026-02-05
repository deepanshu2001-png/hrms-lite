import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import AttendanceSummary from "./pages/AttendanceSummary";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/summary" element={<AttendanceSummary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;