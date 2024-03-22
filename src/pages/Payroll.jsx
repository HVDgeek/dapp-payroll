import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkersCard from "../components/WorkersCard";
import ActionCard from "../components/ActionCard";
import CreateWorker from "../components/CreateWorker";
import { loadPayroll, loadWorkersOf } from "../services/blockchain";
import { useSelector } from "react-redux";
import PayrollActions from "../components/PayrollActions";

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

function Payroll() {
  const { id } = useParams();
  const { payroll, workers } = useSelector((state) => state.globalState);

  useEffect(() => {
    const loadData = async () => {
      await loadPayroll(id);
      await loadWorkersOf(id);
    };

    loadData();
  }, [id]);

  return (
    <div>
      <WorkersCard workers={workers} payroll={payroll} />
      {workers.length > 0 && <PayrollActions payroll={payroll} />}
      <ActionCard worker />
      <CreateWorker payroll={payroll} />
    </div>
  );
}

export default Payroll;
