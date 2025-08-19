package in.anant.moneymanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private Long id;
    private Long profileId;
    private String name;
    private String icon;
    private String type;
    private String createdAt;
    private String updatedAt;
}
