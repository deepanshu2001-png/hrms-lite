import { useState } from "react";

export default function AttendanceTable({ records, refresh }) {

  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="bg-white p-6 shadow rounded">
      <h3 className="font-bold mb-4">Attendance Records</h3>

      <div className="grid grid-cols-2 gap-3">

        <input
          className="input"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        <input
          type="date"
          className="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button
        className="btn-primary mt-4"
        onClick={() => refresh(employeeId, date)}
      >
        Search
      </button>

      <table className="w-full mt-5 border">
        <thead>
          <tr className="bg-gray-200">
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td>{r.employee_id} ({r.employee_name})</td>
              <td>{r.date}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
