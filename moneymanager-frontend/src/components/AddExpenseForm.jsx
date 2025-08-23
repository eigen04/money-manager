import {useState, useMemo, useEffect} from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./input.jsx";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({ onAddExpense, categories = [] }) => {
    const [expense, setExpense] = useState({
        name: "",
        ammount: "",
        date: "",
        icon: "",
        categoryId: "",
    });
    const [loading, setLoading] = useState(false);

    const categoryOptions = useMemo(
        () =>
            Array.isArray(categories)
                ? categories.map((c) => ({ value: String(c.id), label: c.name }))
                : [],
        [categories]
    );

    const extractValue = (payload) => {
        if (payload && typeof payload === "object") {
            if (payload.target && "value" in payload.target) return payload.target.value;
            if ("value" in payload) return payload.value;
        }
        return payload ?? "";
    };

    const handleChange = (key, payload) => {
        const next = extractValue(payload);
        setExpense((prev) => ({ ...prev, [key]: next ?? "" }));
    };

    const handleAddExpense = async () => {
        setLoading(true);
        try {
            await onAddExpense(expense);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(categories.length > 0 && !expense.categoryId){
            setExpense((prev)=>({...prev, categoryId: categories[0].id}))
        }
    }, [categories, expense.categoryId]);

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon || ""}
                onSelect={(selectedIcon) =>
                    handleChange("icon", selectedIcon.native || selectedIcon.emoji || selectedIcon)
                }
            />

            <Input
                value={expense.name ?? ""}
                onChange={(v) => handleChange("name", v)}
                label="Expense Name"
                placeholder="e.g., Rent, Grocery"
                type="text"
            />

            <Input
                label="Category"
                value={expense.categoryId ?? ""}
                onChange={(v) => handleChange("categoryId", v)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={expense.ammount ?? ""}
                onChange={(v) => handleChange("ammount", v)}
                label="Amount"
                placeholder="e.g., 1200.00"
                type="number"
            />

            <Input
                value={expense.date ?? ""}
                onChange={(v) => handleChange("date", v)}
                label="Date"
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleAddExpense}
                    disabled={loading}
                    className="add-btn add-btn-fill flex items-center gap-2"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            Adding...
                        </>
                    ) : (
                        "Add Expense"
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;
