import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const RecentTransactions = ({ transactions = [], onMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h4 className="text-lg">Recent Transactions</h4>
                <button className="card-btn" onClick={onMore}>
                    More <ArrowRight className="text-base" size={15} />
                </button>
            </div>
            <div className="mt-6">
                {transactions?.slice(0, 5).map((item, index) => (
                    <TransactionInfoCard
                        key={item.id + "-" + index} // <--- The fix is here
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("DD-MM-YYYY")}
                        ammount={Math.abs(item.ammount)}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;