import Input from "./input.jsx";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
    const [category, setCategory] = useState({
        id: null,
        name: "",
        type: "income",
        icon: ""
    });
    const [loading, setloading] = useState(false);

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory({
                id: initialCategoryData.id,
                name: initialCategoryData.name || "",
                type: initialCategoryData.type || "income",
                icon: initialCategoryData.icon || ""
            });
        } else {
            setCategory({ id: null, name: "", type: "income", icon: "" });
        }
    }, [isEditing, initialCategoryData]);

    const categoryTypeOptions = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" }
    ];

    const handleChange = (field, value) => {
        setCategory({ ...category, [field]: value });
    };

    const handleSubmit = async () => {
        setloading(true);
        try {
            await onAddCategory(category); // Add or Update depending on isEditing
        } finally {
            setloading(false);
        }
    };

    return (
        <div className="p-4">
            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={category.name}
                onChange={(value) => handleChange("name", value)}
                label="Category Name"
                placeholder="e.g. Salary, Rent"
                type="text"
            />

            <Input
                value={category.type}
                onChange={(value) => handleChange("type", value)}
                label="Category Type"
                isSelect={true}
                options={categoryTypeOptions}
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="add-btn add-btn-fill"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            {isEditing ? "Updating..." : "Adding..."}
                        </>
                    ) : (
                        <>{isEditing ? "Update Category" : "Add Category"}</>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddCategoryForm;
