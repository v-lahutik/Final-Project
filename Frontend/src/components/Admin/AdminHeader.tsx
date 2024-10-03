import { Link } from 'react-router-dom';
import Logo from '/src/assets/images/Logo/fitzone_logo.png';
import { CiMenuBurger } from 'react-icons/ci';
import { CiSearch } from 'react-icons/ci';
import { FaRegBell } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { useState, useContext } from 'react';
import { UserContext } from '/src/context/UserContext';

const AdminHeader = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const userContext = useContext(UserContext);
  const {logout}  = userContext;

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-sm ">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-sm md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <CiMenuBurger />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img
              src={Logo}
              alt="Logo"
              className="max-w-[150px] h-auto w-full"
            />
          </Link>
        </div>

        <div className="hidden sm:block">
          <form action="" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <CiSearch />
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <div className="relative">
              <li>
                <a
                  className="relative flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full border-[0.5px] border-stroke bg-grey hover:text-primary "
                  href="/"
                >
                  <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 inline">
                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                  </span>

                  <FaRegBell />
                </a>
              </li>
            </div>
          </ul>
          <div className="relative">
            <button
              className="flex items-center gap-4"
              onClick={toggleDropdown}
            >
              <span className="hidden text-right lg:block">
                <span className="block text-sm font-medium text-black dark:text-white">
                  Taishi Shibamoto
                </span>
                <span className="block text-xs">Web Developer</span>
              </span>
              <span className="h-12 w-12 rounded-full">
                <img
                  src="/src/assets/images/Team/team_1_1.png"
                  alt="User"
                  className="rounded-full"
                />
              </span>
              <IoIosArrowDown
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-gray-400"
              />
            </button>

            <div
              className={`absolute right-0 z-999  w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition transform duration-300 ease-in-out ${
                isOpen
                  ? 'opacity-100 scale-100 '
                  : 'opacity-0 scale-95 pointer-events-none'
              } `}
            >
              <div className="py-1">
                <li
                  
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 "
                >
                  Your Profile
                </li>
                <li
                  
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 "
                >
                  Settings
                </li>
                <li
                  onClick={() => logout()}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 "
                >
                  Sign out
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
