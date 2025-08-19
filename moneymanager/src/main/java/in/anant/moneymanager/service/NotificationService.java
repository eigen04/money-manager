package in.anant.moneymanager.service;

import in.anant.moneymanager.dto.ExpenseDto;
import in.anant.moneymanager.entity.ProfileEntity;
import in.anant.moneymanager.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final ExpenseService expenseService;

    @Value("${money.manager.frontend.url}")
    private String frontendUrl;
    @Scheduled(cron = "0 * * * * *",zone = "IST")
    public void sendDailyIncomeExpenseReminder(){
        log.info("Job started: sendDailyIncomeExpenseReminder()");
        List<ProfileEntity> profiles = profileRepository.findAll();
        for(ProfileEntity profile : profiles){
            String body = "Hi " +profile.getFullName() + ",<br><br>"
                    + "This is friendly reminder to add your income and expenses for today in Money Manager.<br><br>"
                    +"<a href=\"" + frontendUrl + "style='display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;font-weight: bold;'>Go to Money Manager</a>"
                    + "<br><br>Best regards,<br>Money Manager Team";
            emailService.sendEmail(profile.getEmail(), "Daily Income and Expense Reminder", body);
        }
        log.info("Job completed: sendDailyIncomeExpenseReminder()");
    }
    @Scheduled(cron = "0 * * * * *",zone = "IST")
    public void sendDailyExpenseSummary() {
        log.info("Job started: sendDailyExpenseSummary()");
        List<ProfileEntity> profiles = profileRepository.findAll();
        for (ProfileEntity profile : profiles) {
            List<ExpenseDto> todaysExpenses = expenseService.getExpensesForUserOnDate(profile.getId(), LocalDate.now());
            if (!todaysExpenses.isEmpty()) {
                StringBuilder table = new StringBuilder();
                table.append("<table style='border-collapse: collapse; width: 100%;'>");
                table.append("<tr style='background-color: #f2f2f2;'>"
                        + "<th style='border: 1px solid #ddd; padding: 8px;'>S.No</th>"
                        + "<th style='border: 1px solid #ddd; padding: 8px;'>Name</th>"
                        + "<th style='border: 1px solid #ddd; padding: 8px;'>Amount</th>"
                        + "<th style='border: 1px solid #ddd; padding: 8px;'>Category</th>"
                        + "</tr>");
                int i = 1;
                for (ExpenseDto expenseDto : todaysExpenses) {
                    table.append("<tr>");
                    table.append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(i++).append("</td>");
                    table.append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(expenseDto.getName()).append("</td>");
                    table.append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(expenseDto.getAmmount()).append("</td>");
                    table.append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(expenseDto.getCategoryId() != null ? expenseDto.getCategoryName() : "N/A").append("</td>");
                    table.append("</tr>");
                }
                table.append("</table>");
                String body = "Hi " + profile.getFullName() + ",<br><br>"
                        + "Here is your expense summary for today:<br><br>"
                        + table+ "<br><br>Best regards,<br>Money Manager Team";
                emailService.sendEmail(profile.getEmail(), "Your Daily Expense Summary", body);
            }
        }
        log.info("Job completed: sendDailyExpenseSummary()");
    }
}
