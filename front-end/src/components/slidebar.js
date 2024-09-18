import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext'; // Correct casing and path


const Sidebar = () => {
    const { user, logout } = useContext(AuthContext); // Get user info and logout function
    const navigate = useNavigate(); // For navigation after logout

    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <div>
            <nav className="sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300">
                <div className="h-full bg-white dark:bg-[#0e1726]">
                    <div className="flex items-center justify-between px-4 py-3">
                        <span className="main-logo text-2xl font-semibold dark:text-white-light">MANAGEMENT-APP</span>
                    </div>

                    <ul className="h-[calc(100vh-80px)] space-y-0.5 overflow-y-auto p-4 py-0 font-semibold">
                        {/* Dashboard Link */}
                        <li className="menu nav-item">
                            <Link to="/adminpages" className="nav-link group flex items-center">
                                <svg className="shrink-0 group-hover:!text-primary" width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.5" d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z" fill="currentColor" />
                                    <path d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="currentColor" />
                                </svg>
                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                                    Dashboard
                                </span>
                            </Link>
                        </li>

                        {/* Add more links here as needed */}
                    </ul>

                    {/* Logout Button */}
                    <div className="p-4">
                        <button onClick={handleLogout} className="w-full py-2 text-center text-white bg-red-500 rounded-md hover:bg-red-600">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
