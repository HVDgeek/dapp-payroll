import React, { useState } from "react";
import { FaTimes, FaEthereum } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../store/globalSlices";
import { useForm } from "../hooks/use-form";
import { truncate } from "../services/blockchain";

function CreateWorker() {
  const dispatch = useDispatch();
  const { createWorkerModal } = useSelector((state) => state.globalState);
  const { setCreateWorkerModal } = globalActions;
  const { formData, handleChange, resetForm, setFormData } = useForm({
    name: "",
    account: "",
  });

  const [names, setNames] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("DATA =>", { formData, names, accounts });
    onClose();
  };

  const addToList = () => {
    if (!formData.name || !formData.account) return;
    if (accounts.includes(formData.account.toLowerCase())) return;

    setNames((prevState) => [formData.name.toLowerCase(), ...prevState]);
    setAccounts((prevState) => [formData.account.toLowerCase(), ...prevState]);

    resetForm();
  };

  const removeFromList = (index) => {
    names.splice(index, 1);
    accounts.splice(index, 1);

    setNames((prevState) => [...prevState]);
    setAccounts((prevState) => [...prevState]);
  };

  const onClose = () => {
    resetForm();
    setAccounts([]);
    setNames([]);
    dispatch(setCreateWorkerModal("scale-0"));
  };

  return (
    <div
      className={`fixed top-0 left-0 bg-black w-screen h-screen flex justify-center items-center
      z-50 bg-opacity-50 transform transition-transform duration-300 ${createWorkerModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-black">Create Worker</p>
            <button
              className="border-0 bg-transparent focus:outline-none "
              type="button"
              onClick={onClose}
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
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
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

          <div className="flex justify-start items-cente space-x-1 rounded-xl mt-5">
            {accounts.slice(0, 2).map((account, i) => (
              <div
                key={i}
                className="p-2 rounded-full text-gray-500
                bg-gray-200 cursor-pointer font-semibold flex items-center active:bg-gray-300
                w-max transition duration-300 ease-in-out space-x-1 text-xs"
              >
                <span>{truncate(account, 4, 4, 11)} - </span>
                <span className="capitalize">{names[i]}</span>
                <button
                  className="border-0 bg-transparent focus:outline-none "
                  type="button"
                  onClick={() => removeFromList(i)}
                >
                  <FaTimes className="text-black" size={20} />
                </button>
              </div>
            ))}
            {accounts.length - accounts.slice(0, 2).length > 0 && (
              <div
                className="p-2 rounded-full text-gray-500
                          bg-gray-200 cursor-pointer font-semibold flex items-center active:bg-gray-300
                          w-max transition duration-300 ease-in-out space-x-1 text-xs"
              >
                <span>+ {accounts.length - accounts.slice(0, 2).length}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={accounts.length < 1}
              className="flex justify-center items-center text-white text-md bg-purple-500
              py-2 px-5 rounded-full drop-shadow-xl border-transparent border
              hover:bg-transparent hover:text-purple-500 hover:border hover:border-purple-500
              focus:outline-none focus:ring mt-5"
            >
              Create Workers
            </button>

            <button
              type="button"
              onClick={addToList}
              className="flex justify-center items-center text-white text-md bg-slate-700
              py-2 px-5 rounded-full drop-shadow-xl border-transparent border
              hover:bg-transparent hover:text-slate-700 hover:border hover:border-slate-700
              focus:outline-none focus:ring mt-5"
            >
              Add Worker
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateWorker;
