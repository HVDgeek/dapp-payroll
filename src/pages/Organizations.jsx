import React from "react";
import OrgsCard from "../components/OrgsCard";
import ActionCard from "../components/ActionCard";
import { useSelector } from "react-redux";

// const organizationData = [
//   {
//     id: 0,
//     name: "Company A",
//     description: "A company focused on blockchain solutions",
//     account: "0x123abc456def789ghi123abc456def789ghi123",
//     cuts: 6,
//     balance: 100000,
//     payments: 52000,
//     payrolls: 33000,
//     workers: 20,
//     timestamp: 1645058400, // February 17, 2022 12:00:00 AM GMT
//   },
//   {
//     id: 1,
//     name: "Company B",
//     description: "An innovative tech startup",
//     account: "0x456def123abc789ghi456def123abc789ghi456",
//     cuts: 4,
//     balance: 72000,
//     payments: 35000,
//     payrolls: 22000,
//     workers: 15,
//     timestamp: 1645144800, // February 18, 2022 12:00:00 AM GMT
//   },
//   {
//     id: 2,
//     name: "Company C",
//     description: "A leading blockchain consultancy",
//     account: "0x789ghi123abc456def789ghi123abc456def789",
//     cuts: 7,
//     balance: 153000,
//     payments: 81000,
//     payrolls: 45000,
//     workers: 30,
//     timestamp: 1645231200, // February 19, 2022 12:00:00 AM GMT
//   },
// ];

function Organizations() {
  const { orgs } = useSelector((states) => states.globalState);

  return (
    <div>
      <OrgsCard organizations={orgs} />
      <ActionCard organization />
    </div>
  );
}

export default Organizations;
