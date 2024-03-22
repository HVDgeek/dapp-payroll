import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  approvePayroll,
  payWorkers,
  submitPayroll,
} from "../services/blockchain";

function PayrollActions({ payroll }) {
  const { connectedAccount } = useSelector((state) => state.globalState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await submitPayroll(payroll)
          .then((tx) => resolve(tx))
          .catch((error) => {
            alert(JSON.stringify(error));
            reject(error);
          });
      }),
      {
        pending: "Submiting payroll...",
        success: "Payroll successfully submited",
        error: "Encountered an error",
      },
    );
  };

  const handleApprove = async (e) => {
    e.preventDefault();

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await approvePayroll(payroll)
          .then((tx) => resolve(tx))
          .catch((error) => {
            alert(JSON.stringify(error));
            reject(error);
          });
      }),
      {
        pending: "Approving payroll...",
        success: "Payroll successfully approved",
        error: "Encountered an error",
      },
    );
  };

  const performPayment = async (e) => {
    e.preventDefault();

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await payWorkers(payroll)
          .then((tx) => resolve(tx))
          .catch((error) => {
            alert(JSON.stringify(error));
            reject(error);
          });
      }),
      {
        pending: "Paying workers...",
        success: "Payment successfully",
        error: "Encountered an error",
      },
    );
  };

  return payroll &&
    connectedAccount == payroll.officer &&
    payroll.status == 0 ? (
    <div className="my-4">
      <button
        className="text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none font-medium
      rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  ) : payroll && connectedAccount == payroll.officer && payroll.status == 4 ? (
    <div className="my-4">
      <button
        className="text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none font-medium
    rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Revert
      </button>
    </div>
  ) : payroll &&
    connectedAccount == payroll.organization &&
    payroll.status == 1 ? (
    <div className="my-4">
      <button
        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium
       rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={handleApprove}
      >
        Approve
      </button>
      <button
        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none font-medium
      rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Reject
      </button>
    </div>
  ) : payroll && connectedAccount == payroll.officer && payroll.status == 3 ? (
    <div className="my-4">
      <button
        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium
    rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={performPayment}
      >
        Pay Workers
      </button>
      <button
        className="text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none font-medium
    rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Revert
      </button>
    </div>
  ) : null;
}

export default PayrollActions;

// <button
//         className="text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none font-medium
//       rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
//       >
//         Revert
//       </button>
//       <button
//         className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium
//       rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
//       >
//         Pay Workers
//       </button>
//       <button
//         className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium
//       rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
//       >
//         Approve
//       </button>
