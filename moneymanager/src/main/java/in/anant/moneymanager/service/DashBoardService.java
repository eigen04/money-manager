package in.anant.moneymanager.service;

import in.anant.moneymanager.dto.ExpenseDto;
import in.anant.moneymanager.dto.IncomeDto;
import in.anant.moneymanager.dto.RecentTransactionDto;
import in.anant.moneymanager.entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class DashBoardService {
    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final ProfileService profileService;

    public Map<String,Object> getDashboardData() {
        ProfileEntity profile = profileService.getCurrentProfile();
        Map<String,Object> returnValue = new LinkedHashMap<>();

        List<IncomeDto> latestIncomes = incomeService.getLatest5IncomesForCurrentUser();
        List<ExpenseDto> latestExpenses = expenseService.getLatest5ExpensesForCurrentUser();

        // ✅ Stream.concat fix
        List<RecentTransactionDto> recentTransactionDtos = Stream.concat(
                        latestIncomes.stream().map(income ->
                                RecentTransactionDto.builder()
                                        .id(income.getId())
                                        .profileId(profile.getId())
                                        .date(income.getDate())
                                        .ammount(income.getAmmount())
                                        .name(income.getName())
                                        .icon(income.getIcon())
                                        .createdAt(income.getCreatedAt())
                                        .updatedAt(income.getUpdatedAt())
                                        .type("Income")
                                        .build()
                        ),
                        latestExpenses.stream().map(expense ->
                                RecentTransactionDto.builder()
                                        .id(expense.getId())
                                        .profileId(profile.getId())
                                        .date(expense.getDate())
                                        .ammount(expense.getAmmount())
                                        .name(expense.getName())
                                        .icon(expense.getIcon())
                                        .createdAt(expense.getCreatedAt())
                                        .updatedAt(expense.getUpdatedAt())
                                        .type("Expense")
                                        .build()
                        )
                )
                .sorted((a, b) -> {
                    int cmp = b.getDate().compareTo(a.getDate());
                    if (cmp == 0 && a.getCreatedAt() != null && b.getCreatedAt() != null) {
                        return b.getCreatedAt().compareTo(a.getCreatedAt());
                    }
                    return cmp;
                })
                .collect(Collectors.toList()); // ✅ works in all Java versions

        returnValue.put("totalBalance", incomeService.getTotalIncomeForCurrentUser()
                .subtract(expenseService.getTotalExpenseForCurrentUser()));
        returnValue.put("totalIncome", incomeService.getTotalIncomeForCurrentUser());
        returnValue.put("totalExpense", expenseService.getTotalExpenseForCurrentUser());
        returnValue.put("recent5Expenses", latestExpenses);
        returnValue.put("recent5Incomes", latestIncomes);
        returnValue.put("recentTransactions", recentTransactionDtos);

        return returnValue;
    }
}
