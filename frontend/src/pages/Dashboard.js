import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {

  const navigate = useNavigate();

  const [summary, setSummary] = useState({});

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    const res = await api.get("/dashboard-summary");
    setSummary(res.data);
  };

  return (
    <div>

      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      
      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-blue-500 text-white p-5 rounded shadow">
          <p>Total Employees</p>
          <h3 className="text-2xl font-bold">{summary.total_employees}</h3>
        </div>

        <div className="bg-green-500 text-white p-5 rounded shadow">
          <p>Present Records</p>
          <h3 className="text-2xl font-bold">{summary.total_present}</h3>
        </div>

        <div className="bg-red-500 text-white p-5 rounded shadow">
          <p>Absent Records</p>
          <h3 className="text-2xl font-bold">{summary.total_absent}</h3>
        </div>

        <div className="bg-purple-500 text-white p-5 rounded shadow">
          <p>Total Attendance Entries</p>
          <h3 className="text-2xl font-bold">{summary.total_attendance}</h3>
        </div>

      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-2 gap-6">

        <div
          onClick={() => navigate("/employees")}
          className="bg-white p-6 shadow rounded cursor-pointer hover:shadow-lg"
        >
          <h3 className="text-lg font-bold">Employee Management</h3>
          <p className="text-gray-500">Manage employees</p>
        </div>

        <div
          onClick={() => navigate("/attendance")}
          className="bg-white p-6 shadow rounded cursor-pointer hover:shadow-lg"
        >
          <h3 className="text-lg font-bold">Attendance Tracking</h3>
          <p className="text-gray-500">Manage attendance</p>
        </div>

      </div>

    </div>
  );
}
