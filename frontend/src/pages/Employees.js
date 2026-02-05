import { useEffect, useState } from "react";
import api from "../api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  // Fetch employees
  const fetchEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Employees</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <EmployeeForm refresh={fetchEmployees} />
        <EmployeeTable employees={employees} refresh={fetchEmployees} />
      </div>
    </div>
  );
}
