import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '/src/assets/images/Logo/fitzone_logo.png';
import { RxDashboard } from 'react-icons/rx';
import { IoIosArrowDown } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa6';
import { BsShop } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { IoSchoolOutline } from 'react-icons/io5';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxAvatar } from 'react-icons/rx';

interface SidebarProps {
  // interface for SidebarProps
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen
}: SidebarProps) {
  // SidebarProps is passed as an argument to AdminSidebar
  
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded'); // get the value of 'sidebar-expanded' from localStorage
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true' // if storedSidebarExpanded is null, set it to false, else set it to storedSidebarExpanded
  );
  const [isCourseSubmenuOpen, setIsCourseSubmenuOpen] = useState(false); // set isCourseSubmenuOpen to false

  const toggleCourseSubmenu = () => {
    setIsCourseSubmenuOpen(!isCourseSubmenuOpen);
  };

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString()); // set 'sidebar-expanded' to the value of sidebarExpanded as a string in localStorage
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded'); // add 'sidebar-expanded' to the body classList
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded'); // remove 'sidebar-expanded' from the body classList
    }
  }, [sidebarExpanded]);

  return (
    <aside
      className={`absolute left-0 top-0 z-[9999] flex h-screen w-72 flex-col overflow-y-hidden bg-blackColor3 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-6 lg:py-7">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="max-w-[150px] h-auto w-full" />
        </NavLink>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-white"
        >
          <FaArrowLeft className="mt-3 ml-4" />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}

              <li>
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-archivo text-textSidebar duration-300 ease-in-out hover:bg-graydark ${
                      isActive ? 'bg-graydark text-white' : ''
                    }`
                  }
                >
                  <RxDashboard />
                  Dashboard
                </NavLink>
              </li>

              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Courses --> */}
              <li>
                <div
                  onClick={toggleCourseSubmenu}
                  className={`cursor-pointer group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-textSidebar duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
                >
                  <IoSchoolOutline />
                  Courses
                  <IoIosArrowDown
                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                      isCourseSubmenuOpen && 'rotate-180'
                    }`}
                  />
                </div>

                {isCourseSubmenuOpen && (
                  <div
                    className={`translate transform overflow-hidden ${
                      !isCourseSubmenuOpen && 'hidden'
                    }`}
                  >
                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                      <li>
                        <NavLink
                          to="/admin/courses/week"
                          className={({ isActive }) =>
                            `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-textSidebar duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                              isActive ? 'bg-graydark text-white' : ''
                            }`
                          }
                        >
                          Weekly Courses
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/admin/courses/templates"
                          className={({ isActive }) =>
                            `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-textSidebar duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                              isActive ? 'bg-graydark text-white' : ''
                            }`
                          }
                        >
                          Courses Templates
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              {/* <!-- Menu Item Courses --> */}

              {/* <!-- Menu Item Shop --> */}
              <li>
                <NavLink
                  to="/admin/shop"
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-textSidebar duration-300 ease-in-out hover:bg-graydark  ${
                      isActive ? 'bg-graydark text-white' : ''
                    }`
                  }
                >
                  <BsShop />
                  Products
                </NavLink>
              </li>
              {/* <!-- Menu Item Products --> */}
              {/* <!-- Menu Item Users --> */}
              <li>
                <NavLink
                  to="/admin/orders"
                  className={({
                    isActive
                  }) => `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-textSidebar duration-300 ease-in-out hover:bg-graydark ${
                    isActive ? 'bg-graydark text-white' : ''
                  }
                  `}                >
                  <HiOutlineShoppingBag />

                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/members"
                  className={({
                    isActive
                  }) => `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-textSidebar duration-300 ease-in-out hover:bg-graydark ${
                    isActive ? 'bg-graydark text-white' : ''
                  }
                  `}
                >
                  <FiUsers />
                  Members
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/profile"
                  className={({
                    isActive
                  }) => `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-textSidebar duration-300 ease-in-out hover:bg-graydark ${
                    isActive ? 'bg-graydark text-white' : ''
                  }
                  `}
                >
                  <RxAvatar />
                  Profile
                </NavLink>
              </li>
              {/* <!-- Menu Item Users --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
}
