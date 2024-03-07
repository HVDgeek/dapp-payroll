import ActionCard from "../components/ActionCard";
import FundTreasury from "../components/FundTreasury";
import Stats from "../components/Stats";
import Treasury from "../components/Treasury";

const Dashboard = () => {
  const stats = {
    id: 0,
    account: "",
    cuts: 0,
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
      <Treasury stats={stats} />
      <ActionCard organization />
      <FundTreasury />
    </>
  );
};

export default Dashboard;
