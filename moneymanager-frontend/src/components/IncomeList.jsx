import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import {useState} from "react";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
    const [loading, setLoading] = useState(false);
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-xl font-semibold text-gray-800">Income Sources</h5>
                <div className="flex items-center gap-3">
                    {/* ✅ onClick lagao button pe, icon pe nahi */}
                    <button
                        onClick={onEmail}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium shadow hover:bg-purple-700 active:scale-95 transition"
                    >
                        <Mail size={16} />
                        Email
                    </button>
                    <button
                        onClick={onDownload}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium shadow hover:bg-gray-200 active:scale-95 transition"
                    >
                        <Download size={16} />
                        Download
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {transactions?.map((income) => (
                    <TransactionInfoCard
                        key={income.id}
                        title={income.name}
                        icon={income.icon}
                        date={moment(income.date).format("DD MMM YYYY")}
                        ammount={income.ammount}
                        type="income"
                        onDelete={() => onDelete(income.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default IncomeList;
