import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList.jsx";          // 🔥 same as IncomeList but for expense
import Modal from "../components/Modal.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";    // 🔥 same as AddIncomeForm but for expense
import DeleteAlert from "../components/DeleteAlert.jsx";
import ExpenseOverView from "../components/ExpenseOverView.jsx";  // 🔥 same as IncomeOverView but for expense
import { prepareExpenseLineChartData } from "../components/prepareExpenseLineChartData.jsx";

const Expense = () => {
    useUser();
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    // ✅ Fetch all expenses
    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if (response.status === 200) setExpenseData(response.data);
        } catch (error) {
            console.log("Failed to fetch expense details", error);
            toast.error(error.response?.data?.message || "Failed to fetch expense details");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch expense categories
    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) setCategories(response.data);
        } catch (error) {
            console.log("Failed to fetch expense categories", error);
            toast.error(error.response?.data?.message || "Failed to fetch expense categories");
        }
    };

    // ✅ Add expense
    const handleAddExpense = async (expense) => {
        const { name, ammount, date, icon, categoryId } = expense;

        if (!name.trim()) return toast.error("Please enter a name");
        if (!ammount || isNaN(ammount) || Number(ammount) <= 0)
            return toast.error("Amount should be a valid number greater than 0");
        if (!date) return toast.error("Please select a date");

        const today = new Date().toISOString().split("T")[0];
        if (date > today) return toast.error("Date cannot be in future");
        if (!categoryId) return toast.error("Please select a category");

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                ammount: Number(ammount),
                date,
                icon,
                categoryId,
            });
            if (response.status === 201) {
                setOpenAddExpenseModal(false);
                toast.success("Expense added successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        } catch (error) {
            console.log("Error adding expense", error);
            toast.error(error.response?.data?.message || "Error adding expense");
        }
    };

    // ✅ Delete expense
    const deleteExpense = async (id) => {
        setLoading(true);
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.log("Error deleting expense", error);
            toast.error(error.response?.data?.message || "Error deleting expense");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Download Excel
    const handleDownloadExpenseDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, { responseType: "blob" });
            let filename = "expense_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Downloaded expense details successfully");
        } catch (error) {
            console.error("Error downloading expense details:", error);
            toast.error(error.response?.data?.message || "Error downloading expense details");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Email Expense
    const handleEMailExpenseDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
            if (response.status === 200) {
                toast.success("Expense Details emailed successfully");
            }
        } catch (error) {
            console.error("Error emailing expense details", error);
            toast.error(error.response?.data?.message || "Error emailing expense details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenseCategories();
        fetchExpenseDetails();
    }, []);

    const chartData = prepareExpenseLineChartData(expenseData);

    return (
        <Dashboard activeMenu="Expense">
            <div className="max-w-6xl mx-auto my-8 px-4">
                {/* Overview */}
                <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
                    <ExpenseOverView transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)} />
                </div>

                {/* List section */}
                <div className="mt-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                        onDownload={handleDownloadExpenseDetails}
                        onEmail={handleEMailExpenseDetails}
                    />
                </div>

                {/* Add Expense Modal */}
                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense} categories={categories} />
                </Modal>

                {/* Delete Expense Modal */}
                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Expense"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this expense?"
                        onDelete={() => deleteExpense(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </Dashboard>
    );
};

export default Expense;
