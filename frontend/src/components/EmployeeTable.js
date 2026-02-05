import api from "../api";

export default function EmployeeTable({ employees, refresh }) {

  const del = async (id) => {

    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await api.delete(`/employees/${id}`);
      alert("Employee deleted");
      refresh();

    } catch (error) {

      const message =
        error.response?.data?.detail
          ? typeof error.response.data.detail === "string"
            ? error.response.data.detail
            : error.response.data.detail[0]?.msg
          : "Delete failed";

      alert(message);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded">
      <h3 className="font-bold mb-4">Employee List</h3>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.employee_id}>
              <td>{emp.employee_id}</td>
              <td>{emp.full_name}</td>
              <td>{emp.department}</td>
              <td>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => del(emp.employee_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
