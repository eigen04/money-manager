import {ArrowRight} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const Transactions = ({ transactions, onMore, type, title }) => {
    return (
        <div className="card">
            {/* Top Section: Title + More Button */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                <button className="card-btn flex items-center gap-1" onClick={onMore}>
                    More <ArrowRight className="text-base" size={15} />
                </button>
            </div>

            {/* Transactions List */}
            <div className="mt-6">
                {transactions?.slice(0, 5)?.map(item => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("DD MMM YYYY")}
                        ammount={item.ammount}
                        type={type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    );
};
export default Transactions;
