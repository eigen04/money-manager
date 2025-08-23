package in.anant.moneymanager.service;

import in.anant.moneymanager.entity.IncomeEntity;
import in.anant.moneymanager.entity.ExpenseEntity;
import in.anant.moneymanager.repository.IncomeRepository;
import in.anant.moneymanager.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExcelService {

    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;

    // ✅ Generate Income Excel
    public Resource generateIncomeExcel() {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Incomes");

            // Header Row
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("ID");
            header.createCell(1).setCellValue("Name");
            header.createCell(2).setCellValue("Amount");
            header.createCell(3).setCellValue("Date");
            header.createCell(4).setCellValue("Category");

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            List<IncomeEntity> incomes = incomeRepository.findByProfile_Email(username);

            int rowIdx = 1;
            int serialNo = 1;
            for (IncomeEntity income : incomes) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(serialNo++);
                row.createCell(1).setCellValue(income.getName());
                row.createCell(2).setCellValue(income.getAmmount() != null ? income.getAmmount().doubleValue() : 0);
                row.createCell(3).setCellValue(income.getDate().toString());
                row.createCell(4).setCellValue(income.getCategory().getName());
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return new ByteArrayResource(out.toByteArray());

        } catch (IOException e) {
            throw new RuntimeException("Failed to generate Income Excel file", e);
        }
    }

    // ✅ Generate Expense Excel
    public Resource generateExpenseExcel() {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Expenses");

            // Header Row
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("ID");
            header.createCell(1).setCellValue("Name");
            header.createCell(2).setCellValue("Amount");
            header.createCell(3).setCellValue("Date");
            header.createCell(4).setCellValue("Category");

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            List<ExpenseEntity> expenses = expenseRepository.findByProfile_Email(username);

            int rowIdx = 1;
            int serialNo = 1;
            for (ExpenseEntity expense : expenses) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(serialNo++);
                row.createCell(1).setCellValue(expense.getName());
                row.createCell(2).setCellValue(expense.getAmmount() != null ? expense.getAmmount().doubleValue() : 0);
                row.createCell(3).setCellValue(expense.getDate().toString());
                row.createCell(4).setCellValue(expense.getCategory().getName());
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return new ByteArrayResource(out.toByteArray());

        } catch (IOException e) {
            throw new RuntimeException("Failed to generate Expense Excel file", e);
        }
    }
}
