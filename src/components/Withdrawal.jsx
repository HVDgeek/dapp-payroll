import React from "react";
import { FaTimes, FaEthereum } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../store/globalSlices";
import { useForm } from "../hooks/use-form";
import { fundOrg } from "../services/blockchain";
import { toast } from "react-toastify";

function Withdrawal() {
  const dispatch = useDispatch();
  const { withdrawModal, orgs } = useSelector((state) => state.globalState);
  const { setWithdrawModal } = globalActions;
  const { handleChange, resetForm, formData } = useForm({
    oid: "",
    amount: "",
    account: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oid, account, amount } = formData;

    if (!oid || !account || !amount) return;

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await fundOrg(oid, account, amount)
          .then((tx) => {
            closeModal();
            resolve(tx);
          })
          .catch((error) => {
            alert(JSON.stringify(error));
            reject(error);
          });
      }),
      {
        pending: "Withdrawing organization...",
        success: "Withdrawal successfully executed",
        error: "Encountered error",
      },
    );
  };

  const closeModal = () => {
    dispatch(setWithdrawModal("scale-0"));
    resetForm();
  };

  return (
    <div
      className={`fixed top-0 left-0 bg-black w-screen h-screen flex justify-center items-center
      z-50 bg-opacity-50 transform transition-transform duration-300 ${withdrawModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-black">Withdraw fund</p>
            <button
              className="border-0 bg-transparent focus:outline-none "
              type="button"
              onClick={() => dispatch(setWithdrawModal("scale-0"))}
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
              name="oid"
              className="block w-full text-sm p-2 text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              placeholder="Search for organization"
              type="text"
              list="orgs"
              required
              onChange={handleChange}
              value={formData.oid}
            />
            <datalist id="orgs">
              {orgs.map((org, i) => (
                <option key={i} value={org.id}>
                  {org.name}
                </option>
              ))}
            </datalist>
          </div>

          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm p-2 text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              placeholder="ETH Account"
              type="text"
              name="account"
              minLength={42}
              maxLength={42}
              pattern="[A-Za-z0-9]+"
              value={formData.account}
              onChange={handleChange}
            />
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
              onChange={handleChange}
              value={formData.amount}
            />
          </div>
          <button
            className="w-full rounded-full bg-purple-500 text-white py-2 px-5 drop-shadow-xl
          border-transparent border hover:bg-transparent hover:text-purple-500 hover:border-purple-500 mt-5
          transition ease-in-out
          "
            type="submit"
          >
            Withdraw
          </button>
        </form>
      </div>
    </div>
  );
}

export default Withdrawal;
