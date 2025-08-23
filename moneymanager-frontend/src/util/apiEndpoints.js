export const BASE_URL="http://localhost:8080";
const CLOUDINARY_CLOUD_NAME = "dlhvbnvwh"

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO:"/profile",
    CATEGORY: "/categories",
    ADD_CATEGORY:"/categories",
    UPDATE_CATEGORY: (categoryId)=>`/categories/${categoryId}`,
    GET_ALL_INCOMES: "/incomes",
    CATEGORY_BY_TYPE:(type)=>`categories/${type}`,
    ADD_INCOME:"/incomes",
    DELETE_INCOME:(incomeId)=>`/incomes/${incomeId}`,
    GET_ALL_EXPENSES: "/expenses",
    ADD_EXPENSE: "/expenses",
    DELETE_EXPENSE: (id) => `/expenses/${id}`,
    INCOME_EXCEL_DOWNLOAD:"/excel/download/income",
    EMAIL_INCOME:"/email/income-excel",
    EXPENSE_EXCEL_DOWNLOAD:"/excel/download/expense",
    EMAIL_EXPENSE:"/email/expense-excel",
    APPLY_FILTERS:"/filter",
    DASHBOARD_DATA:"/dashboard",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}