import { NavLink } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { SlOrganization } from "react-icons/sl";
import { FiBook } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import PropTypes from "prop-types";

function Footer() {
  return (
    <aside
      className="lg:hidden flex justify-center items-center bg-white
    border-t border-gray-300 px-5 sm:px-20 fixed bottom-0 left-0 right-0"
    >
      <div className="flex justify-evenly items-center space-x-10">
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
  const inactiveClass = `flex flex-col justify-start items-center space-x-1 rounded-full hover:bg-gray-200
  p-3 font-semibold hover:text-purple-700 my-1 transition ease-in-out`;

  const activeClass = `flex flex-col justify-start items-center space-x-1 bg-gray-200 rounded-full hover:bg-gray-200
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

export default Footer;
