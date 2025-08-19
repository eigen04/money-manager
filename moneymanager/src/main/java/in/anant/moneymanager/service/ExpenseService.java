package in.anant.moneymanager.service;

import in.anant.moneymanager.dto.ExpenseDto;
import in.anant.moneymanager.entity.CategoryEntity;
import in.anant.moneymanager.entity.ExpenseEntity;
import in.anant.moneymanager.entity.ProfileEntity;
import in.anant.moneymanager.repository.CategoryRepository;
import in.anant.moneymanager.repository.ExpenseRepository;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;
    private final ProfileService profileService;

    public ExpenseDto addExpense(ExpenseDto expenseDto) {
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity category = categoryRepository.findById(expenseDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found or Not Accessible"));
        ExpenseEntity newExpense =  toEntity(expenseDto, profile, category);
        newExpense = expenseRepository.save(newExpense);
        return toDto(newExpense);
    }
    public List<ExpenseDto> getCurrentMonthExpensesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
        List<ExpenseEntity> list =  expenseRepository.findByProfileIdAndDateBetween(profile.getId(), startDate, endDate);
                return list.stream().map(this::toDto).toList();
    }
    public void deleteExpense(Long expenseId) {
        ProfileEntity profile = profileService.getCurrentProfile();
        ExpenseEntity expenseEntity = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found or Not Accessible"));
        if(expenseEntity.getProfile().getId().equals(profile.getId())){
            throw new  RuntimeException("Unauthorized access to delete this expense");
        }
        expenseRepository.delete(expenseEntity);
    }
    public List<ExpenseDto> getLatest5ExpensesForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        List<ExpenseEntity> list = expenseRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
        return list.stream().map(this::toDto).toList();
    }
    public BigDecimal getTotalExpenseForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        BigDecimal total = expenseRepository.findTotalExpenseByProfileId(profile.getId());
        return total!= null ? total : BigDecimal.ZERO;
    }
    public List<ExpenseDto> filterExpenses(LocalDate startDate, LocalDate endDate, String keyword, Sort sort) {
        ProfileEntity profile = profileService.getCurrentProfile();
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(profile.getId(), startDate, endDate,keyword,sort);
        return list.stream().map(this::toDto).toList();
    }
    @Transactional(readOnly = true)
    public List<ExpenseDto> getExpensesForUserOnDate(Long profileId, LocalDate date){
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDate(profileId, date);
        return list.stream().map(this::toDto).toList();
    }
    private ExpenseEntity toEntity(ExpenseDto expenseDto, ProfileEntity profileEntity, CategoryEntity categoryEntity) {
        return ExpenseEntity.builder()
                .name(expenseDto.getName())
                .icon(expenseDto.getIcon())
                .date(expenseDto.getDate())
                .ammount(expenseDto.getAmmount())
                .category(categoryEntity)
                .profile(profileEntity)
                .build();
    }
    private ExpenseDto toDto(ExpenseEntity expenseEntity) {
        return ExpenseDto.builder()
                .id(expenseEntity.getId())
                .name(expenseEntity.getName())
                .icon(expenseEntity.getIcon())
                .date(expenseEntity.getDate())
                .ammount(expenseEntity.getAmmount())
                .categoryId(expenseEntity.getCategory()!=null ? expenseEntity.getCategory().getId() : null)
                .categoryName(expenseEntity.getCategory() != null ? expenseEntity.getCategory().getName() : "N/A")
                .createdAt(expenseEntity.getCreatedAt())
                .updatedAt(expenseEntity.getUpdatedAt())
                .build();
    }
}
