import { BrowserRouter, Routes, Route } from "react-router-dom";
import Income from "./pages/Income.jsx";
import Expense from "./pages/Expense.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Filter from "./pages/Filter.jsx";
import Category from "./pages/Category.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/income" element={<Income />} />
                    <Route path="/expense" element={<Expense />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/filter" element={<Filter />} />
                    <Route path="/category" element={<Category />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
