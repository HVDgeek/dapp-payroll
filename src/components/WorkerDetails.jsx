import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../store/globalSlices";
import { FaEthereum, FaTimes } from "react-icons/fa";
import Identicon from "react-identicons";

function WorkerDetails({ worker, payroll }) {
  const dispatch = useDispatch();
  const { workerDetailsModal } = useSelector((state) => state.globalState);
  const { setWorkerDetailsModal } = globalActions;

  return (
    <div
      className={`fixed top-0 left-0 bg-black w-screen h-screen flex justify-center items-center
      z-50 bg-opacity-50 transform transition-transform duration-300 ${workerDetailsModal}`}
    >
      <div
        className="offcanvas offcancas-end flex flex-col max-w-full bg-white bg-clip-padding shadow-sm
      outline-none text-gray-700 fixed bottom-0 top-0 right-0 z-[999999] w-96
      transition duration-300 ease-in-out
      "
        tabIndex="-1"
        id="offcanvasRight"
      >
        <div className="offcanvas-header flex items-center justify-between p-4 ">
          <h5 className="offcanvas-title mb-0 font-semibold leading-normal">
            Worker Details
          </h5>
          <button
            className="border-0 bg-transparent focus:outline-none "
            type="button"
            onClick={() => dispatch(setWorkerDetailsModal("invisible"))}
          >
            <FaTimes className="text-black" size={20} />
          </button>
        </div>

        <div className="offcanvas-body p-4 flex-grow overflow-y-auto ">
          <hr />
          <div className="flex flex-col items-center text-center py-4 space-y-4">
            <Identicon
              className="rounded-full shadow-md"
              string={worker.account}
              size={60}
            />
            <h4 className="capitalize">{worker.name}</h4>

            <p className="text-gray-700 text-xs">
              Account
              <br />
              <span className="font-bold">{worker.account}</span>
            </p>

            <p className="text-gray-700 text-xs">
              Salary
              <br />
              <span className="flex justify-center items-center text-green-700">
                <FaEthereum />
                <span className="font-bold">{payroll.salary}</span>
              </span>
            </p>

            <p className="text-gray-700 text-xs">
              Taxable Cut <br />
              <span className="font-bold">{payroll.cut}%</span>
            </p>

            <p className="text-gray-700 text-xs">
              joined <br />
              <span className="font-bold">
                {new Date(worker.timestamp).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerDetails;
