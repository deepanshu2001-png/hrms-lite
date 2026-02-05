import { useState, useEffect } from "react";
import api from "../api";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

export default function Attendance() {

  const [records, setRecords] = useState([]);

  const fetchAttendance = async (empId = "", date = "") => {

    const res = await api.get("/attendance", {
      params: {
        employee_id: empId || undefined,
        date_value: date || undefined
      }
    });

    setRecords(res.data);
  };

 
  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Attendance</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <AttendanceForm refresh={fetchAttendance} />
        <AttendanceTable
          records={records}
          refresh={fetchAttendance}
        />
      </div>
    </div>
  );
}
