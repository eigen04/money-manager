import moment from "moment";

export const prepareExpenseLineChartData = (transactions = []) => {
    const grouped = {};
    transactions.forEach((t) => {
        const date = moment(t.date).format("DD MMM YYYY");
        if (!grouped[date]) {
            grouped[date] = 0;
        }
        grouped[date] += Number(t.ammount || 0);
    });

    const sortedDates = Object.keys(grouped).sort((a, b) => {
        return moment(a, "DD MMM YYYY").diff(moment(b, "DD MMM YYYY"));
    });

    return sortedDates.map((date) => ({
        date,
        amount: grouped[date],
    }));
};
