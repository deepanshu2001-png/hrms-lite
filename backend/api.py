import os
import django
import sys
from fastapi import FastAPI, HTTPException
from fastapi import Query
from pydantic import BaseModel, EmailStr
from typing import List
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
from django.db.models import Count, Q


# Add Django project folder to Python path
BASE_DIR = os.path.dirname(__file__)
sys.path.insert(0, os.path.join(BASE_DIR, "core"))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

django.setup()


from hrms.models import Employee, Attendance

app = FastAPI()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# ------------------ Schemas ------------------

class EmployeeSchema(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class AttendanceSchema(BaseModel):
    employee_id: str
    date: date
    status: str


# ---------------- Employee APIs ----------------

@app.post("/employees")
def add_employee(emp: EmployeeSchema):
    if Employee.objects.filter(employee_id=emp.employee_id).exists():
        raise HTTPException(400, "Employee ID already exists")

    employee = Employee.objects.create(**emp.dict())
    return {"message": "Employee created"}


@app.get("/employees")
def get_employees():
    employees = Employee.objects.all()
    return list(employees.values())


@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: str):
    try:
        emp = Employee.objects.get(employee_id=emp_id)
        emp.delete()
        return {"message": "Deleted"}
    except Employee.DoesNotExist:
        raise HTTPException(404, "Employee not found")


# ---------------- Attendance APIs ----------------

@app.post("/attendance")
def mark_attendance(data: AttendanceSchema):

    # Employee existence check
    try:
        emp = Employee.objects.get(employee_id=data.employee_id)
    except Employee.DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="Employee does not exist"
        )

    # Duplicate attendance check
    if Attendance.objects.filter(employee=emp, date=data.date).exists():
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this employee on this date"
        )

    Attendance.objects.create(
        employee=emp,
        date=data.date,
        status=data.status
    )

    return {"message": "Attendance marked successfully"}



@app.get("/attendance")
def get_attendance(
    employee_id: str = Query(None),
    date_value: date = Query(None)
):
    records = Attendance.objects.all()

    # Filter by employee
    if employee_id:
        try:
            emp = Employee.objects.get(employee_id=employee_id)
            records = records.filter(employee=emp)
        except Employee.DoesNotExist:
            raise HTTPException(404, "Employee not found")

    # Filter by date
    if date_value:
        records = records.filter(date=date_value)

    result = []

    for r in records:
        result.append({
            "employee_id": r.employee.employee_id,
            "employee_name": r.employee.full_name,
            "date": r.date,
            "status": r.status
        })

    return result

@app.get("/attendance-summary")
def attendance_summary():

    employees = Employee.objects.all()

    result = []

    for emp in employees:

        present_days = Attendance.objects.filter(
            employee=emp,
            status="Present"
        ).count()

        total_days = Attendance.objects.filter(
            employee=emp
        ).count()

        result.append({
            "employee_id": emp.employee_id,
            "employee_name": emp.full_name,
            "present_days": present_days,
            "total_days": total_days
        })

    return result

@app.get("/dashboard-summary")
def dashboard_summary():

    total_employees = Employee.objects.count()

    total_attendance = Attendance.objects.count()

    total_present = Attendance.objects.filter(status="Present").count()

    total_absent = Attendance.objects.filter(status="Absent").count()

    return {
        "total_employees": total_employees,
        "total_attendance": total_attendance,
        "total_present": total_present,
        "total_absent": total_absent
    }
