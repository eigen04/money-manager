import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeMenu }) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200 p-6 sticky top-[61px] z-20 shadow-sm">
            {/* Profile Section */}
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-8">
                {user?.profileImageUrl ? (
                    <img
                        src={user.profileImageUrl}
                        alt="profile"
                        className="w-20 h-20 rounded-full object-cover shadow-md border"
                    />
                ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full shadow-md">
                        <User className="w-10 h-10 text-gray-400" />
                    </div>
                )}
                <h5 className="text-gray-900 font-semibold text-base">
                    {user?.fullName || "Guest User"}
                </h5>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>

            {/* Sidebar Menu */}
            <nav className="space-y-2">
                {SIDE_BAR_DATA.map((item, index) => (
                    <button
                        onClick={() => navigate(item.path)}
                        key={`menu_${index}`}
                        className={`w-full flex items-center gap-3 text-[15px] px-4 py-3 rounded-lg transition-all duration-200
              ${
                            activeMenu === item.label
                                ? "bg-purple-600 text-white shadow"
                                : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                        }`}
                    >
                        <item.icon className="text-lg" />
                        {item.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
