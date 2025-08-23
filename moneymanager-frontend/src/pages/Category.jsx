import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import CategoryList from "../components/CategoryList.jsx";
import toast from "react-hot-toast";
import Modal from "../components/Modal.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import AddCategoryForm from "../components/AddCategoryForm.jsx";
import { Plus } from "lucide-react";

const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fetch Categories
    const fetchCategoryDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY);
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    // Add Category
    const handleAddCategory = async (category) => {
        const { name, type, icon } = category;

        if (!name.trim()) {
            toast.error("Category Name is required");
            return;
        }

        const isDuplicate = categories.some(
            (c) => c.name.toLowerCase() === name.trim().toLowerCase()
        );
        if (isDuplicate) {
            toast.error("Category name already exists");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
                name,
                type,
                icon,
            });

            if (response.status === 200 || response.status === 201) {
                toast.success("Category Added Successfully");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        } catch (error) {
            console.error("Error adding category", error);
            if (error.response?.status === 409) {
                toast.error("Category with this name already exists");
            } else if (error.response?.status === 403) {
                toast.error("Not authorized! Please login again.");
            } else {
                toast.error(error.response?.data?.message || "Failed to Add Category");
            }
        }
    };

    // Edit Category
    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModal(true);
    };

    // Update Category
    const handleUpdateCategory = async (updatedCategory) => {
        const { id, name, type, icon } = updatedCategory;

        if (!name.trim()) {
            toast.error("Category Name is required");
            return;
        }

        try {
            const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {
                name,
                type,
                icon,
            });

            if (response.status === 200) {
                toast.success("Category Updated Successfully");
                setOpenEditCategoryModal(false);
                setSelectedCategory(null);
                fetchCategoryDetails();
            }
        } catch (error) {
            console.error("Error updating category", error);
            toast.error(error.response?.data?.message || "Failed to Update Category");
        }
    };

    return (
        <Dashboard activeMenu="category">
            <div className="max-w-6xl mx-auto my-8 px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Manage Categories</h2>
                    <button
                        onClick={() => setOpenAddCategoryModal(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white font-medium shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-200 ease-in-out active:scale-95"
                    >
                        <Plus size={18} />
                        Add Category
                    </button>
                </div>

                {/* Category List */}
                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading categories...</div>
                ) : (
                    <CategoryList
                        categories={categories}
                        onEditCategory={handleEditCategory}
                        onDeleteCategory={(cat) =>
                            setCategories(categories.filter((c) => c.id !== cat.id))
                        }
                    />
                )}

                {/* Add Modal */}
                <Modal
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                    title="Add Category"
                >
                    <AddCategoryForm onAddCategory={handleAddCategory} />
                </Modal>

                {/* Edit Modal */}
                <Modal
                    isOpen={openEditCategoryModal}
                    onClose={() => {
                        setOpenEditCategoryModal(false);
                        setSelectedCategory(null);
                    }}
                    title="Update Category"
                >
                    <AddCategoryForm
                        initialCategoryData={selectedCategory}
                        onAddCategory={handleUpdateCategory}
                        isEditing={true}
                    />
                </Modal>
            </div>
        </Dashboard>
    );
};

export default Category;
