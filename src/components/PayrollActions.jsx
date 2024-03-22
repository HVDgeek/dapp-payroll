import React from "react";
import { useSelector } from "react-redux";

function PayrollActions({ payroll }) {
  const { connectedAccount } = useSelector((state) => state.globalState);
  return payroll &&
    connectedAccount == payroll.officer &&
    payroll.status == 0 ? (
    <div className="my-4">
      <button
        className="text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none font-medium
      rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
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
