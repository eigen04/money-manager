package in.anant.moneymanager.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FilterDto {
    private String type;
    private LocalDate startDate;
    private LocalDate endDate;
    private String keyword;
    private String sortField;
    private String sortOrder;
}
