import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Menu, X } from "lucide-react";
import AppContext from "../context/AppContext.jsx";
import { assets } from "../assets/assets.js";
import Sidebar from "./Sidebar.jsx";

const Menubar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { user, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        clearUser();
        setShowDropdown(false);
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <div className="flex items-center justify-between bg-white border-b border-gray-200 backdrop-blur-[2px] py-4 px-5 sm:px-8 sticky top-0 z-30 shadow-sm">
            {/* Left Section (Logo + Menu Toggle) */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                    className="block lg:hidden text-gray-600 hover:bg-gray-100 p-2 rounded-md transition-colors"
                >
                    {openSideMenu ? <X size={22} /> : <Menu size={22} />}
                </button>
                <div className="flex items-center gap-2">
                    <img src={assets.logo} alt="logo" className="h-10 w-10" />
                    <span className="text-lg font-semibold text-gray-800 truncate">
            Money Manager
          </span>
                </div>
            </div>

            {/* Right Section (User Profile + Dropdown) */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                >
                    <User className="text-purple-600" size={20} />
                </button>

                {showDropdown && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                                    <User className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium text-gray-800 truncate">
                                        {user?.fullName || "Guest User"}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user?.email || "guest@example.com"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="py-2">
                            <button
                                onClick={handleLogOut}
                                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <LogOut size={16} className="text-gray-500" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Sidebar */}
            {openSideMenu && (
                <div className="fixed left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-20 top-[73px] shadow-md">
                    <Sidebar activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Menubar;
