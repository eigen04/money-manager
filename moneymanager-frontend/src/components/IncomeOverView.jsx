import { useEffect, useState } from "react";
import CustomLineChart from "./CustomLineChart.jsx";
import { prepareIncomeLineChartData } from "./prepareIncomeLineChartData.jsx";
import { Plus } from "lucide-react";

const IncomeOverView = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            {/* Heading */}
            <h5 className="text-lg font-semibold text-gray-800">Income Overview</h5>
            <p className="text-xs text-gray-500 mb-4">
                Track your earnings over time and analyze your income trends.
            </p>
            {/* CORRECTED ADD INCOME BUTTON */}
            <button
                className="add-btn flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg"
                onClick={onAddIncome}
            >
                <Plus size={16} /> Add Income
            </button>

            {/* Chart below heading */}
            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    );
};

export default IncomeOverView;