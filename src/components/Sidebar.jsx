import { NavLink } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { SlOrganization } from "react-icons/sl";
import { FiBook } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import PropTypes from "prop-types";

function Sidebar() {
  return (
    <aside className="lg:block hidden border-r border-gray-300">
      <header
        className="flex justify-between items-center space-x-2 border-b
         border-gray-300 px-5 py-[1.6rem]"
      >
        <div className="flex justify-center items-center space-x-1">
          <FaEthereum className="text-purple-700" size={20} />
          <span>Dapp</span>
          <span className="ml-1">Payroll</span>
        </div>
      </header>
      <div className="flex flex-col p-5">
        <NavItem
          Icon={<HiOutlineHome size={20} />}
          route="/"
          label={"Dashboard"}
        />
        <NavItem
          Icon={<SlOrganization size={20} />}
          route="/organizations"
          label={"Organizations"}
        />
        <NavItem
          Icon={<FiBook size={20} />}
          route="/payrolls"
          label={"Payrolls"}
        />
      </div>
    </aside>
  );
}

const NavItem = ({ Icon, route, label }) => {
  const inactiveClass = `flex justify-start items-center space-x-1 rounded-full hover:bg-gray-200
  p-3 font-semibold hover:text-purple-700 my-1 transition ease-in-out`;

  const activeClass = `flex justify-start items-center space-x-1 rounded-full hover:bg-gray-200 bg-gray-200
  p-3 font-semibold text-purple-700 my-1 transition ease-in-out`;

  return (
    <NavLink
      to={route}
      className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
    >
      {Icon}
      <span>{label}</span>
    </NavLink>
  );
};

NavItem.propTypes = {
  Icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default Sidebar;
