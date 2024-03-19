import PropTypes from "prop-types";

function Stats({ stats }) {
  return (
    <div>
      <h4 className="font-semibold text-2xl">Dashboard</h4>
      <div className="flex flex-col sm:flex-row justify-center item-center bg-white mt-5">
        <div
          className="flex flex-col justify-center items-center border border-gray-200 h-20
        shadow-md w-full
        "
        >
          <span className="text-lg font-bold text-purple-500 leading-1">
            {stats.id}
          </span>
          <span>Organizations</span>
        </div>
        <div
          className="flex flex-col justify-center items-center border border-gray-200 h-20
        shadow-md w-full
        "
        >
          <span className="text-lg font-bold text-purple-500 leading-1">
            {stats.payrolls}
          </span>
          <span>Payrolls</span>
        </div>
        <div
          className="flex flex-col justify-center items-center border border-gray-200 h-20
        shadow-md w-full
        "
        >
          <span className="text-lg font-bold text-purple-500 leading-1">
            {stats.workers}
          </span>
          <span>Workers</span>
        </div>
        <div
          className="flex flex-col justify-center items-center border border-gray-200 h-20
        shadow-md w-full
        "
        >
          <span className="text-lg font-bold text-purple-500 leading-1">
            {stats.payments}
          </span>
          <span>Payments</span>
        </div>
      </div>
    </div>
  );
}

Stats.propTypes = {
  stats: PropTypes.shape({
    id: PropTypes.number.isRequired,
    account: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    payments: PropTypes.number.isRequired,
    payrolls: PropTypes.number.isRequired,
    workers: PropTypes.number.isRequired,
  }).isRequired,
};

export default Stats;
