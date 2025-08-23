import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList.jsx";
import Modal from "../components/Modal.jsx";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverView from "../components/IncomeOverView.jsx";
import { prepareIncomeLineChartData } from "../components/prepareIncomeLineChartData.jsx";
import CustomLineChart from "../components/CustomLineChart.jsx";

const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null }); // ✅ fix

    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) setIncomeData(response.data);
        } catch (error) {
            console.log("Failed to fetch income Details", error);
            toast.error(error.response?.data?.message || "Failed to fetch income Details");
        } finally {
            setLoading(false);
        }
    };

    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (response.status === 200) setCategories(response.data);
        } catch (error) {
            console.log("Failed to fetch income categories", error);
            toast.error(error.response?.data?.message || "Failed to fetch income categories");
        }
    };

    const handleAddIncome = async (income) => {
        const { name, ammount, date, icon, categoryId } = income;

        if (!name.trim()) return toast.error("Please enter a name");
        if (!ammount || isNaN(ammount) || Number(ammount) <= 0)
            return toast.error("Ammount should be a valid number greater than 0");
        if (!date) return toast.error("Please select a date");

        const today = new Date().toISOString().split("T")[0];
        if (date > today) return toast.error("Date cannot be in future");
        if (!categoryId) return toast.error("Please select a category");

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                ammount: Number(ammount),
                date,
                icon,
                categoryId,
            });
            if (response.status === 201) {
                setOpenAddIncomeModal(false);
                toast.success("Income added successfully");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        } catch (error) {
            console.log("Error adding income", error);
            toast.error(error.response?.data?.message || "Error adding income");
        }
    };

    const deleteIncome = async (id) => {
        setLoading(true);
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.log("Error deleting income", error);
            toast.error(error.response?.data?.message || "Error deleting income");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadIncomeDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, { responseType: "blob" });
            let filename = "income_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Download income details successfully");
        } catch (error) {
            console.error("Error downloading income details:", error);
            toast.error(error.response?.data?.message || "Error downloading income details");
        } finally {
            setLoading(false);
        }
    };

    const handleEMailIncomeDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
            if (response.status === 200) {
                toast.success("Income Details Emailed successfully");
            }
        } catch (error) {
            console.error("Error emailing income details", error);
            toast.error(error.response?.data?.message || "Error emailing income details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncomeCategories();
        fetchIncomeDetails();
    }, []);

    const chartData = prepareIncomeLineChartData(incomeData);

    return (
        <Dashboard activeMenu="Income">
            <div className="max-w-6xl mx-auto my-8 px-4">
                <div className="flex items-center justify-between mb-3"></div>

                <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
                    <IncomeOverView transactions={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)} />
                </div>

                {/* List section */}
                <div className="mt-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                        onDownload={handleDownloadIncomeDetails}   // ✅ fix
                        onEmail={handleEMailIncomeDetails}         // ✅ fix
                    />
                </div>

                {/* Modals */}
                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm onAddIncome={handleAddIncome} categories={categories} />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Income"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this income details?"
                        onDelete={() => deleteIncome(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </Dashboard>
    );
};

export default Income;
