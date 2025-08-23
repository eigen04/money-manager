import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { Search } from "lucide-react";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import moment from "moment";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";

const Filter = () => {
    const [type, setType] = useState("income");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortField, setSortField] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder,
            });
            console.log("transactions", response.data);
            setTransactions(response.data);
        } catch (error) {
            console.error("Failed to fetch transactions", error);
            toast.error(error.message || "Failed to fetch transactions. Please try again");
        } finally {
            setLoading(false);
        }
    };

    useUser();

    return (
        <Dashboard activeMenu="Filters">
            <div className="my-6 mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Filter Transactions</h2>
                </div>

                {/* Filter Section */}
                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="text-lg font-semibold text-gray-700">Select Filters</h5>
                    </div>

                    <form
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                        onSubmit={handleSearch}
                    >
                        {/* Transaction Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="type">
                                Type
                            </label>
                            <select
                                value={type}
                                id="type"
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="startdate">
                                Start Date
                            </label>
                            <input
                                value={startDate}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                type="date"
                                id="startdate"
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="enddate">
                                End Date
                            </label>
                            <input
                                value={endDate}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                type="date"
                                id="enddate"
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>

                        {/* Sort Field */}
                        <div>
                            <label htmlFor="sortfield" className="block text-sm font-medium text-gray-600 mb-2">
                                Sort Field
                            </label>
                            <select
                                value={sortField}
                                id="sortfield"
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                onChange={(e) => setSortField(e.target.value)}
                            >
                                <option value="date">Date</option>
                                <option value="ammount">Amount</option>
                                <option value="category">Category</option>
                                <option value="name">Name</option>
                            </select>
                        </div>

                        {/* Sort Order */}
                        <div>
                            <label htmlFor="sortorder" className="block text-sm font-medium text-gray-600 mb-2">
                                Sort Order
                            </label>
                            <select
                                value={sortOrder}
                                id="sortorder"
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>

                        {/* Search Input */}
                        <div className="flex flex-col justify-end">
                            <label htmlFor="keyword" className="block text-sm font-medium text-gray-600 mb-2">
                                Search
                            </label>
                            <div className="flex">
                                <input
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    id="keyword"
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full border rounded-l-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-r-lg flex items-center justify-center transition"
                                >
                                    <Search size={20} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Transactions Section */}
                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Transactions</h5>
                    </div>

                    {!loading && transactions.length === 0 && (
                        <p className="text-gray-500">Select the filters and click apply to see transactions.</p>
                    )}

                    {loading && <p className="text-gray-500">Loading Transactions...</p>}

                    {transactions.map((transaction) => (
                        <TransactionInfoCard
                            key={transaction.id}
                            title={transaction.name}
                            icon={transaction.icon || "💰"} // fallback icon
                            date={moment(transaction.date).format("DD-MM-YYYY")}
                            ammount={transaction.ammount} // ✅ Corrected typo from "munt" to "ammount"
                            type={transaction.type || type} // backend type preferred
                            hideDeleteBtn
                        />
                    ))}
                </div>
            </div>
        </Dashboard>
    );
};

export default Filter;