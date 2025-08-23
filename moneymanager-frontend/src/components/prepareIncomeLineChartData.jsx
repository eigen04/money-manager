import moment from "moment";

export const prepareIncomeLineChartData = (transactions = []) => {
    // 1. Group transactions by date and sum amounts
    const grouped = {};
    transactions.forEach((t) => {
        // Use a more specific date format to ensure correct sorting across months/years
        const date = moment(t.date).format("DD MMM YYYY");
        if (!grouped[date]) {
            grouped[date] = 0;
        }
        grouped[date] += Number(t.ammount || 0);
    });

    // 2. Get the unique dates and sort them
    const sortedDates = Object.keys(grouped).sort((a, b) => {
        return moment(a, "DD MMM YYYY").diff(moment(b, "DD MMM YYYY"));
    });

    // 3. Create the final array using the sorted dates
    return sortedDates.map((date) => ({
        date,
        amount: grouped[date],
    }));
};