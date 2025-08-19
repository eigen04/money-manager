package in.anant.moneymanager.controller;

import in.anant.moneymanager.dto.IncomeDto;
import in.anant.moneymanager.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping
    public ResponseEntity<IncomeDto> addIncome(@RequestBody IncomeDto incomeDto) {
        IncomeDto savedIncome = incomeService.addIncome(incomeDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedIncome);
    }
    @GetMapping
    public ResponseEntity<List<IncomeDto>> getIncomes(){
        List<IncomeDto> list = incomeService.getCurrentMonthIncomeForCurrentUser();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }
}
