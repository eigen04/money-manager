package in.anant.moneymanager.service;

import in.anant.moneymanager.dto.IncomeDto;
import in.anant.moneymanager.entity.CategoryEntity;
import in.anant.moneymanager.entity.IncomeEntity;
import in.anant.moneymanager.entity.ProfileEntity;
import in.anant.moneymanager.repository.CategoryRepository;
import in.anant.moneymanager.repository.IncomeRepository;
import org.springframework.security.access.AccessDeniedException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeService {
    private final CategoryRepository categoryRepository;
    private final IncomeRepository incomeRepository;
    private final ProfileService profileService;

    public IncomeDto addIncome(IncomeDto incomeDto) {
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity category = categoryRepository.findById(incomeDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found or Not Accessible"));
        IncomeEntity newincome =  toEntity(incomeDto, profile, category);
        newincome = incomeRepository.save(newincome);
        return toDto(newincome);
    }
    public List<IncomeDto> getCurrentMonthIncomeForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
        List<IncomeEntity> list =  incomeRepository.findByProfileIdAndDateBetween(profile.getId(), startDate, endDate);
        return list.stream().map(this::toDto).toList();
    }
    public void deleteIncome(Long incomeId) {
        ProfileEntity profile = profileService.getCurrentProfile();
        IncomeEntity incomeEntity = incomeRepository.findById(incomeId)
                .orElseThrow(() -> new RuntimeException("Income not found or Not Accessible"));

        // Only allow delete if current user is owner
        if (!incomeEntity.getProfile().getId().equals(profile.getId())) {
            throw new AccessDeniedException("Unauthorized access to delete this income");
        }

        incomeRepository.delete(incomeEntity);
    }

    public List<IncomeDto> getLatest5IncomesForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        List<IncomeEntity> list = incomeRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
        return list.stream().map(this::toDto).toList();
    }
    public BigDecimal getTotalIncomeForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        BigDecimal total = incomeRepository.findTotalIncomeByProfileId(profile.getId());
        return total!= null ? total : BigDecimal.ZERO;
    }
    public List<IncomeDto> filterIncomes(LocalDate startDate, LocalDate endDate, String keyword, Sort sort) {
        ProfileEntity profile = profileService.getCurrentProfile();
        List<IncomeEntity> list = incomeRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(profile.getId(), startDate, endDate,keyword,sort);
        return list.stream().map(this::toDto).toList();
    }
    private IncomeEntity toEntity(IncomeDto incomeDto, ProfileEntity profileEntity, CategoryEntity categoryEntity) {
        return IncomeEntity.builder()
                .name(incomeDto.getName())
                .icon(incomeDto.getIcon())
                .date(incomeDto.getDate())
                .ammount(incomeDto.getAmmount())
                .category(categoryEntity)
                .profile(profileEntity)
                .build();
    }
    private IncomeDto toDto(IncomeEntity incomeEntity) {
        return IncomeDto.builder()
                .id(incomeEntity.getId())
                .name(incomeEntity.getName())
                .icon(incomeEntity.getIcon())
                .date(incomeEntity.getDate())
                .ammount(incomeEntity.getAmmount())
                .categoryId(incomeEntity.getCategory()!=null ? incomeEntity.getCategory().getId() : null)
                .categoryName(incomeEntity.getCategory() != null ? incomeEntity.getCategory().getName() : "N/A")
                .createdAt(incomeEntity.getCreatedAt())
                .updatedAt(incomeEntity.getUpdatedAt())
                .build();
    }
}
