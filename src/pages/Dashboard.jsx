import { useSelector } from "react-redux";
import ActionCard from "../components/ActionCard";
import FundTreasury from "../components/FundTreasury";
import Stats from "../components/Stats";
import Treasury from "../components/Treasury";
import Withdrawal from "../components/Withdrawal";

const Dashboard = () => {
  const { stats } = useSelector((state) => state.globalState);
  return (
    <>
      {<Stats stats={stats} />}
      {<Treasury stats={stats} />}
      <ActionCard organization />
      <FundTreasury />
      <Withdrawal />
    </>
  );
};

export default Dashboard;
