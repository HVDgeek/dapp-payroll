import React from "react";
import { FaTimes, FaEthereum } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../store/globalSlices";

const organizationData = [
  {
    id: 0,
    name: "Company A",
    description: "A company focused on blockchain solutions",
    account: "0x123abc",
    cuts: 0,
    balance: 100000,
    payments: 52000,
    payrolls: 33000,
    workers: 20,
    timestamp: 1645058400, // February 17, 2022 12:00:00 AM GMT
  },
  {
    id: 1,
    name: "Company B",
    description: "An innovative tech startup",
    account: "0x456def",
    cuts: 0,
    balance: 72000,
    payments: 35000,
    payrolls: 22000,
    workers: 15,
    timestamp: 1645144800, // February 18, 2022 12:00:00 AM GMT
  },
  {
    id: 2,
    name: "Company C",
    description: "A leading blockchain consultancy",
    account: "0x789ghi",
    cuts: 0,
    balance: 153000,
    payments: 81000,
    payrolls: 45000,
    workers: 30,
    timestamp: 1645231200, // February 19, 2022 12:00:00 AM GMT
  },
];

function FundTreasury() {
  const dispatch = useDispatch();
  const { fundTreasuryModal } = useSelector((state) => state.globalState);
  const { setFundTreasureModal } = globalActions;

  return (
    <div
      className={`fixed top-0 left-0 bg-black w-screen h-screen flex justify-center items-center
      z-50 bg-opacity-50 transform transition-transform duration-300 ${fundTreasuryModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-black">Fund Treasury</p>
            <button
              className="border-0 bg-transparent focus:outline-none "
              type="button"
              onClick={() => dispatch(setFundTreasureModal("scale-0"))}
            >
              <FaTimes className="text-black" size={20} />
            </button>
          </div>

          <div className="flex flex-col justify-center items-center rounded-xl space-y-2  my-5">
            <div
              className="flex justify-center items-center
            rounded-full py-2 px-4 space-x-1 shadow-md
            "
            >
              <FaEthereum className="text-purple-700" size={20} />
              <span>Payroll</span>
            </div>
            <small>Make sure all records are correctly entered.</small>
          </div>

          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm p-2 text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              placeholder="Search for organization"
              type="text"
              list="organizations"
              required
            />
            <datalist id="organizations">
              {organizationData.map((org, i) => (
                <option key={i} value={org.id}>
                  {org.name}
                </option>
              ))}
            </datalist>
          </div>

          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm p-2 text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              placeholder="Amount (ETH)"
              step={0.01}
              min={0.01}
              type="number"
              name="amount"
              required
            />
          </div>
          <button
            className="w-full rounded-full bg-purple-500 text-white py-2 px-5 drop-shadow-xl
          border-transparent border hover:bg-transparent hover:text-purple-500 hover:border-purple-500 mt-5
          transition ease-in-out
          "
            type="submit"
          >
            Fund Treasury
          </button>
        </form>
      </div>
    </div>
  );
}

export default FundTreasury;
