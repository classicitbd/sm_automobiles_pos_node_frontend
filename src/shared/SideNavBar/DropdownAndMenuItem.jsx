import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

export const MenuItem = ({ to, icon: Icon, label, isActive, onClick }) => (
  <li>
    <Link
      to={to}
      onClick={onClick} // Collapse all dropdowns when a menu item is clicked
      className={`flex items-center h-11 pr-6 pl-4 hover:bg-primaryVariant-600 hover:border-primaryVariant-100 border-l-2 border-transparent hover:border-l-2 cursor-pointer ${
        isActive && "bg-primaryVariant-600 border-primaryVariant-100 border-l-2"
      }`}
    >
      <Icon size={20} className="text-white" />
      <span className="ml-2 text-sm tracking-wide truncate text-white">
        {label}
      </span>
    </Link>
  </li>
);

export const DropdownMenu = ({
  label,
  icon: Icon,
  isOpen,
  onClick,
  children,
}) => (
  <>
    <li
      className={`flex items-center justify-between w-full  px-4 py-2 text-white hover:bg-primaryVariant-500 border-l-2 border-transparent hover:border-primaryVariant-100 hover:border-l-2 cursor-pointer ${
        isOpen
          ? "bg-primaryVariant-500 border-primaryVariant-100 border-l-2"
          : ""
      }`}
      onClick={onClick} // Toggle the dropdown
    >
      <span className="flex items-center gap-2">
        <Icon size={20} className="text-white" />
        {label}
      </span>
      <FiChevronDown
        size={20}
        className={`transition-transform duration-300 ${
          isOpen ? "-rotate-180" : ""
        }`}
      />
    </li>
    <li
      className={`bg-primaryVariant-750 overflow-hidden duration-300 ease-in-out transition-all ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      <ul className="space-y-1.5 py-1 pb-2 list-none">{children}</ul>
    </li>
  </>
);
export const ChildDropdownMenu = ({
  label,
  icon: Icon,
  isOpen,
  onClick,
  children,
}) => (
  <>
    <li
      className={`flex items-center justify-between w-full  pr-4 pl-8 py-2 text-white hover:bg-primaryVariant-500  hover:border-primaryVariant-100 hover:border-l-2 cursor-pointer ${
        isOpen
          ? "bg-primaryVariant-500 border-primaryVariant-100 border-l-2"
          : ""
      }`}
      onClick={onClick} // Toggle the dropdown
    >
      <span className="flex items-center gap-2">
        <Icon size={20} className="text-white" />
        {label}
      </span>
      <FiChevronDown
        size={20}
        className={`transition-transform duration-300 ${
          isOpen ? "-rotate-180" : ""
        }`}
      />
    </li>
    <li
      className={`bg-primaryVariant-750 overflow-hidden duration-300 ease-in-out transition-all ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      <ul className="space-y-1.5 py-1 pb-2 list-none">{children}</ul>
    </li>
  </>
);

export const ChildMenuItem = ({ to, icon: Icon, label, isActive, onClick }) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center h-[34px] pr-6 pl-8 hover:bg-primaryVariant-600 hover:border-primaryVariant-100 border-l-2 border-transparent  hover:border-l-2 ${isActive}`}
    >
      <Icon size={20} className="text-white" />
      <span className="ml-2 text-sm tracking-wide truncate text-white">
        {label}
      </span>
    </Link>
  </li>
);
export const SubChildMenuItem = ({ to, icon: Icon, label, isActive }) => (
  <li>
    <Link
      to={to}
      className={`flex items-center h-[34px] pr-6 pl-12 hover:bg-primaryVariant-600 hover:border-primaryVariant-100 border-l-2 border-transparent  hover:border-l-2 ${isActive}`}
    >
      <Icon size={20} className="text-white" />
      <span className="ml-2 text-xs tracking-wide truncate text-white">
        {label}
      </span>
    </Link>
  </li>
);
