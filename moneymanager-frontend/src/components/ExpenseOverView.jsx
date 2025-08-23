import { useEffect, useState } from "react";
import CustomLineChart from "./CustomLineChart.jsx";
import { prepareExpenseLineChartData } from "./prepareExpenseLineChartData.jsx";
import { Plus } from "lucide-react";

const ExpenseOverView = ({ transactions, onAddExpense }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            {/* Heading */}
            <h5 className="text-lg font-semibold text-gray-800">Expense Overview</h5>
            <p className="text-xs text-gray-500 mb-4">
                Track your spending over time and analyze your expense trends.
            </p>

            <button
                className="add-btn flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg"
                onClick={onAddExpense}
            >
                <Plus size={16} /> Add Expense
            </button>

            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    );
};

export default ExpenseOverView;
