import React, { useEffect } from "react";
import { FaTimes, FaEthereum } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../store/globalSlices";
import { useForm } from "../hooks/use-form";
import { updatePayroll } from "../services/blockchain";
import { toast } from "react-toastify";

function UpdatePayroll({ payroll }) {
  const dispatch = useDispatch();
  const { updatePayrollModal } = useSelector((state) => state.globalState);
  const { setUpdatePayrollModal } = globalActions;
  const { formData, handleChange, resetForm, setFormData } = useForm({
    name: payroll.name,
    description: payroll.description,
    salary: payroll.salary,
    cut: payroll.cut,
  });

  useEffect(() => {
    setFormData({
      name: payroll.name,
      description: payroll.description,
      salary: payroll.salary,
      cut: payroll.cut,
    });
  }, [payroll, setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, salary, cut } = formData;

    if (!name || !description || !salary || !cut) return;

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await updatePayroll({ ...payroll, name, description, salary, cut })
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
        pending: "Updating payroll...",
        success: "Payroll successfully updated",
        error: "Encountered an error",
      },
    );
  };

  const closeModal = () => {
    dispatch(setUpdatePayrollModal("scale-0"));
    resetForm();
  };

  return (
    <div
      className={`fixed top-0 left-0 bg-black w-screen h-screen flex justify-center items-center
      z-50 bg-opacity-50 transform transition-transform duration-300 ${updatePayrollModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-black">Edit Payroll</p>
            <button
              className="border-0 bg-transparent focus:outline-none "
              type="button"
              onClick={() => dispatch(setUpdatePayrollModal("scale-0"))}
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
              required
            />
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm p-2 text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              placeholder="Salary"
              type="number"
              name="salary"
              min={0.001}
              step={0.001}
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm p-2 text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              placeholder="Cut"
              type="number"
              name="cut"
              min={1}
              max={100}
              value={formData.cut}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <textarea
              className="block w-full text-sm p-2 text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              placeholder="Description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
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
            Update Payroll
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePayroll;
