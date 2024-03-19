import { GrSearch } from "react-icons/gr";
import { useSelector } from "react-redux";
import { connectWallet, truncate } from "../services/blockchain";

function Header() {
  const { connectedAccount } = useSelector((state) => state.globalState);

  return (
    <header className="flex justify-start items-center border-b border-gray-300 space-x-10 p-5 sm:px-20">
      <div className="flex justify-start items-center space-x-2 w-full">
        <GrSearch size={20} />
        <input
          className="w-full flex-auto min-w-0 block text-base bg-transparent outline-none border-0
          px-3 font-normal text-gray-700 rounded bg-clip-padding transition ease-in-out focus:text-gray-700 focus:outline-none focus:ring-0"
          type="search"
          placeholder="Search"
        />
        <div className="h-5 border-r border-gray-300"></div>
        <button
          className="uppercase inline-block bg-purple-600 text-white font-medium py-2.5 px-6
        leading-tight rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700
        focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-700 transition duration-150 ease-in-out"
          type="button"
          onClick={connectWallet}
        >
          {truncate(connectedAccount, 5, 4, 12) || "Connect"}
        </button>
      </div>
    </header>
  );
}

export default Header;
