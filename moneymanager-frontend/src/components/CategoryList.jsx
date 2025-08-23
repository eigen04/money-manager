import { Layers2, Pencil, Trash2 } from "lucide-react";

const CategoryList = ({ categories, onEditCategory, onDeleteCategory }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5 border-b pb-3">
                <h4 className="text-xl font-semibold text-gray-800">Categories</h4>
                <span className="text-sm text-gray-500">{categories.length} total</span>
            </div>

            {/* Empty State */}
            {categories.length === 0 ? (
                <p className="text-gray-500 text-center py-10">
                    No categories available. Please add a category.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group bg-gray-50 hover:bg-purple-50 border border-gray-100 rounded-xl p-4 flex items-center gap-4 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 flex items-center justify-center text-xl bg-white border rounded-full shadow-sm">
                                {category.icon ? (
                                    <img
                                        src={category.icon}
                                        alt={category.name}
                                        className="w-6 h-6"
                                    />
                                ) : (
                                    <Layers2 className="text-purple-600" size={26} />
                                )}
                            </div>

                            {/* Details + Actions */}
                            <div className="flex-1 flex items-center justify-between">
                                <div>
                                    <p className="text-base text-gray-800 font-medium">
                                        {category.name}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1 capitalize">
                                        {category.type}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onEditCategory(category)}
                                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDeleteCategory(category)}
                                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryList;
