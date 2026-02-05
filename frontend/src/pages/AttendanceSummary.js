import { useEffect, useState } from "react";
import api from "../api";

export default function AttendanceSummary() {

  const [summary, setSummary] = useState([]);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    const res = await api.get("/attendance-summary");
    setSummary(res.data);
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-4">
        Present Days Per Employee
      </h2>

      <table className="w-full border bg-white shadow">
        <thead>
          <tr className="bg-gray-200">
            <th>Employee</th>
            <th>Present Days</th>
            <th>Total Records</th>
          </tr>
        </thead>

        <tbody>
          {summary.map(emp => (
            <tr key={emp.employee_id}>
              <td>{emp.employee_name} ({emp.employee_id})</td>
              <td>{emp.present_days}</td>
              <td>{emp.total_days}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
