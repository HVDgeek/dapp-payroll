import { useSelector } from "react-redux";
import ActionCard from "../components/ActionCard";
import FundTreasury from "../components/FundTreasury";
import Stats from "../components/Stats";
import Treasury from "../components/Treasury";

const Dashboard = () => {
  const { stats } = useSelector((state) => state.globalState);
  return (
    <>
      {stats && <Stats stats={stats} />}
      {stats && <Treasury stats={stats} />}
      <ActionCard organization />
      <FundTreasury />
    </>
  );
};

export default Dashboard;
