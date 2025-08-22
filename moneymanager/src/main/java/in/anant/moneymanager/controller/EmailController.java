package in.anant.moneymanager.controller;

import in.anant.moneymanager.service.EmailService;
import in.anant.moneymanager.service.ExcelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;
    private final ExcelService excelService;

    // ✅ Income Excel Email
    @GetMapping("/email/income-excel")
    public ResponseEntity<String> emailIncomeExcel() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName(); // logged-in user email

            byte[] excelBytes = excelService.generateIncomeExcel().getInputStream().readAllBytes();

            String htmlBody = "<h3>Hi, here are your Income Details</h3><p>Please find attached your income report.</p>";

            emailService.sendEmailWithAttachment(
                    username,
                    "Your Income Report",
                    htmlBody,
                    excelBytes,
                    "income_details.xlsx"
            );

            return ResponseEntity.ok("Income email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to send income report: " + e.getMessage());
        }
    }

    // ✅ Expense Excel Email
    @GetMapping("/email/expense-excel")
    public ResponseEntity<String> emailExpenseExcel() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName(); // logged-in user email

            byte[] excelBytes = excelService.generateExpenseExcel().getInputStream().readAllBytes();

            String htmlBody = "<h3>Hi, here are your Expense Details</h3><p>Please find attached your expense report.</p>";

            emailService.sendEmailWithAttachment(
                    username,
                    "Your Expense Report",
                    htmlBody,
                    excelBytes,
                    "expense_details.xlsx"
            );

            return ResponseEntity.ok("Expense email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to send expense report: " + e.getMessage());
        }
    }
}
