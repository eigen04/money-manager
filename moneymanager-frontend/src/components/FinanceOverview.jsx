import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { addThousandsSeperator } from "../util/util.js";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    const COLORS = ["#59168B", "#a0090e", "#016630"];

    const balancedata = [
        { name: "Total Balance", ammount: totalBalance },
        { name: "Total Expense", ammount: totalExpense },
        { name: "Total Income", ammount: totalIncome },
    ];

    // This function formats the labels on the pie chart
    const renderCustomizedLabel = ({ payload }) => {
        if (!payload || payload.ammount === 0) {
            return null; // Don't show a label for zero values
        }
        return addThousandsSeperator(payload.ammount);
    };

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg">Financial Overview</h5>
            </div>
            <div className="w-full h-72 relative overflow-visible">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={balancedata}
                            dataKey="ammount"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius="70%"
                            label={renderCustomizedLabel} // <-- The fix is here
                        >
                            {balancedata.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${addThousandsSeperator(value)}`} />
                        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FinanceOverview;