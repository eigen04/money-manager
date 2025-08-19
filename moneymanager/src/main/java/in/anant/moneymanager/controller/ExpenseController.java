package in.anant.moneymanager.controller;

import in.anant.moneymanager.dto.ExpenseDto;
import in.anant.moneymanager.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseDto> addExpense(@RequestBody ExpenseDto expenseDto) {
        ExpenseDto savedExpense = expenseService.addExpense(expenseDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExpense);
    }
    @GetMapping
    public ResponseEntity<List<ExpenseDto>> getExpenses(){
        List<ExpenseDto> list = expenseService.getCurrentMonthExpensesForCurrentUser();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
