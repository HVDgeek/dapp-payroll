import PropTypes from "prop-types";

function Treasury({ stats }) {
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
          className="flex flex-col justify-center items-center border border-gray-200 h-20
        shadow-md w-full
        "
        >
          <button
            className="uppercase inline-block bg-purple-600 text-white font-medium py-2.5 px-6
        leading-tight rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700
        focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-700 transition duration-150 ease-in-out"
            type="button"
          >
            Fund account
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
    balance: PropTypes.number.isRequired,
    cuts: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    payments: PropTypes.number.isRequired,
    payrolls: PropTypes.number.isRequired,
    workers: PropTypes.number.isRequired,
  }).isRequired,
};

export default Treasury;
