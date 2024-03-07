import PropTypes from "prop-types";

function Stats({ stats }) {
  return (
    <div>
      <h4 className="mb-3 font-semibold text-2xl">Dashboard</h4>
      <div className="flex flex-col sm:flex-row justify-center item-center bg-white mt-10">
        <div
          className="flex flex-col justify-center items-center border border-gray-200 h-20
        shadow-md w-full
        "
        >
          <span>{stats.id}</span>
          <span>Organizations</span>
        </div>
        <div
          className="flex flex-col justify-center items-center border border-gray-200 h-20
        shadow-md w-full
        "
        >
          <span>{stats.payrolls}</span>
          <span>Payrolls</span>
        </div>
        <div
          className="flex flex-col justify-center items-center border border-gray-200 h-20
        shadow-md w-full
        "
        >
          <span>{stats.workers}</span>
          <span>Workers</span>
        </div>
        <div
          className="flex flex-col justify-center items-center border border-gray-200 h-20
        shadow-md w-full
        "
        >
          <span>{stats.payments}</span>
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
    balance: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    payments: PropTypes.number.isRequired,
    payrolls: PropTypes.number.isRequired,
    workers: PropTypes.number.isRequired,
  }).isRequired,
};

export default Stats;
