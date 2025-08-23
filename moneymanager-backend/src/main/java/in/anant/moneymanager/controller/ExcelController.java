package in.anant.moneymanager.controller;

import in.anant.moneymanager.service.ExcelService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ExcelController {

    private final ExcelService excelService;

    // ✅ Income Excel Download
    @GetMapping("/excel/download/income")
    public ResponseEntity<Resource> downloadIncomeExcel() {
        Resource excelFile = excelService.generateIncomeExcel();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=income_details.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(excelFile);
    }

    // ✅ Expense Excel Download
    @GetMapping("/excel/download/expense")
    public ResponseEntity<Resource> downloadExpenseExcel() {
        Resource excelFile = excelService.generateExpenseExcel();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=expense_details.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(excelFile);
    }
}
