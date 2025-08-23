import { UtensilsCrossed, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { addThousandsSeperator } from "../util/util.js";

const TransactionInfoCard = ({
                                 icon,
                                 title,
                                 date,
                                 ammount,
                                 type,
                                 hideDeleteBtn,
                                 onDelete,
                             }) => {
    const getAmmountStyles = () =>
        type.toLowerCase() === "income"
            ? "bg-green-50 text-green-800"
            : "bg-red-50 text-red-800";

    return (
        <div className="relative flex items-center justify-between gap-4 mt-2 p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition group">
            {/* Icon */}
            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {icon && !String(icon).startsWith("http") ? (
                    <span className="text-2xl">{icon}</span>
                ) : (
                    <UtensilsCrossed className="text-purple-500" />
                )}
            </div>

            {/* Details */}
            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-700">{title}</p>
                    <p className="text-xs text-gray-400 mt-1">{date}</p>
                </div>
                <div className="flex items-center gap-2">
                    {!hideDeleteBtn && (
                        <button
                            onClick={onDelete}
                            className="text-gray-400 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-semibold ${getAmmountStyles()}`}
                    >
                        <h6>
                            {type.toLowerCase() === "income" ? "+" : "-"}$
                            {ammount ? addThousandsSeperator(Math.abs(ammount)) : "0"}
                        </h6>
                        {type.toLowerCase() === "income" ? (
                            <TrendingUp size={15} />
                        ) : (
                            <TrendingDown size={15} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;