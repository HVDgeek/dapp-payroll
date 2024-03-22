import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PayrollsCard from "../components/PayrollsCard";
import ActionCard from "../components/ActionCard";
import CreatePayroll from "../components/CreatePayroll";
import { loadPayrollByOrg } from "../services/blockchain";
import { useSelector } from "react-redux";

// const payrollsData = [
//   {
//     id: 1,
//     oid: 1001,
//     name: "HR Department",
//     owner: "0xabcdef123456789",
//     organization: "0xfedcba987654321",
//     salary: 5000,
//     cut: 200,
//     description: "Monthly payroll",
//     timestamp: 1647738695000, // Unix timestamp for February 18, 2022
//     workers: 10,
//     status: 3,
//   },
//   {
//     id: 2,
//     oid: 1002,
//     name: "Security Team",
//     owner: "0xabcdef123456789",
//     organization: "0xfedcba987654321",
//     salary: 6000,
//     cut: 250,
//     description: "Employee payroll",
//     timestamp: 1647738695000, // Unix timestamp for February 18, 2022
//     workers: 8,
//     status: 1,
//   },
//   {
//     id: 3,
//     oid: 1003,
//     name: "C-Levels",
//     owner: "0xfedcba987654321",
//     organization: "0xabcdef123456789",
//     salary: 5500,
//     cut: 220,
//     description: "Contractor payment",
//     timestamp: 1647738695000, // Unix timestamp for February 18, 2022
//     workers: 6,
//     status: 0,
//   },
//   {
//     id: 4,
//     oid: 1004,
//     name: "Tech Team",
//     owner: "0xabcdef123456789",
//     organization: "0xfedcba987654321",
//     salary: 7000,
//     cut: 280,
//     description: "Project team payment",
//     timestamp: 1647738695000, // Unix timestamp for February 18, 2022
//     workers: 12,
//     status: 1,
//   },
// ];

function Organization() {
  const { id } = useParams();
  const { payrolls, connectedAccount } = useSelector(
    (state) => state.globalState,
  );

  useEffect(() => {
    loadPayrollByOrg(id).then(() => {});
  }, [id, connectedAccount]);

  return (
    <div>
      {payrolls ? <PayrollsCard payrolls={payrolls} /> : null}
      <ActionCard payroll />
      <CreatePayroll oid={id} />
    </div>
  );
}

export default Organization;
