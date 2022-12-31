import { useContext, useState } from "react";
import {
  Modal,
  Label,
  TextInput,
  Checkbox,
  Button,
  Select,
} from "flowbite-react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ToggleDarkMode } from "../context/ToggleDarkMode";
import { useClickOutside } from "../hooks";
import Logo from "../assets/logo.png";

const Header = () => {
  const { email, name } = useContext(UserContext);
  const { darkMode, toggleDarkMode } = useContext(ToggleDarkMode);

  const [show, setShow] = useState(false);

  const toggleTransactionModal = () => {
    setShow(!show);
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <header className="fixed top-0 w-screen z-10 border-b border-gray-200 dark:border-gray-700">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 min-h-[60px]">
        <div className="flex flex-wrap items-center">
          <SideBarMenu />
          <button
            onClick={toggleTransactionModal}
            type="button"
            className="ml-auto mr-4 text-white inline-flex items-center bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              className="mr-1 -ml-1 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Add new
          </button>
          <button
            type="button"
            onClick={toggleDarkMode}
            className=" mr-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            )}
          </button>
          <ProfileMenu name={name} email={email} />
        </div>
        <TransactionModel show={show} onClose={onClose} />
      </nav>
    </header>
  );
};
// amount, category, paidWith, transactionType, type, description, date,
// type: // Income or Spend or Transfer or Balance
// transactionType: // Deit or Credit
// paidWith: // Cash or Card or Gpay or Phonepe or Paytm or UPI
// category: // Transport or Food or Rent or Personal or Balance or Other
const TransactionModel = ({
  onClose,
  show,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      show={show}
      size="4xl"
      position="center"
      // popup={true}
      onClose={onClose}
    >
      <Modal.Header>Add new transaction</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <Label
                  htmlFor="TransactionType"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Transaction Type
                </Label>
                <Select
                  id="TransactionType"
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="Type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type
                </Label>
                <Select
                  id="Type"
                  defaultValue="select"
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="select">Select category</option>
                  <option value="Income">Income</option>
                  <option value="Spend">Spend</option>
                  <option value="Transfer">Transfer</option>
                  <option value="Balance">Balance</option>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="PaidWith"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Paid With
                </Label>
                <Select
                  name="PaidWith"
                  id="PaidWith"
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </Label>
                <Select
                  id="category"
                  defaultValue="select"
                  placeholder="Select category"
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="select">Select category</option>
                  <option value="Transport">Transport</option>
                  <option value="Food">Food</option>
                  <option value="Rent">Rent</option>
                  <option value="Personal">Personal</option>
                  <option value="Balance">Balance</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="Amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amount
                </Label>
                <TextInput
                  type="number"
                  name="Amount"
                  id="Amount"
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="₹500"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="Date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </Label>
                <TextInput
                  type="date"
                  name="Date"
                  id="Date"
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="₹500"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </Label>
                <textarea
                  id="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write product description here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <svg
                className="mr-1 -ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add new Transaction
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const sideNavLink = [
  {
    to: "/dashboard",
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
      </svg>
    ),
    label: "Overview",
  },
  {
    to: "transactions",
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 640 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64H337.9c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64h64V320zM320 352c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96s43 96 96 96z" />
      </svg>
    ),
    label: "Transactions",
  },
  {
    to: "groups",
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 640 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
      </svg>
    ),
    label: "Groups",
  },
];

const activeSideNavLink = {
  backgroundColor: "rgb(243 244 246 / 1)",
  color: "rgb(17 24 39 / 1)",
};

const ProfileMenu = ({ name, email }: { name: string; email: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  let dropdownRef = useClickOutside(() => setIsDropdownOpen(false));

  return (
    <div ref={dropdownRef} className="flex items-center lg:order-2 mr-2">
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="user photo"
        />
      </button>
      <div
        className={`${
          isDropdownOpen ? "" : "hidden"
        } z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        style={
          isDropdownOpen
            ? {
                position: "absolute",
                top: "60px",
                right: "0px",
                margin: "0px",
              }
            : {}
        }
        id="dropdown"
      >
        <div className="py-3 px-4">
          <span className="block text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </span>
          <span className="block text-sm font-light text-gray-500 truncate dark:text-gray-400">
            {email}
          </span>
        </div>
        <ul
          className="py-1 font-light text-gray-500 dark:text-gray-400"
          aria-labelledby="dropdown"
        >
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
            >
              My profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
            >
              Account settings
            </a>
          </li>
        </ul>
        <ul
          className="py-1 font-light text-gray-500 dark:text-gray-400"
          aria-labelledby="dropdown"
        >
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const SideBarMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  let sidebarRef = useClickOutside(() => setIsSidebarOpen(false));

  return (
    <div ref={sidebarRef} className="flex justify-start items-center">
      <button
        onClick={toggleSidebar}
        className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        <svg
          aria-hidden="true"
          className="hidden w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Toggle sidebar</span>
      </button>
      <div
        className={`${
          isSidebarOpen ? "" : "hidden"
        } overflow-hidden z-50 my-4 min-w-[16rem] h-screen max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 drop-shadow-lg dark:divide-gray-600 dark:bg-gray-700`}
        id="notification-dropdown"
        style={
          isSidebarOpen
            ? {
                position: "absolute",
                top: "64px",
                left: "0px",
                margin: "0px",
              }
            : {}
        }
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-t border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul className="space-y-2">
            {sideNavLink.map((link, index) => (
              <li key={index}>
                <NavLink
                  end
                  to={link.to}
                  style={({ isActive }) =>
                    isActive ? activeSideNavLink : undefined
                  }
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {link.icon}
                  <span className="ml-3">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex mr-4">
        <img src={Logo} className="mr-3 h-8" alt="FlowBite Logo" />
        <span className="self-center hidden md:block text-2xl font-semibold whitespace-nowrap dark:text-white">
          SpendingTracker
        </span>
      </div>
    </div>
  );
};

export default Header;
