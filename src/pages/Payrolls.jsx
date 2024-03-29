import React from "react";
import PayrollsCard from "../components/PayrollsCard";
import ActionCard from "../components/ActionCard";
import CreatePayroll from "../components/CreatePayroll";
import { useSelector } from "react-redux";

const payrollsData = [
  {
    id: 1,
    oid: 1001,
    name: "HR Department",
    officer: "0xabcdef123456789",
    organization: "0xfedcba987654321",
    salary: 5000,
    cut: 200,
    description: "Monthly payroll",
    timestamp: 1647738695000, // Unix timestamp for February 18, 2022
    workers: 10,
    status: 3,
  },
  {
    id: 2,
    oid: 1002,
    name: "Security Team",
    officer: "0xabcdef123456789",
    organization: "0xfedcba987654321",
    salary: 6000,
    cut: 250,
    description: "Employee payroll",
    timestamp: 1647738695000, // Unix timestamp for February 18, 2022
    workers: 8,
    status: 1,
  },
  {
    id: 3,
    oid: 1003,
    name: "C-Levels",
    officer: "0xfedcba987654321",
    organization: "0xabcdef123456789",
    salary: 5500,
    cut: 220,
    description: "Contractor payment",
    timestamp: 1647738695000, // Unix timestamp for February 18, 2022
    workers: 6,
    status: 0,
  },
  {
    id: 4,
    oid: 1004,
    name: "Tech Team",
    officer: "0xabcdef123456789",
    organization: "0xfedcba987654321",
    salary: 7000,
    cut: 280,
    description: "Project team payment",
    timestamp: 1647738695000, // Unix timestamp for February 18, 2022
    workers: 12,
    status: 1,
  },
];

function Payrolls() {
  const { allPayrolls } = useSelector((state) => state.globalState);
  return (
    <div>
      <PayrollsCard payrolls={allPayrolls} remActions />
      <ActionCard payroll noPayrollCreation />
      <CreatePayroll />
    </div>
  );
}

export default Payrolls;
