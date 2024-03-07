import Stats from "../components/Stats";

const Dashboard = () => {
  const stats = {
    id: 0,
    account: "",
    balance: 0,
    name: "",
    description: "",
    payments: 0,
    payrolls: 0,
    workers: 0,
  };

  return (
    <>
      <Stats stats={stats} />
    </>
  );
};

export default Dashboard;
