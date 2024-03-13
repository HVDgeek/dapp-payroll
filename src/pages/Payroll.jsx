import React from "react";
import WorkersCard from "../components/WorkersCard";
import ActionCard from "../components/ActionCard";
import CreateWorker from "../components/CreateWorker";
import UpdateWorker from "../components/UpdateWorker";

const workersArray = [
  {
    wid: 1,
    id: 123,
    name: "John Doe",
    account: "0x789ghi123abc456def789ghi123abc456def789",
    timestamp: 1645027200000, // Unix timestamp for February 17, 2022
  },
  {
    wid: 2,
    id: 456,
    name: "Jane Smith",
    account: "0x987def456abc123ghi987def456abc123ghi987",
    timestamp: 1645113600000, // Unix timestamp for February 18, 2022
  },
  {
    wid: 3,
    id: 789,
    name: "Alice Johnson",
    account: "0x456abc789def123ghi456abc789def123ghi456",
    timestamp: 1645200000000, // Unix timestamp for February 19, 2022
  },
  {
    wid: 4,
    id: 1011,
    name: "Bob Williams",
    account: "0x789def456abc123ghi789def456abc123ghi789",
    timestamp: 1645286400000, // Unix timestamp for February 20, 2022
  },
];

const payrollData = {
  id: 1,
  oid: 1001,
  name: "HR Department",
  owner: "0xabcdef123456789",
  organization: "0xfedcba987654321",
  salary: 5000,
  cut: 200,
  description: "Monthly payroll",
  timestamp: 1647738695000, // Unix timestamp for February 18, 2022
  workers: 10,
  status: 3,
};

function Payroll() {
  return (
    <div>
      <WorkersCard workers={workersArray} payroll={payrollData} />
      <ActionCard worker />
      <CreateWorker />
    </div>
  );
}

export default Payroll;
