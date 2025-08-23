import {useState, useMemo, useEffect} from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./input.jsx";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm = ({ onAddIncome, categories = [] }) => {
    const [income, setIncome] = useState({
        name: "",
        ammount: "",
        date: "",
        icon: "",
        categoryId: "",
    });
    const [loading, setLoading] = useState(false);

    // Safe options list
    const categoryOptions = useMemo(
        () =>
            Array.isArray(categories)
                ? categories.map((c) => ({ value: String(c.id), label: c.name }))
                : [],
        [categories]
    );

    // Always extract a string value (supports event, {value}, or raw)
    const extractValue = (payload) => {
        if (payload && typeof payload === "object") {
            if (payload.target && "value" in payload.target) return payload.target.value;
            if ("value" in payload) return payload.value;
        }
        return payload ?? "";
    };

    const handleChange = (key, payload) => {
        const next = extractValue(payload);
        setIncome((prev) => ({ ...prev, [key]: next ?? "" }));
    };

    const handleAddIncome = async () => {
        setLoading(true);
        try {
            await onAddIncome(income);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if(categories.length>0 && !income.categoryId){
            setIncome((prev)=>({...prev,categoryId: categories[0].id}))
        }
    }, [categories,income.categoryId]);

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon || ""}
                onSelect={(selectedIcon) =>
                    handleChange("icon", selectedIcon.native || selectedIcon.emoji || selectedIcon)
                }
            />

            <Input
                value={income.name ?? ""}
                onChange={(v) => handleChange("name", v)}
                label="Income Source"
                placeholder="e.g., Salary, Freelance"
                type="text"
            />

            <Input
                label="Category"
                value={income.categoryId ?? ""}
                onChange={(v) => handleChange("categoryId", v)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={income.ammount ?? ""}
                onChange={(v) => handleChange("ammount", v)}
                label="Ammount"
                placeholder="e.g., 500.00"
                type="number"
            />

            <Input
                value={income.date ?? ""}
                onChange={(v) => handleChange("date", v)}
                label="Date"
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleAddIncome}
                    disabled={loading}
                    className="add-btn add-btn-fill flex items-center gap-2"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            Adding...
                        </>
                    ) : (
                        "Add Income"
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;
