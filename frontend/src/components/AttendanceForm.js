import { useState, useEffect } from "react";
import api from "../api";

export default function AttendanceForm({ refresh }) {

  const [employees, setEmployees] = useState([]);

  const [data, setData] = useState({
    employee_id: "",
    status: "Present"
  });

  // ⭐ Load employees for dropdown
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  const submit = async () => {

    if (!data.employee_id || !data.date) {
      alert("Employee and Date are required");
      return;
    }

    try {

      await api.post("/attendance", data);

      alert("Attendance marked successfully");

      refresh(); // reload all attendance

      setData({
        employee_id: "",
        status: "Present"
      });

    } catch (error) {

      const message =
        error.response?.data?.detail
          ? typeof error.response.data.detail === "string"
            ? error.response.data.detail
            : error.response.data.detail[0]?.msg
          : "Something went wrong";

      alert(message);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded">
      <h3 className="font-bold mb-4">Mark Attendance</h3>

      
      <select
        className="input"
        value={data.employee_id}
        onChange={e =>
          setData({ ...data, employee_id: e.target.value })
        }
      >
        <option value="">Select Employee</option>

        {employees.map(emp => (
          <option key={emp.employee_id} value={emp.employee_id}>
            {emp.full_name} ({emp.employee_id})
          </option>
        ))}
      </select>

      {/* Date */}
      <input
        type="date"
        className="input"
        value={data.date || ""}
        onChange={e =>
          setData({ ...data, date: e.target.value })
        }
      />

      {/* Status */}
      <select
        className="input"
        value={data.status}
        onChange={e =>
          setData({ ...data, status: e.target.value })
        }
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button className="btn-primary mt-4" onClick={submit}>
        Submit
      </button>
    </div>
  );
}
