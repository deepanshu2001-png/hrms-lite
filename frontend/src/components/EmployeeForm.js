import { useState } from "react";
import api from "../api";

export default function EmployeeForm({ refresh }) {

  const [data, setData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const submit = async () => {

    // ⭐ Required field validation
    if (!data.employee_id || !data.full_name || !data.email || !data.department) {
      alert("All fields are required");
      return;
    }

    // ⭐ Email format validation
    if (!validateEmail(data.email)) {
      alert("Invalid email format");
      return;
    }

    try {

      await api.post("/employees", data);

      alert("Employee added successfully");

      refresh();

      // Reset form
      setData({
        employee_id: "",
        full_name: "",
        email: "",
        department: ""
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
      <h3 className="font-bold mb-4">Add Employee</h3>

      <input
        className="input"
        placeholder="Employee ID"
        value={data.employee_id}
        onChange={e => setData({ ...data, employee_id: e.target.value })}
      />

      <input
        className="input"
        placeholder="Full Name"
        value={data.full_name}
        onChange={e => setData({ ...data, full_name: e.target.value })}
      />

      <input
        className="input"
        placeholder="Email"
        value={data.email}
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input
        className="input"
        placeholder="Department"
        value={data.department}
        onChange={e => setData({ ...data, department: e.target.value })}
      />

      <button className="btn-primary mt-4" onClick={submit}>
        Add Employee
      </button>
    </div>
  );
}
