import React, { useEffect } from "react";
import { FaTimes, FaEthereum } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../store/globalSlices";
import { useForm } from "../hooks/use-form";

function UpdateWorker({ worker, payroll }) {
  const dispatch = useDispatch();
  const { updateWorkerModal } = useSelector((state) => state.globalState);
  const { setUpdateWorkerModal } = globalActions;
  const { formData, handleChange, resetForm, setFormData } = useForm({
    name: worker.name,
    account: worker.account,
  });

  useEffect(() => {
    setFormData({
      name: worker.name,
      account: worker.account,
    });
  }, [worker, payroll, setFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("DATA =>", { formData, worker, payroll });
    onClose();
  };

  const onClose = () => {
    resetForm();
    dispatch(setUpdateWorkerModal("scale-0"));
  };

  return (
    <div
      className={`fixed top-0 left-0 bg-black w-screen h-screen flex justify-center items-center
      z-50 bg-opacity-50 transform transition-transform duration-300 ${updateWorkerModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-black">Edit Worker</p>
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

          <button
            type="submit"
            className="flex justify-center items-center text-white text-md bg-purple-500
              py-2 px-5 rounded-full drop-shadow-xl border-transparent border
              hover:bg-transparent hover:text-purple-500 hover:border hover:border-purple-500
              focus:outline-none focus:ring mt-5"
          >
            Update Worker
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateWorker;
