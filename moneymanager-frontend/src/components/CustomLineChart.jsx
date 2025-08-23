import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// A helper function to format large numbers (e.g., 10000 -> 10k)
const formatYAxisTick = (tick) => {
    if (tick >= 1000000) {
        return `${(tick / 1000000).toFixed(1)}M`; // Format millions
    }
    if (tick >= 1000) {
        return `${Math.round(tick / 1000)}k`; // Format thousands
    }
    return tick;
};

const CustomLineChart = ({ data }) => {
    return (
        // Changed width to 100% for better responsiveness
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 20, // FIX 1: Increased left margin to give labels space
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                {/* FIX 2: Added the tickFormatter to the Y-axis */}
                <YAxis tickFormatter={formatYAxisTick} />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;