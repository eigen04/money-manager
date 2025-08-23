import Dashboard from '../components/Dashboard.jsx';
import {useUser} from "../hooks/useUser.jsx";
import InfoCard from "../components/InfoCard.jsx";
import {Coins, Wallet, WalletCards} from "lucide-react";
import {addThousandsSeperator} from "../util/util.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";

const Home = () => {
    useUser();
    const navigate = useNavigate();
    const [dashboardData,setDashboardData]=useState(null);
    const [loading,setLoading]=useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
            if (response.status === 200) {

                // --- ADD THE LINE RIGHT HERE ---
                console.log("API Response Data:", response.data);

                setDashboardData(response.data);
            } else {
                toast.error('Failed to fetch dashboard data');
            }
        } catch (error) {
            console.error('Something went wrong while fetching dashboard data', error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDashboardData();
        return () =>{};
    }, []);
    return(
        <div>
            <Dashboard activeMenu="dashboard">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InfoCard
                            icon={<WalletCards/>}
                            label="Toatl Balance"
                            value={addThousandsSeperator(dashboardData?.totalBalance || 0)}
                            color="bg-purple-800"
                        />
                        <InfoCard
                            icon={<Wallet/>}
                            label="Toatl Income"
                            value={addThousandsSeperator(dashboardData?.totalIncome || 0)}
                            color="bg-green-800"
                        />
                        <InfoCard
                            icon={<Coins/>}
                            label="Toatl Expense"
                            value={addThousandsSeperator(dashboardData?.totalExpense || 0)}
                            color="bg-red-800"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <RecentTransactions
                            transactions={dashboardData?.recentTransactions}
                            onMore = {()=>navigate("/expense")}
                            />
                        <FinanceOverview
                            totalBalance={dashboardData?.totalBalance || 0}
                            totalIncome={dashboardData?.totalIncome || 0}
                            totalExpense={dashboardData?.totalExpense || 0}
                        />
                        <Transactions
                            transactions={dashboardData?.recent5Expenses || []}
                            onMore={()=>navigate("/expense")}
                            type="expense"
                            title="Recent Expenses"
                            />
                        <Transactions
                            transactions={dashboardData?.recent5Incomes || []}
                            onMore={()=>navigate("/income")}
                            type="income"
                            title="Recent Incomes"
                        />
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}
export default Home;