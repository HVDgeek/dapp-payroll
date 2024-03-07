import React from "react";
import { truncate } from "../services/blockchain";
import { useNavigate } from "react-router-dom";

function OrgsCard({ organizations }) {
  const navigate = useNavigate();
  return (
    <div>
      <h4 className="font-semibold text-2xl mb-3">
        List: ({organizations.length} organizations)
      </h4>
      <div
        className="bg-white rounded-lg p-5 max-h-[calc(100vh_-_22rem)]
        overflow-y-auto
        "
      >
        <table className="table-auto w-full">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Organization
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Account
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Balance
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Payments
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Cuts
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org) => (
              <tr className="border-b border-gray-200 transition duration-300 ease-in-out">
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <span className="font-semibold">{org.name}</span>
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <span className="font-semibold">
                    {truncate(org.account, 4, 4, 11)}
                  </span>
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <span className="font-semibold">{org.balance}</span>
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <span className="font-semibold">{org.payments}</span>
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <span className="font-semibold">{org.cuts}</span>
                </td>
                <td className="flex justify-start items-center text-sm font-light px-6 py-4 whitespace-nowrap">
                  <button
                    className="inline-block bg-transparent px-6 py-2.5
                    text-green-600 font-medium text-xs leading-tight uppercase
                  "
                    onClick={() => navigate(`/organization/${org.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="inline-block bg-transparent px-6 py-2.5
                    text-purple-600 font-medium text-xs leading-tight uppercase
                  "
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrgsCard;
