import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { globalActions } from "../store/globalSlices";

function Treasury({ stats }) {
  const dispatch = useDispatch();
  const { setFundTreasureModal, setWithdrawModal } = globalActions;

  return (
    <div className="my-10">
      <h4 className="font-semibold text-2xl">Treasury</h4>
      <div className="flex flex-col sm:flex-row justify-center item-center bg-white mt-5">
        <div
          className="flex flex-col justify-center items-center border border-gray-200 h-20
        shadow-md w-full
        "
        >
          <span className="text-lg font-bold text-purple-500 leading-1">
            {stats.cuts} ETH
          </span>
          <span>Cuts</span>
        </div>
        <div
          className="flex flex-col justify-center items-center border border-gray-200 h-20
        shadow-md w-full
        "
        >
          <span className="text-lg font-bold text-purple-500 leading-1">
            {stats.balance} ETH
          </span>
          <span>Balance</span>
        </div>
        <div
          className="flex justify-center items-center border border-gray-200 h-20
        shadow-md w-full space-x-2
        "
        >
          <button
            className="uppercase inline-block bg-purple-600 text-white font-medium py-2.5 px-6
        leading-tight rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700
        focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-700 transition duration-150 ease-in-out"
            type="button"
            onClick={() => dispatch(setFundTreasureModal("scale-100"))}
          >
            Fund account
          </button>
        </div>
        <div
          className="flex justify-center items-center border border-gray-200 h-20
        shadow-md w-full space-x-2
        "
        >
          <button
            className="uppercase inline-block bg-purple-600 text-white font-medium py-2.5 px-6
        leading-tight rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700
        focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-700 transition duration-150 ease-in-out"
            type="button"
            onClick={() => dispatch(setWithdrawModal("scale-100"))}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}

Treasury.propTypes = {
  stats: PropTypes.shape({
    id: PropTypes.number.isRequired,
    account: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
    cuts: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    payments: PropTypes.number.isRequired,
    payrolls: PropTypes.number.isRequired,
    workers: PropTypes.number.isRequired,
  }).isRequired,
};

export default Treasury;
