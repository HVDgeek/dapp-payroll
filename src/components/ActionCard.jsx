import React from "react";
import { SlOrganization } from "react-icons/sl";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

function ActionCard({ organization, worker, payroll }) {
  return (
    <div className="flex space-x-2 flex-col lg:flex-row flex-wrap justify-start my-10">
      {payroll ? (
        <div
          className="flex flex-1 flex-col sm:flex-row my-2 p-5
      bg-white justify-center sm:justify-between rounded-lg
      "
        >
          <div className="flex flex-col sm:flex-row flex-1 justify-start items-center space-x-4">
            <AiFillThunderbolt size={20} className="text-orange-500" />
            <div className="text-center sm:text-left mt-2 sm:mt-0">
              <h4 className="text-xl font-semibold">Create Payroll</h4>
              <small className="text-gray-500 text-sm font-medium">
                Fill in a new payroll for your employees.
              </small>
            </div>
          </div>
          <button
            className="uppercase inline-block bg-transparent text-purple-600 font-medium py-2.5 px-6
          leading-tight rounded-md hover:bg-gray-100
           focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Create
          </button>
        </div>
      ) : null}
      {worker ? (
        <div
          className="flex flex-1 flex-col sm:flex-row my-2 p-5
      bg-white justify-center sm:justify-between rounded-lg
      "
        >
          <div className="flex flex-col sm:flex-row flex-1 justify-start items-center space-x-4">
            <FaUser size={20} className="text-green-500" />
            <div className="text-center sm:text-left mt-2 sm:mt-0">
              <h4 className="text-xl font-semibold">Add Worker</h4>
              <small className="text-gray-500 text-sm font-medium">
                Bring in workers to your existing payrolls.
              </small>
            </div>
          </div>
          <button
            className="uppercase inline-block bg-transparent text-purple-600 font-medium py-2.5 px-6
          leading-tight rounded-md hover:bg-gray-100
           focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Add
          </button>
        </div>
      ) : null}
      {organization ? (
        <div
          className="flex flex-1 flex-col sm:flex-row my-2 p-5
      bg-white justify-center sm:justify-between rounded-lg
      "
        >
          <div className="flex flex-col sm:flex-row flex-1 justify-start items-center space-x-4">
            <SlOrganization size={20} className="text-green-500" />
            <div className="text-center sm:text-left mt-2 sm:mt-0">
              <h4 className="text-xl font-semibold">Add Organization</h4>
              <small className="text-gray-500 text-sm font-medium">
                Create a new organization on the blockchain.
              </small>
            </div>
          </div>
          <button
            className="uppercase inline-block bg-transparent text-purple-600 font-medium py-2.5 px-6
          leading-tight rounded-md hover:bg-gray-100
           focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Add
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default ActionCard;
